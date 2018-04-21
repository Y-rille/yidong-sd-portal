import * as React from 'react';
import * as _ from 'lodash';
import { matchPath } from 'react-router'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input, Spin } from 'antd';
import Selector from '../../../../components/Selector'
import CompactTable from '../../../../components/CompactTable/'
import styles from '../../style/index.less'
import { ResourceActions } from '../../actions/index'
import qs from 'querystringify'
import { stringify } from 'querystringify'
export interface VirtualNetworkProps {
    location?,
    history?,
    actions: ResourceActions,
    match,
    subDataProject?,
    nodeInfo?,
    list?
    config?
}
class VirtualNetwork extends React.Component<VirtualNetworkProps, any> {
    constructor(props) {
        super(props);
        let { pageNo, project, vim_id, name, vnGroup } = qs.parse(this.props.location.search)
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
            vnGroup: vnGroup ? vnGroup : ''
        }
    }
    virtualNetworkInputChange(value) {
        this.setState({
            name: value
        })
    }
    vnGroupInputChange(value) {
        this.setState({
            vnGroup: value
        })
    }
    handleClick() {
        let { match } = this.props
        let pageNo = 1
        let { project, name, vnGroup } = this.state
        let queryObj = { pageNo, project, name, vnGroup }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData(queryObj)
    }
    goPage = (num) => {
        let { match } = this.props
        let { project, name, vnGroup } = this.state
        let pageNo = num
        let queryObj = { pageNo, project, name, vnGroup }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    getData(type, value) {  // 查询条件切换
        let { project } = this.state
        this.setState({
            project: type === 'Project' ? value : project,
        })
    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'name') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        } else if (key === 'subnetList') {
            this.props.history.push(`${match.url}/${obj.id}/subnet`)
        }
    }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { pageSize, project, name, vim_id, vnGroup } = this.state
        let params_obj = { pageNo, pageSize, project, name, vnGroup, vim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsVirtualNetwork', params_obj, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    handleManage() {
        let { config } = this.props
        window.open(config.manage_link.virtual_network)
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
        let { match, list, nodeInfo } = this.props
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        const { pageSize, tableLoading, project, name, vnGroup } = this.state;
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>虚拟网络管理</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item>虚拟网络管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Selector type="Project" data={this.props.subDataProject} getData={this.getData.bind(this)} value={project} />
                        <Input
                            placeholder="虚拟网络名称"
                            type="text"
                            value={name}
                            onChange={e => this.virtualNetworkInputChange(e.target.value)} />
                        <Input
                            placeholder="虚拟网络组名称"
                            value={vnGroup}
                            type="text"
                            onChange={e => this.vnGroupInputChange(e.target.value)}
                        />
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
                    {list ? (<CompactTable
                        outStyle={{ marginTop: '20px' }}
                        pageSize={pageSize}
                        goPage={this.goPage.bind(this)} // 翻页
                        goLink={this.goLink.bind(this)}
                        data={list}
                        loading={tableLoading}
                        // pageAuth={true}
                        actionAuth={[]}
                        size={{ y: list.totalCount > pageSize ? window.innerHeight - 370 : window.innerHeight - 340 }}
                    />) : (<Spin />)}
                </div>
            </div>
        );
    }
}
export default VirtualNetwork;