import * as React from 'react';
import { matchPath } from 'react-router'
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Button, Spin, Input } from 'antd';
import qs from 'querystringify'
import { stringify } from 'querystringify'
import Selector from '../../../../components/Selector'
import CompactTable from '../../../../components/CompactTable/'

class VirtualPort extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { pageNo, project, vim_id, name, query } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        this.state = {
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            project: project ? project : '',
            vim_id: mp_node ? mp_node.params.id : '',
            name: name ? name : '',
            query: query ? query : '',
        }
    }
    handleManage() {
        let { config } = this.props
        let id = this.props.match.params.id
        window.open(`${config.vim_manage_link.virtual_network}${id}/detail`)
    }
    goPage(num) {
        let { match } = this.props
        let { project, name } = this.state
        let pageNo = num
        let queryObj = { pageNo, project, name }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
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
    storageInput(value) {
        this.setState({
            name: value
        })
    }
    getData(type, value) {
        let { project } = this.state
        this.setState({
            project: type === 'Project' ? value : project,
        })
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
        this.props.actions.queryList('imdsVirtualPort', params_obj, () => {
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
        const { pageSize, tableLoading, project, name } = this.state;
        let { match, nodeInfo, config, list } = this.props
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>虚拟端口管理</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item>虚拟端口管理</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                {/* <div style={{ padding: '20px', height: window.innerHeight - 204 }}>
                    <iframe src={`${config.vim_manage_link.virtual_port}`} style={{ width: '100%', height: '100%', border: '1px solid #e2e4e9' }}></iframe>
                </div> */}
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Selector type="Project" data={this.props.subDataProject} getData={this.getData.bind(this)} value={project} />
                        <Input placeholder="虚拟端口名称"
                            value={name} type="text"
                            onChange={e => this.storageInput(e.target.value)} />
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
                    {
                        list ? (
                            <CompactTable
                                outStyle={{ marginTop: '20px' }}
                                goPage={this.goPage.bind(this)}
                                data={list}
                                pageSize={pageSize}
                                loading={tableLoading}
                                actionAuth={[]}
                                size={{ y: list.totalCount > pageSize ? window.innerHeight - 386 : window.innerHeight - 333 }}
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
export default VirtualPort;