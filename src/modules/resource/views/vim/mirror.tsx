import * as React from 'react';
import * as _ from 'lodash';
import { matchPath } from 'react-router'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Select, Input, Spin } from 'antd';
const Option = Select.Option;
import CompactTable from '../../../../components/CompactTable/'
import Selector from '../../../../components/Selector'
import styles from '../../style/index.less'
import { stringify } from 'querystringify'
import qs from 'querystringify'
class Mirror extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pageNo, project, name } = qs.parse(this.props.location.search)
        let mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        this.state = {
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            project: project ? project : '',
            name: name ? name : '',
            vim_id: mp_node ? mp_node.params.id : ''
        }
    }
    getData(type, value) {
        let { project } = this.state
        this.setState({
            project: type === 'Project' ? value : project,
        })
    }
    goPage(num) {
        let { match } = this.props
        let { project, name, vim_id } = this.state
        let pageNo = num
        let queryObj = { pageNo, project, name, vim_id }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'name') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    handleClick() {
        let { match } = this.props
        let { project, name } = this.state
        let pageNo = 1
        let queryObj = { pageNo, project, name }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData(queryObj)
    }
    mirrorInput(value) {
        this.setState({
            name: value
        })
    }
    tableList() {
        let list = this.props.list
        const { pageSize, tableLoading, project, name } = this.state;

        if (list) {
            return (
                <CompactTable
                    outStyle={{ marginTop: '20px' }}
                    pageSize={pageSize}
                    loading={tableLoading}
                    goPage={this.goPage.bind(this)} // 翻页
                    goLink={this.goLink.bind(this)}
                    data={list}
                    actionAuth={[]}
                    size={{ y: list.totalCount > pageSize ? window.innerHeight - 370 : window.innerHeight - 340 }}
                />
            )
        } else {
            return (
                <Spin />
            )
        }

    }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { pageSize, project, name, vim_id } = this.state
        let params_obj = { pageNo, pageSize, project, name, vim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsImage', params_obj, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    handleManage() {
        let { config } = this.props
        window.open(config.manage_link.mirror)
    }
    componentWillMount() {
        let { pageNo } = this.state
        let queryObj = {
            pageNo
        }
        this.getTableData(queryObj)
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    render() {
        let { match, list, nodeInfo, subDataProject } = this.props
        const { pageSize, tableLoading, project, name } = this.state;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>镜像管理</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item>镜像管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Selector type="Project" data={subDataProject} getData={this.getData.bind(this)} value={project} />
                        <Input placeholder="镜像名称"
                            value={name} type="text"
                            onChange={e => this.mirrorInput(e.target.value)} />
                        <Button
                            type="primary"
                            onClick={this.handleClick.bind(this)}
                        >
                            查询
                                </Button>
                        <Button style={{ float: 'right' }}
                            type="primary"
                            onClick={this.handleManage.bind(this)}
                        >
                            管理
                            </Button>
                    </div>
                    {this.tableList()}
                </div>
            </div>
        );
    }
}
export default Mirror;