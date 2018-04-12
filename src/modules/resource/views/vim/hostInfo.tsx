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

class HostInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pageNo } = qs.parse(this.props.location.search)
        this.state = {
            tableLoading: false,
            pageNo: pageNo ? pageNo : 1,
            pageSize: 9999,
            activeKey: 'imdsHostProcessor',
            host: match.params.id,
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
    getTopo() {
        let { type, id } = this.props.match.params
        let dsname = ''
        switch (type) {
            case 'imdsHost':
                dsname = 'imdsTopoHost'
                break;
            case 'imdsController':
                dsname = 'imdsTopoController'
                break;
            default:
                dsname = 'imdsTopoStorage'
        }
        this.props.actions.getTopoState(dsname, { moInstId: id })
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
    showServer = (e) => {
        let host = this.props.match.params.id;
        this.props.actions.queryList('imdsHostServerInfo', { host }, (err, res) => {
            if (!err && res['dataList']) {
                let host_info = _.head(res['dataList'])
                if (host_info) {
                    let id = host_info['id']
                    let pim_id = host_info['pim_id']
                    if (id && pim_id) {
                        this.props.history.replace(`/resource/pim/${pim_id}/server/info/${id}`)
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
        // console.log(data);
    }
    componentWillMount() {
        let moTypeKey = 'host'
        let match = this.props.match
        let host = this.state.host
        let type = match.params.type
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey, host)
        switch (type) {
            case 'imdsHost':
                this.props.actions.getSummary('imdsHostOverview', { host: host }, null, true)
                break;
            case 'imdsController':
                this.props.actions.getSummary('imdsControllerOverview', { host: host }, null, true)
                break;
            default:
                this.props.actions.getSummary('imdsStorageOverview', { host: host }, null, true)
        }
    }
    componentWillUnmount() {
        this.props.actions.resetList()
        this.props.actions.resetObjAttributes()
        this.props.actions.resetObjData()
        this.props.actions.resetSummary()
        this.props.actions.resetTopo()
    }
    renderBtns() {
        return (
            <div className={styles.btn}>
                <Button
                    type="primary" ghost
                    icon="eye-o"
                    onClick={this.showServer}
                >查看服务器</Button>
            </div>
        )
    }
    topoBtns() {
        return (
            <div className={styles.btn}>
                <Button
                    type="primary" ghost
                    onClick={this.showServer}
                >物理拓扑</Button>
            </div>
        )
    }
    renderDynamicPropertiesCollapse() {
        let { summary } = this.props
        if (this.props.objAttributes && this.props.objData) {
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
        let { activeKey } = this.state
        let { list, nodeInfo } = this.props
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
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
                    <Tabs onChange={this.onChange.bind(this)} type="card" animated={false}>
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
                            <Tabs
                                size="small"
                                tabBarExtraContent={this.topoBtns()}
                                animated={false}>
                                <TabPane tab="计算节点C1">
                                    <div style={{ marginTop: '10px' }}>
                                        <div className={styles.legend}>
                                            <div><span></span>严重</div>
                                            <div><span></span>重要</div>
                                            <div><span></span>次重</div>
                                            <div><span></span>提示</div>
                                        </div>
                                        {this.renderTopo()}
                                    </div>
                                </TabPane>
                            </Tabs>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default HostInfo;
