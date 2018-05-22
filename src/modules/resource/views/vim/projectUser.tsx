import * as React from 'react';
import { matchPath } from 'react-router'
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Button, Spin, Input } from 'antd';
import qs from 'querystringify'
import { stringify } from 'querystringify'
import Selector from '../../../../components/Selector'
import CompactTable from '../../../../components/CompactTable/'

class ProjectUser extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { pageNo, vim_id, userName } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        this.state = {
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            vim_id: mp_node ? mp_node.params.id : '',
            userName: userName ? userName : '',
        }
    }
    goPage(num) {
        let { match } = this.props
        let { userName } = this.state
        let pageNo = num
        let queryObj = { pageNo, userName }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    handleClick() {
        let { match } = this.props
        let { userName } = this.state
        let pageNo = 1
        let queryObj = { pageNo, userName }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData(queryObj)
    }
    userInput(value) {
        this.setState({
            userName: value
        })
    }
    goList() {
        let path = this.props.location.pathname.replace(/\/(\w+)\/user/, '')
        this.props.history.push(`${path}`)
    }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { pageSize, userName, vim_id } = this.state
        let params_obj = { pageNo, pageSize, userName, vim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsProjectUser', params_obj, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    componentWillMount() {
        let { pageNo } = this.state
        let queryObj = {
            pageNo
        }
        this.getTableData(queryObj)
    }
    componentWillUnMount() {
        this.props.actions.resetList()
    }
    render() {
        const { pageSize, tableLoading, userName } = this.state;
        let { match, nodeInfo, config, list } = this.props
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>项目名称</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item><a onClick={this.goList.bind(this)}>项目及配额管理</a></Breadcrumb.Item>
                            <Breadcrumb.Item>用户列表</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Input placeholder="用户名称"
                            value={userName} type="text"
                            onChange={e => this.userInput(e.target.value)} />
                        <Button
                            type="primary"
                            onClick={this.handleClick.bind(this)}
                        >
                            查询
                                </Button>
                    </div>
                    {
                        list ? (
                            <CompactTable
                                goPage={this.goPage.bind(this)}
                                data={list}
                                pageSize={pageSize}
                                loading={tableLoading}
                                size={{ y: list.totalCount > pageSize ? window.innerHeight - 386 : window.innerHeight - 334 }}
                            />
                        ) : (
                                <Spin />
                            )
                    }
                </div>
            </div>
        );
    }
}
export default ProjectUser;