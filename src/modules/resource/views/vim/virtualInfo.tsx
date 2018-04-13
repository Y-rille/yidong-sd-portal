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

class VirtualInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        this.state = {
            events: [],
            vim_id: mp_node ? mp_node.params.id : ''
        }
    }
    onChange(key) {
        if (key === 'topo') {
            let { id } = this.props.match.params
            let dsname = 'imdsTopoVM'
            this.props.actions.getTopoState(dsname, { moInstId: id })
        }
    }
    handleEditData(d, cb) {
        let moTypeKey = 'vm'
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
    tabInfo = (key) => {
        this.setState({
            showBtn: key === 'log' ? false : true
        })
        if (key === 'log') {
            this.props.actions.getSyslog('vm', this.props.match.params.id, (data, err) => {
                if (data.code === 1) {
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
                        this.props.history.replace(`/resource/vim/${vim_id}/storage_volume/info/${id}`)
                    }
                }

            }
        })
    }
    nodeDblClick(data) {
        // console.log(data);
    }
    componentWillMount() {
        let moTypeKey = 'vm'
        let match = this.props.match
        let id = match.params.id
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey, id)
    }
    componentWillUnmount() {
        this.props.actions.resetList()
        this.props.actions.resetSyslog();
        this.props.actions.resetObjAttributes()
        this.props.actions.resetObjData()
        this.props.actions.resetTopo()
    }
    renderBtns() {
        return (
            <div className={styles.btn}>
                <Button
                    type="primary" ghost
                    icon="eye-o"
                    onClick={this.showStorageVolume.bind(this)}
                >查看存储卷</Button>
            </div>
        )
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
    renderTopo() {
        let data = {
            'nodes': [
                {
                    'id': '1',
                    'name': '10.255.242.115',
                    'label': 'D03-hpeDL380-COMP05',
                    'type': 'HOST',
                    'desc': 'D03-hpeDL380-COMP05',
                    'state': 0,
                    'bizFields': {
                        'serialid': '2102310YJA10H6003997',
                        'mgmtip': '10.255.242.115'
                    }
                },
                {
                    'id': '2',
                    'name': 'nfvo-proxy-node2',
                    'label': 'nfvo-proxy-node2',
                    'type': 'VM',
                    'state': 1,
                    'desc': 'nfvo-proxy-node2'
                },
                {
                    'id': '3',
                    'name': 'nfvo-proxy-node3',
                    'label': 'nfvo-proxy-node3',
                    'type': 'VM',
                    'state': 3,
                    'desc': 'nfvo-proxy-node3'
                },
                {
                    'id': '4',
                    'name': 'qinhe',
                    'label': 'qinhe',
                    'type': 'HA',
                    'state': 0,
                    'desc': 'qinhe'
                }
            ],
            'links': [
                {
                    'source': '4',
                    'state': 0,
                    'target': '1'
                },
                {
                    'source': '1',
                    'state': 1,
                    'target': '2'
                },
                {
                    'source': '1',
                    'state': 0,
                    'target': '3'
                }
            ]
        }
        let w = document.querySelector('.Pane2').clientWidth - 96
        let h = window.innerHeight - 240
        let flag = data.nodes.length > 20 ? true : false
        return (
            <Topology
                data={data}
                width={w}
                height={h}
                center={flag}
                zoomToFit={flag}
                onDblclick={this.nodeDblClick.bind(this)} />
        )
    }
    render() {
        let { nodeInfo } = this.props
        let { events } = this.state
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
                    <Tabs onChange={this.onChange.bind(this)} animated={false} type="card">
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
                            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                {this.renderTopo()}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        );
    }
}
export default VirtualInfo;