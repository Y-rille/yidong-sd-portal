import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Input, Button, Spin } from 'antd';
import { matchPath } from 'react-router'
import CompactTable from '../../../../components/CompactTable/'
import Selector from '../../../../components/Selector'
import qs from 'querystringify'
import { stringify } from 'querystringify'
class VirtualSubnet extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/vim/:id'
        })
        let { pageNo, project, vsname } = qs.parse(this.props.location.search)
        this.state = {
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            project: project ? project : '',
            vsname: vsname ? vsname : '',
            vim_id: mp_node.params.id
        }
    }
    goList() {
        let path = this.props.location.pathname.replace(/\/(\w+)\/subnet/, '')
        this.props.history.push(`${path}`)
    }
    getData(type, value) {
        let { project } = this.state
        this.setState({
            project: type === 'Project' ? value : project,
        })
    }
    projectQuotaInput(value) {
        this.setState({
            vsname: value
        })
    }
    handleManage() {
        let { config } = this.props
        let id = this.props.match.params.id

        window.open(`${config.vim_manage_link.virtual_network}${id}/detail`)
    }
    getTableData() {
        this.setState({
            tableLoading: true
        });
        let network = this.props.match.params.id
        let { pageSize, pageNo, project, vsname, vim_id } = this.state
        let params_obj = { pageNo, pageSize, project, vsname, network, vim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsVirtualSubnet', params_obj, () => {
            this.setState({
                tableLoading: false
            });
        })
    }
    goPage = (num) => {
        this.setState({
            pageNo: num
        }, () => {
            let { match } = this.props
            let { project, vsname } = this.state
            let pageNo = num
            let queryObj = { pageNo, project, vsname }
            this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
            this.getTableData()
        })
    }
    handleClick() {
        let { match } = this.props
        let { project, vsname } = this.state
        let pageNo = 1
        let queryObj = { pageNo, project, vsname }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData()
    }
    componentWillMount() {
        let { pageNo } = this.state
        let queryObj = {
            pageNo
        }
        this.getTableData()
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    render() {
        let { match, nodeInfo, config, list } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        let id = this.props.match.params.id
        let { pageSize, tableLoading, project, vsname } = this.state
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>虚拟子网管理</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item><a onClick={this.goList.bind(this)}>虚拟网络管理</a></Breadcrumb.Item>
                            <Breadcrumb.Item>虚拟子网管理</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '20px', height: window.innerHeight - 204 }}>
                    <div className={styles.queryBar}>
                        <Selector type="Project" data={this.props.subDataProject} getData={this.getData.bind(this)} value={project} />
                        <Input placeholder="虚拟子网名称"
                            value={vsname} type="text"
                            onChange={e => this.projectQuotaInput(e.target.value)} />
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
                                goPage={this.goPage.bind(this)}
                                data={list}
                                pageSize={pageSize}
                                loading={tableLoading}
                                size={{ y: list.totalCount > pageSize ? window.innerHeight - 368 : window.innerHeight - 334 }}
                            />) : (
                                <Spin />
                            )
                    }
                </div>
            </div>
        );
    }
}
export default VirtualSubnet;