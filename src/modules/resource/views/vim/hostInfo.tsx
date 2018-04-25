import * as React from 'react';
import * as _ from 'lodash';
import { matchPath } from 'react-router'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Modal, Spin } from 'antd';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import CompactTable from '../../../../components/CompactTable'
import Summaries from '../../../../components/Summaries/'
import { stringify } from 'querystringify'
import qs from 'querystringify'
import styles from '../../style/index.less'
import Item from 'antd/lib/list/Item';
import emitter from '../../../../common/emitter'
import { Topology } from '../../../../components/Topology/topology.js'
import '../../../../components/Topology/topology.css'
import matchMoTypeKeyAndRoute from '../../utils/matchMoTypeKeyAndRoute'
import UUID from 'uuid'
import shallowDiffers from '../../utils/shallowDiffers'

class HostInfo extends React.Component<any, any> {
    topoTimer: any
    topoStateTimer: any
    constructor(props) {
        super(props);
        let { pageNo } = qs.parse(this.props.location.search)
        let { type, id } = this.props.match.params
        let dsname = ''
        switch (type) {
            case 'compute':
                dsname = 'imdsTopoHost'
                break;
            case 'controller':
                dsname = 'imdsTopoController'
                break;
            default:
                dsname = 'imdsTopoStorage'
        }
        this.state = {
            tableLoading: false,
            pageNo: pageNo ? pageNo : 1,
            pageSize: 9999,
            activeKey: 'imdsHostProcessor',
            host: id,
            topoDsname: dsname,
            topo: null,
            observe: null
        }
    }
    onChange(key) {
        if (key === 'detail') {
            this.props.actions.resetObjAttributes()
            this.props.actions.resetObjData()
            let moTypeKey = 'host'
            let match = this.props.match
            let id = match.params.id
            this.props.actions.getObjAttributes(moTypeKey)
            this.props.actions.getObjData(moTypeKey, id)
        } else if (key === 'relation') {
            this.props.actions.resetList();
            this.setState({
                pageNo: 1,
                pageSize: 9999,
                activeKey: 'imdsHostProcessor'
            }, () => {
                this.getTableData({ pageNo: 1 })
            })
        } else if (key === 'imdsHostSubRes') {
            this.props.actions.resetList();
            this.setState({
                pageNo: 1,
                pageSize: 1,
                activeKey: 'imdsHostSubRes'
            }, () => {
                this.getTableData({ pageNo: 1 })
            })
        } else {
            this.getTopo()
            this.getTopoState()
            if (!this.topoTimer && !this.topoStateTimer) {
                let topoTimer = setInterval(() => {
                    this.getTopo()
                }, 300000)
                let topoStateTimer = setInterval(() => {
                    this.getTopoState()
                }, 5000)
            }
        }
    }
    onTab(key) {
        let match = this.props.match
        let id = match.params.id
        this.props.actions.resetList();
        this.setState({
            pageNo: 1,
            activeKey: key
        }, () => {
            this.goPage(1)
        })
    }
    getTopo(cb?) {
        let { topoDsname, host } = this.state
        this.props.actions.getTopo(topoDsname, { moInstId: host }, (data, err) => {
            if (data) {
                if (cb) { cb() }
            }
        })
    }
    getTopoState() {
        let { topoDsname, host } = this.state
        this.props.actions.getTopoState(topoDsname, { moInstId: host }, (data, err) => {
            if (data) {
                let nextTopoNodes = data && data.nodes ? _.keyBy(data.nodes, 'id') : {}
                let { topo } = this.state
                let prevTopoNodes = topo && topo.nodes ? _.keyBy(topo.nodes, 'id') : {}
                if (shallowDiffers(nextTopoNodes, prevTopoNodes) || !topo) {
                    this.setState({
                        topo: data
                    })
                }
            }
        })
    }
    handleEditData(d, cb) {
        let moTypeKey = 'host'
        let match = this.props.match
        let moInstId = match.params.id
        this.props.actions.editObjData(moTypeKey, moInstId, d, (err, qdata) => {
            if (err || qdata.code !== 1) {
                emitter.emit('message', 'error', '修改失败')
                if (cb) {
                    cb()
                }
            } else if (qdata.code === 1) {
                this.props.actions.getObjData(moTypeKey, moInstId, (error, res) => {
                    if (res && res.code === 1) {
                        if (cb) {
                            cb()
                        }
                    }
                    if (res && res.code === 0 || error) {
                        emitter.emit('message', 'error', '修改失败')
                        if (cb) {
                            cb()
                        }
                    }
                })
            }
        })
    }
    getObserve(objData) {
        let { columns, values } = objData.data
        let observe
        let baseData = _.zipObject(columns, _.head(values))
        observe = baseData.observe
        let fix_observe = _.parseInt(observe, 10)
        return fix_observe
    }
    payAttention() {
        let moTypeKey = 'host'
        let { host, observe } = this.state
        let editObserve = (observe === 0) ? 1 : 0
        let tipTxt = (editObserve === 1) ? '关注' : '取消关注'
        this.props.actions.editObjData(moTypeKey, host, { observe: editObserve }, (err, data) => {
            if (err || data.code !== 1) {
                emitter.emit('message', 'error', `${tipTxt}失败！`)
            } else if (data.code === 1) {
                emitter.emit('message', 'success', `${tipTxt}成功！`)
                this.setState({
                    observe: editObserve
                })
            }
        })
    }
    showServer(e, topo?) {
        let host = this.props.match.params.id;
        this.props.actions.queryList('imdsHostServerInfo', { host }, (err, res) => {
            if (!err && res['dataList']) {
                let host_info = _.head(res['dataList'])
                if (host_info) {
                    let id = host_info['id']
                    let pim_id = host_info['pim_id']
                    if (id && pim_id) {
                        let topoFlag = topo ? '?active=topo' : ''
                        this.props.history.push(`/resource/pim/${pim_id}/server/info/${id}${topoFlag}`)
                    }
                }
            }
        })
    }
    goPage(num) {
        let { match } = this.props
        let pageNo = num
        this.getTableData({
            pageNo
        })
    }
    goLink(key, obj) {
        let { match } = this.props
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        let vimId = mp_node.params.id
        if (key === 'name') {
            this.props.history.push(`/resource/vim/${vimId}/virtual/info/${obj.id}`)
        }
    }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { pageSize, activeKey, host } = this.state
        this.props.actions.queryList(activeKey, { pageNo, pageSize, host }, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    goList() {
        let path = this.props.location.pathname.replace(/\/info\/(\w+)/, '')
        this.props.history.push(`${path}`)
    }
    nodeDblClick(data) {
        if (data && data.model && data.model.attributes && data.model.attributes.bizFields && data.model.attributes.bizFields.ifRedirect) {
            let { moMgrType, moMgrId, moTypeKey, moInstId, hostType } = data.model.attributes.bizFields
            let hostTypePath = hostType ? `/${hostType}/` : ''
            this.props.history.push(`/resource/${moMgrType}/${moMgrId}/${matchMoTypeKeyAndRoute(moTypeKey.toLocaleLowerCase())}/${hostTypePath}info/${moInstId}?active=topo`)
        }
    }
    refreshHandler() {
        this.getTopo()
    }
    componentWillMount() {
        let { type } = this.props.match.params
        let { active } = qs.parse(this.props.location.search)
        if (active && active === 'topo') {
            this.getTopo(this.getTopoState())
        } else {
            let moTypeKey = 'host'
            let host = this.state.host
            this.props.actions.getObjAttributes(moTypeKey)
            this.props.actions.getObjData(moTypeKey, host, (err, data) => {
                if (data) {
                    this.setState({
                        observe: this.getObserve(data)
                    })
                }
            })
            switch (type) {
                case 'compute':
                    this.props.actions.getSummary('imdsHostOverview', { host: host }, null)
                    break;
                case 'controller':
                    this.props.actions.getSummary('imdsControllerOverview', { host: host }, null)
                    break;
                default:
                    this.props.actions.getSummary('imdsStorageOverview', { host: host }, null)
            }
        }
    }
    componentDidMount() {
        let { active } = qs.parse(this.props.location.search)
        if (active && active === 'topo' && !this.topoTimer && !this.topoStateTimer) {
            let topoTimer = setInterval(() => {
                this.getTopo()
            }, 300000)
            let topoStateTimer = setInterval(() => {
                this.getTopoState()
            }, 5000)
        }
    }
    componentWillUnmount() {
        this.props.actions.resetList()
        this.props.actions.resetObjAttributes()
        this.props.actions.resetObjData()
        this.props.actions.resetSummary()
        clearInterval(this.topoTimer)
        clearInterval(this.topoStateTimer)
    }
    renderBtns() {
        let { observe } = this.state
        let { objData } = this.props
        let icon = (observe === 0) ? 'star-o' : 'star'
        let btnTxt = (observe === 0) ? '关注' : '取消关注'
        return (
            <div className={styles.btn}>
                {(objData && !isNaN(observe)) ? (
                    <Button
                        type="primary" ghost
                        icon={icon}
                        onClick={this.payAttention.bind(this)}
                    >{btnTxt}</Button>
                ) : ''}
                <Button
                    type="primary" ghost
                    icon="eye-o"
                    onClick={this.showServer.bind(this)}
                >查看服务器</Button>
            </div>
        )
    }
    topoBtns() {
        return (
            <div className={styles.btn}>
                <Button
                    type="primary" ghost
                    icon="fork"
                    onClick={this.showServer.bind(this, true)}
                >物理拓扑</Button>
                <Button
                    type="primary" ghost
                    icon="reload"
                    onClick={this.refreshHandler.bind(this)}
                >刷新</Button>
            </div>
        )
    }
    renderDynamicPropertiesCollapse() {
        let { summary } = this.props
        if (summary && this.props.objAttributes && this.props.objData) {
            return (
                <div style={{ marginTop: '20px' }}>
                    <Summaries
                        data={summary}
                        colNum={3} />
                    <DynamicPropertiesCollapse
                        attributes={this.props.objAttributes}
                        data={this.props.objData}
                        editData={this.handleEditData.bind(this)} />
                </div>
            )
        } else {
            return (
                <div style={{ position: 'relative', padding: '50px' }}>
                    <Spin />
                </div>
            )
        }
    }
    renderNormalTable() {
        let { list } = this.props
        let { tableLoading, pageSize } = this.state
        if (list && list.header) {
            return (
                <CompactTable
                    pageSize={pageSize}
                    goPage={this.goPage.bind(this)} // 翻页
                    loading={tableLoading}
                    data={list}
                    goLink={this.goLink.bind(this)}
                    footInfoAuth={<div>*&nbsp;主机下级资源共有{list.totalCount}个</div>}
                />
            )
        } else {
            return (
                <div style={{ position: 'relative', height: '30px' }}>
                    <Spin />
                </div>
            )
        }
    }
    renderTopo() {
        let { topo } = this.state
        if (topo) {
            let { id } = this.props.match.params
            let w = document.querySelector('.Pane2').clientWidth - 96
            let h = window.innerHeight - 240
            let flag = topo.nodes && topo.nodes.length > 20 ? true : false
            let { name } = qs.parse(this.props.location.search)
            return (
                <Tabs
                    size="small"
                    tabBarExtraContent={this.topoBtns()}
                    animated={false}>
                    <TabPane tab={name}>
                        <div style={{ marginTop: '10px' }}>
                            <div className={styles.legend}>
                                <div><span></span>严重</div>
                                <div><span></span>重要</div>
                                <div><span></span>次重</div>
                                <div><span></span>提示</div>
                            </div>
                            <Topology
                                key={UUID.v1()}
                                data={topo}
                                width={w}
                                height={h}
                                center={flag}
                                zoomToFit={flag}
                                cid={`HOST_${id}`}
                                onDblclick={this.nodeDblClick.bind(this)} />
                        </div>
                    </TabPane>
                </Tabs>
            )
        }
    }
    render() {
        let { activeKey } = this.state
        let { list, nodeInfo } = this.props
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        let { active } = qs.parse(this.props.location.search)
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>主机详情</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item><a onClick={this.goList.bind(this)}>主机管理</a></Breadcrumb.Item>
                            <Breadcrumb.Item>主机详情</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs onChange={this.onChange.bind(this)} type="card" animated={false} defaultActiveKey={active && active === 'topo' ? 'topo' : ''}>
                        <TabPane tab="资源详情" key="detail">
                            <Tabs
                                size="small"
                                tabBarExtraContent={this.renderBtns()}
                                animated={false}>
                                <TabPane tab="概况" key="11">
                                    {
                                        this.renderDynamicPropertiesCollapse()
                                    }
                                </TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab="资源关系" key="relation">
                            <Tabs size="small" onChange={this.onTab.bind(this)} animated={false} activeKey={activeKey}>
                                <TabPane tab="处理器信息" key="imdsHostProcessor">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderNormalTable()}
                                    </div>
                                </TabPane>
                                <TabPane tab="内存信息" key="imdsHostMemory">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderNormalTable()}
                                    </div>
                                </TabPane>
                                <TabPane tab="端口信息" key="imdsHostPort">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderNormalTable()}
                                    </div>
                                </TabPane>
                                <TabPane tab="LLDP信息" key="imdsHostLLDP">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderNormalTable()}
                                    </div>
                                </TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab="下级资源" key="imdsHostSubRes">
                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                {this.renderNormalTable()}
                            </div>
                        </TabPane>
                        <TabPane tab="拓扑结构" key="topo">
                            {this.renderTopo()}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default HostInfo;
