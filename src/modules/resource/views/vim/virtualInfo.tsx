import * as React from 'react';
import * as _ from 'lodash';
import { Breadcrumb, Icon, Button, Tabs, Spin } from 'antd';
import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import LogShine from '../../../../components/LogShine/'
import fmtLog from '../../utils/fmtLog'
import styles from '../../style/index.less'
import emitter from '../../../../common/emitter'
import { matchPath } from 'react-router'
const TabPane = Tabs.TabPane;
import { Topology } from '../../../../components/Topology/topology.js'
import '../../../../components/Topology/topology.css'
import qs from 'querystringify'
import matchMoTypeKeyAndRoute from '../../utils/matchMoTypeKeyAndRoute'
import UUID from 'uuid'
import shallowDiffers from '../../utils/shallowDiffers'

class VirtualInfo extends React.Component<any, any> {
    topoTimer: any
    topoStateTimer: any
    constructor(props) {
        super(props);
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        let { active } = qs.parse(this.props.location.search)
        let { id } = this.props.match.params
        this.state = {
            events: [],
            vim_id: mp_node ? mp_node.params.id : '',
            activeKey: active ? active : 'detail',
            id: id,
            topo: null
        }
    }
    onChange(key) {
        this.setState({
            activeKey: key
        })
        if (key === 'topo') {
            this.getTopo()
            this.getTopoState()
            if (!this.topoTimer && !this.topoStateTimer) {
                this.topoTimer = setInterval(() => {
                    this.getTopo()
                }, 300000)
                this.topoStateTimer = setInterval(() => {
                    this.getTopoState()
                }, 5000)
            }
        } else {
            if (this.topoTimer && this.topoStateTimer) {
                clearInterval(this.topoTimer)
                clearInterval(this.topoStateTimer)
            }
        }
    }
    handleEditData(d, cb) {
        let moTypeKey = 'vm'
        let match = this.props.match
        let moInstId = match.params.id
        this.props.actions.editObjData(moTypeKey, moInstId, d, (err, qdata) => {
            if (err || (qdata && qdata.code !== 1)) {
                emitter.emit('message', 'error', '修改失败')
                if (cb) {
                    cb()
                }
            } else if (qdata && qdata.code === 1) {
                emitter.emit('message', 'success', '修改成功')
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
    tabInfo = (key) => {
        this.setState({
            showBtn: key === 'log' ? false : true
        })
        if (key === 'log') {
            this.props.actions.getSyslog('vm', this.props.match.params.id, (data, err) => {
                if (data && data.code === 1) {
                    let data_fix = data.log.split('\n')
                    this.setState({
                        events: data_fix
                    })
                }
            })
        }
    }
    goList() {
        let path = this.props.location.pathname.replace(/\/info\/(\w+)/, '')
        this.props.history.push(`${path}`)
    }
    controlStation() {
        let { columns, values } = this.props.objData
        let { config } = this.props
        let baseData = _.zipObject(columns, _.head(values))
        if (baseData && baseData.project && baseData.uuid) {
            window.open(`${config.vim_manage}/${baseData.project}/instances/${baseData.uuid}`)
        }
    }
    showStorageVolume() {
        let vim_id = this.state.vim_id
        let { match } = this.props
        let vm_id = match.params.id
        this.props.actions.queryList('imdsVMStorageVolumInfo', { vm_id: vm_id }, (err, data) => {
            if (!err && data.dataList) {
                let sv_info = _.head(data.dataList)
                if (sv_info) {
                    let id = sv_info['id']
                    if (id && vim_id) {
                        this.props.history.push(`/resource/vim/${vim_id}/storage_volume/info/${id}`)
                    }
                }
            }
        })
    }
    goHost() {
        let { host_info } = this.state
        if (host_info) {
            let vm = this.props.match.params.id;
            let { active } = qs.parse(this.props.location.search)
            this.props.history.push(`/resource/vim/${host_info.vim_id}/host/${host_info.host_type}/info/${host_info.id}/?active=topo&name=${host_info.name}`)
        }
    }
    getTopo(cb?) {
        let { id } = this.state
        let dsname = 'imdsTopoVM'
        this.props.actions.getTopo(dsname, { moInstId: id }, (data, err) => {
            if (data) {
                if (cb) { cb() }
            }
        })
    }
    getTopoState() {
        let { id } = this.state
        let dsname = 'imdsTopoVM'
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
            let hostTypePath = hostType ? `/${hostType}/` : ''
            let route = matchMoTypeKeyAndRoute(moTypeKey.toLocaleLowerCase())
            if (route) {
                this.props.history.push(`/resource/${moMgrType}/${moMgrId}/${route}/${hostTypePath}info/${moInstId}?active=topo`)
            }
        }
    }
    refreshHandler() {
        this.getTopo()
    }
    componentWillMount() {
        let { id } = this.props.match.params
        let { active } = qs.parse(this.props.location.search)
        this.props.actions.queryList('imdsVMHostInfo', { vm_id: id }, (err, res) => {
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
            this.getTopo(this.getTopoState())
        } else {
            let moTypeKey = 'vm'
            this.props.actions.getObjAttributes(moTypeKey)
            this.props.actions.getObjData(moTypeKey, id)
        }
    }
    componentDidMount() {
        let { active } = qs.parse(this.props.location.search)
        if (active && active === 'topo' && !this.topoTimer && !this.topoStateTimer) {
            this.topoTimer = setInterval(() => {
                this.getTopo()
            }, 300000)
            this.topoStateTimer = setInterval(() => {
                this.getTopoState()
            }, 5000)
        }
    }
    componentWillUnmount() {
        this.props.actions.resetList()
        this.props.actions.resetSyslog();
        this.props.actions.resetObjAttributes()
        this.props.actions.resetObjData()
        clearInterval(this.topoTimer)
        clearInterval(this.topoStateTimer)
    }
    renderBtns() {
        return (
            <div className={styles.btn}>
                <Button
                    type="primary" ghost
                    icon="code"
                    onClick={this.controlStation.bind(this)}
                >控制台</Button>
                <Button
                    type="primary" ghost
                    icon="eye-o"
                    onClick={this.showStorageVolume.bind(this)}
                >查看存储卷</Button>
            </div>
        )
    }
    topoBtns() {
        return (
            <div className={styles.btn}>
                <Button
                    type="primary" ghost
                    icon="fork"
                    onClick={this.goHost.bind(this)}
                >主机拓扑</Button>
                <Button
                    type="primary" ghost
                    icon="reload"
                    onClick={this.refreshHandler.bind(this)}
                >刷新</Button>
            </div>
        )
    }
    renderDynamicPropertiesCollapse() {
        let { objAttributes, objData, dict, dictOptions } = this.props
        if (objAttributes && objData) {
            return (
                <DynamicPropertiesCollapse
                    attributes={objAttributes}
                    data={objData}
                    dict={dict}
                    dictOptions={dictOptions}
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
    renderTopo() {
        let { host_info, topo } = this.state
        if (host_info && topo) {
            let { id } = this.props.match.params
            let w = document.querySelector('.Pane2').clientWidth - 96
            let h = window.innerHeight - 240
            let flag = topo.nodes && topo.nodes.length > 20 ? true : false
            return (
                <Tabs
                    size="small"
                    tabBarExtraContent={this.topoBtns()}
                    animated={false}>
                    <TabPane tab={`所属主机：${host_info.name}`}>
                        <div style={{ marginTop: '10px' }}>
                            <div className={styles.legend}>
                                <div><span></span>严重</div>
                                <div><span></span>重要</div>
                                <div><span></span>次重</div>
                                <div><span></span>提示</div>
                            </div>
                            <Topology
                                key={UUID.v1()}
                                data={_.merge({}, topo)}
                                width={w}
                                height={h}
                                center={flag}
                                zoomToFit={flag}
                                cid={`VM_${id}`}
                                onDblclick={this.nodeDblClick.bind(this)} />
                        </div>
                    </TabPane>
                </Tabs>
            )
        }
    }
    render() {
        let { nodeInfo } = this.props
        let { events, activeKey } = this.state
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>虚拟机详情</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item><a onClick={this.goList.bind(this)}>虚拟机管理</a></Breadcrumb.Item>
                            <Breadcrumb.Item>虚拟机详情</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs onChange={this.onChange.bind(this)} animated={false} type="card" defaultActiveKey={activeKey}>
                        <TabPane tab="资源详情" key="detail">
                            <Tabs
                                defaultActiveKey="1"
                                animated={false}
                                size="small"
                                tabBarExtraContent={this.renderBtns()}
                                onChange={this.tabInfo}
                            >
                                <TabPane tab="资源概况" key="overview">
                                    {this.renderDynamicPropertiesCollapse()}
                                </TabPane>
                                <TabPane tab="日志" key="log">
                                    <LogShine events={events} />
                                </TabPane>
                            </Tabs>
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
export default VirtualInfo;