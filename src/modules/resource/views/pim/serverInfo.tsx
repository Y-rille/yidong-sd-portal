import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Switch, Route, Redirect, matchPath } from 'react-router-dom'
import { Breadcrumb, Icon, Button, Spin, Cascader, Tabs, Row, Col, Modal } from 'antd';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import CompactTable from '../../../../components/CompactTable/'
import Headline from '../../../../components/Headline';
import Summaries from '../../../../components/Summaries'
import ServerNetworkCard from '../../../../components/ServerNetworkCard'
import LogShine from '../../../../components/LogShine/'
import { stringify } from 'querystringify'
import qs from 'querystringify'
import emitter from '../../../../common/emitter'
import fmtLog from '../../utils/fmtLog'
import { Topology } from '../../../../components/Topology/topology.js'
import '../../../../components/Topology/topology.css'
import mathMoTypeKeyAndRoute from '../../utils/mathMoTypeKeyAndRoute'
import UUID from 'uuid'
import shallowDiffers from '../../utils/shallowDiffers'

class ServerInfo extends React.Component<any, any> {
    timer: any
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pageNo } = qs.parse(this.props.location.search)
        this.state = {
            status: null,
            reset: false,
            events: [],
            showBtn: true,
            tableLoading: false,
            pageNo: pageNo ? pageNo : 1,
            pageSize: 9999,
            activeKey: 'imdsServerProcessor',
            detailKey: 'overview',
            host_info: null,
            server: match.params.id,
            topoData: null
        }
    }
    goList() {
        let path = this.props.location.pathname.replace(/\/info\/(\w+)/, '')
        this.props.history.push(`${path}`)
    }
    confirmUpOrDown = (e) => {
        // let title = '上电'
        let content = '服务器正在运行，确定上电吗？'
        if (this.state.status === 2) {
            // title = '上电'
            content = '服务器正在运行，确定上电吗？'
        } else if (this.state.status === 1) {
            // title = '下电'
            content = '服务器正在运行，确定下电吗？'
        }
        let self = this
        confirm({
            title: content,
            content: '',
            okText: '确认',
            cancelText: '取消',
            iconType: 'exclamation-circle',
            onOk() {
                let operateType = self.state.status === 2 ? 'poweron' : 'poweroff'
                let moTypeKey = 'server'
                let match = self.props.match
                let moInstId = match.params.id
                self.props.actions.operateStatus(moTypeKey, moInstId, operateType, (err, res) => {
                    if (res.code === 1) {
                        emitter.emit('message', 'success', '操作成功！')
                        self.setState({
                            status: self.state.status === 2 ? 1 : 2
                        })
                        self.getAttributes()
                    }
                    if (err || (res && res.code !== 1)) {
                        let msg = err && err.message ? err.message : '操作失败！'
                        emitter.emit('message', 'error', msg)
                    }
                })
            },
            onCancel() {
            }
        })
    }
    tabInfo = (key) => {
        this.setState({
            showBtn: key === 'log' ? false : true,
            detailKey: key
        })
        if (key === 'log') {
            this.props.actions.getSyslog('server', this.props.match.params.id, (data, err) => {
                if (data.code === 1) {
                    let data_fix = data.log.split('\n')
                    this.setState({
                        events: data_fix
                    })
                }
            })
        }
    }
    sshLink = () => {
        let { config } = this.props
        let user = {
            name: 'admin',
            pwd: '111'
        };
        window.open(`${config.ssh}?${qs.stringify(user)}`)
    }
    confirmRest = () => {
        let self = this
        let content = '服务器正在运行，确定复位吗？'
        confirm({
            title: content,
            content: '',
            okText: '确认',
            cancelText: '取消',
            iconType: 'exclamation-circle',
            onOk() {
                self.setState({
                    reset: true
                })
                let operateType = 'reboot'
                let moTypeKey = 'server'
                let match = self.props.match
                let moInstId = match.params.id
                self.props.actions.operateStatus(moTypeKey, moInstId, operateType, (err, res) => {
                    if (res.code === 1) {
                        emitter.emit('message', 'success', '操作成功！')
                        self.getAttributes()
                    }
                    if (err || (res && res.code !== 1)) {
                        let msg = err && err.message ? err.message : '操作失败！'
                        emitter.emit('message', 'error', msg)
                    }
                })

            },
            onCancel() {
                // self.setState({
                //     reset: false
                // })
            }
        })
    }
    goHost(e, topo?) {
        let { host_info } = this.state
        if (host_info) {
            let vm = this.props.match.params.id;
            let topoFlag = topo ? `?active=topo&name=${host_info.name}` : ''
            this.props.history.push(`/resource/vim/${host_info.vim_id}/host/${host_info.host_type}/info/${host_info.id}${topoFlag}`)
        }
    }
    handleEditData(d, cb) {
        let moTypeKey = 'server'
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
    onChange(key) {
        if (key === 'relation') {
            this.props.actions.resetList();
            this.setState({
                pageNo: 1,
                activeKey: 'imdsServerProcessor'
            }, () => {
                this.getTableData({ pageNo: 1 })
            })
        } else if (key === 'detail') {
            this.setState({
                detailKey: 'overview'
            })
            this.props.actions.resetObjAttributes()
            this.props.actions.resetObjData()
            let moTypeKey = 'server';
            let match = this.props.match
            let moInstId = match.params.id
            this.props.actions.getObjAttributes(moTypeKey)
            this.props.actions.getObjData(moTypeKey, moInstId);
        } else {
            this.getTopo()
            if (!this.timer) {
                let timer = setInterval(() => {
                    this.getTopo()
                }, 300000)
            }
        }
    }
    onTab(key) {
        let match = this.props.match
        let id = match.params.id
        let arr = ['imdsServerPCIE', 'imdsServerRaidCard', 'imdsServerLogicalDrive', 'imdsServer15MiKpis']
        this.props.actions.resetList();
        if (key === 'imdsServer15MiKpis') {
            this.setState({
                tableLoading: true,
                activeKey: 'imdsServer15MiKpis'
            });
            let self = this
            let { server } = this.state
            arr.map((item, keys) => {
                this.props.actions.queryList(item, { server }, () => {
                    self.setState({
                        tableLoading: false
                    });
                }, item)
            })
            this.props.actions.getSummary('imdsServerRaidCard', { server: id }, null, true);
            this.props.actions.getSummary('imdsServer15MiKpis', { server: id }, null, true);
        } else {
            this.setState({
                pageNo: 1,
                activeKey: key
            }, () => {
                this.getTableData({ pageNo: 1 })
            })
        }
    }
    goPage(num) {
        let { match } = this.props
        let pageNo = num
        let queryObj = { pageNo }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { pageSize, activeKey, server } = this.state
        this.props.actions.queryList(activeKey, { pageNo, pageSize, server }, () => {
            self.setState({
                tableLoading: false,
            });
        })
    }
    getAttributes() {
        let moTypeKey = 'server';
        let match = this.props.match
        let id = match.params.id
        this.props.actions.getObjData(moTypeKey, id);
    }
    getTopo() {
        let { id } = this.props.match.params
        let dsname = 'imdsTopoServer'
        this.props.actions.getTopoState(dsname, { moInstId: id }, (data, err) => {
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
    nodeDblClick(data) {
        if (data && data.model && data.model.attributes && data.model.attributes.bizFields && data.model.attributes.bizFields.ifRedirect) {
            let { moMgrType, moMgrId, moTypeKey, moInstId, hostType } = data.model.attributes.bizFields
            this.props.history.push(`/resource/${moMgrType}/${moMgrId}/${mathMoTypeKeyAndRoute(moTypeKey)}/info/${moInstId}?active=topo`)
        }
    }
    refreshHandler() {
        this.getTopo()
    }
    componentWillMount() {
        let moTypeKey = 'server';
        let { id } = this.props.match.params
        let { active } = qs.parse(this.props.location.search)
        this.props.actions.queryList('imdsServerHostInfo', { server: id }, (err, res) => {
            if (!err && res['dataList']) {
                let host_info = _.head(res['dataList'])
                if (host_info) {
                    this.setState({
                        host_info: host_info
                    })
                }
            }
        })
        if (active && active === 'topo') {
            this.getTopo()
        } else {
            this.props.actions.queryListServerPower('imdsServerPowerStatus', { server: id })
            this.props.actions.getObjAttributes(moTypeKey)
            this.getAttributes()
        }
    }
    componentDidMount() {
        let { active } = qs.parse(this.props.location.search)
        if (active && active === 'topo' && !this.timer) {
            let timer = setInterval(() => {
                this.getTopo()
            }, 300000)
        }
    }
    componentWillUnmount() {
        this.props.actions.resetList();
        this.props.actions.resetSummary();
        this.props.actions.resetList()
        this.props.actions.resetObjAttributes()
        this.props.actions.resetObjData()
        clearInterval(this.timer)
    }
    renderDynamicPropertiesCollapse() {
        if (this.props.objAttributes && this.props.objData) {
            return (
                <DynamicPropertiesCollapse
                    attributes={this.props.objAttributes}
                    data={this.props.objData}
                    editData={this.handleEditData.bind(this)} />
            )
        } else {
            return (
                <div style={{ position: 'relative', padding: '50px' }}>
                    <Spin />
                </div>
            )
        }
    }
    renderBtns() {
        let { showBtn, status } = this.state
        let _power = this.props.power
        if (_power && _power.powerStatus !== status && !status) {
            this.setState({
                status: _power.powerStatus
            })
        }
        if (showBtn && status) {
            if (_power) {
                return (
                    <div className={styles.btn}>
                        <Button type="primary"
                            style={{ margin: '0px 10px 0px 0' }}
                            icon="link" ghost
                            onClick={this.sshLink.bind(this, 'reset')}>SSH</Button>
                        <Button
                            type="primary" ghost
                            icon="dingding"
                            style={{ margin: '0px 10px 0px 0' }}
                            onClick={this.confirmUpOrDown}
                        >{this.state.status === 2 ? '上电' : '下电'}</Button>
                        <Button type="primary" disabled={this.state.status === 2} style={{ margin: '0px 10px 0px 0' }} ghost icon="retweet"
                            onClick={this.confirmRest.bind(this, 'reset')}>复位</Button>
                        <Button type="primary" ghost icon="eye-o" onClick={this.goHost.bind(this)}>查看主机</Button>
                    </div>
                )
            } else {
                return (
                    <div className={styles.btn}>
                        <Button type="primary" style={{ margin: '0px 10px 0px 0' }} ghost icon="retweet"
                            onClick={this.confirmRest.bind(this, 'reset')}>复位</Button>
                        <Button type="primary" ghost icon="eye-o" onClick={this.goHost.bind(this)}>查看主机</Button>
                    </div>
                )
            }
        } else {
            return (<div></div>)
        }
    }
    topoBtns() {
        return (
            <div className={styles.btn}>
                <Button
                    type="primary" ghost
                    icon="fork"
                    onClick={this.goHost.bind(this, true)}
                    style={{ margin: '0px 10px 0px 0' }}
                >虚拟拓扑</Button>
                <Button
                    type="primary" ghost
                    icon="reload"
                    onClick={this.refreshHandler.bind(this)}
                >刷新</Button>
            </div>
        )
    }
    renderMemory() {
        let { list } = this.props
        let { tableLoading } = this.state
        let sum = 0
        let total = ''
        if (list && list.header && list.dataList) {
            for (var i = 0; i < list.dataList.length; i++) {
                let every = parseInt(list.dataList[i].CapacityMiB, 10)
                sum += every
            }
            total = (sum / 1024).toFixed(2)
            return (
                <CompactTable
                    goPage={this.goPage.bind(this)}
                    loading={tableLoading}
                    data={list}
                    footInfoAuth={<div>*&nbsp;总容量(GB)&nbsp;:&nbsp;{total}</div>}
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
    renderNormalTable() {
        let { list } = this.props
        let { tableLoading } = this.state
        if (list && list.header) {
            return (
                <CompactTable
                    goPage={this.goPage.bind(this)}
                    loading={tableLoading}
                    data={list}
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
    renderServerEthernetCardTable() {
        let { list } = this.props
        let ethernetCard = {}
        ethernetCard = _.groupBy(list && list.dataList, function (obj) {
            return JSON.stringify({ Model: obj.Model, EthernetInterfaceType: obj.EthernetInterfaceType, Status: obj.Status })
        })
        let ethernetCardTitle = _.keys(ethernetCard)
        let ethernetCardTable = _.values(ethernetCard)
        if (list && list.header) {
            return (
                <div style={{ margin: '20px 0' }}>
                    {
                        _.map(ethernetCardTitle, (card, i) => {
                            let cardData = {
                                title: JSON.parse(card),
                                table: {
                                    header: list.header,
                                    dataList: ethernetCardTable[i],
                                    pageNo: list.pageNo,
                                    pageSize: list.pageSize,
                                    totalCount: list.totalCount
                                }
                            }
                            return <ServerNetworkCard data={cardData} />
                        })
                    }
                </div>
            )
        } else {
            return (
                <div style={{ position: 'relative', height: '30px' }}>
                    <Spin />
                </div>
            )
        }
    }
    renderOthers() {
        let { list, summary } = this.props
        let pageSize = 999
        if (list && summary) {
            return (
                <div>
                    <Headline title="PCIe槽内信息" />
                    <CompactTable
                        pageSize={pageSize}
                        data={list.imdsServerPCIE}
                    />
                    <div style={{ marginTop: '20px' }}>
                        <Headline title="阵列卡信息" />
                        <Summaries colNum={3} data={summary.imdsServerRaidCard} />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Headline title="逻辑盘信息" />
                        <CompactTable
                            data={list.imdsServerLogicalDrive}
                            pageSize={pageSize}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <Headline title="其他信息" />
                        <Summaries colNum={3} data={summary.imdsServer15MiKpis} />
                    </div>
                </div>
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
        let { host_info, topo } = this.state
        if (host_info && topo) {
            let { id } = this.props.match.params
            let w = document.querySelector('.Pane2').clientWidth - 96
            let h = window.innerHeight - 240
            let flag = topo.nodes.length > 20 ? true : false
            return (
                <Tabs
                    size="small"
                    tabBarExtraContent={this.topoBtns()}
                    animated={false}>
                    <TabPane tab="">
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
                                cid={`SERVER_${id}`}
                                animate={false}
                                onDblclick={this.nodeDblClick.bind(this)} />
                        </div>
                    </TabPane>
                </Tabs>
            )
        }
    }
    render() {
        let { match, nodeInfo } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        let { events, activeKey, detailKey } = this.state
        let { active } = qs.parse(this.props.location.search)
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>服务器详情</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item><a onClick={this.goList.bind(this)}>服务器管理</a></Breadcrumb.Item>
                        <Breadcrumb.Item>服务器详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs onChange={this.onChange.bind(this)} type="card" animated={false} defaultActiveKey={active && active === 'topo' ? 'topo' : ''}>
                        <TabPane tab="资源详情" key="detail" >
                            <Tabs
                                size="small"
                                animated={false}
                                onChange={this.tabInfo}
                                activeKey={detailKey}
                                tabBarExtraContent={this.renderBtns()}>
                                <TabPane tab="概况" key="overview">
                                    {this.renderDynamicPropertiesCollapse()}
                                </TabPane>
                                <TabPane tab="日志" key="log">
                                    <LogShine events={events} />
                                </TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab="资源关系" key="relation">
                            <Tabs
                                activeKey={activeKey}
                                size="small"
                                animated={false}
                                onChange={this.onTab.bind(this)}>
                                <TabPane tab="处理器信息" key="imdsServerProcessor">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderNormalTable()}
                                    </div>
                                </TabPane>
                                <TabPane tab="内存信息" key="imdsServerMemory">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderMemory()}
                                    </div>
                                </TabPane>
                                <TabPane tab="网卡信息" key="imdsServerEthernetCard">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderServerEthernetCardTable()}
                                    </div>
                                </TabPane>
                                <TabPane tab="硬盘信息" key="imdsServerDisk">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderNormalTable()}
                                    </div>
                                </TabPane>
                                <TabPane tab="风扇信息" key="imdsServerFan">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderNormalTable()}
                                    </div>
                                </TabPane>
                                <TabPane tab="电源信息" key="imdsServerPower">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderNormalTable()}
                                    </div>
                                </TabPane>
                                <TabPane tab="其它信息" key="imdsServer15MiKpis">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderOthers()}
                                    </div>
                                </TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab="拓扑结构" key="topo" className={styles.topoTab}>
                            {this.renderTopo()}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default ServerInfo;