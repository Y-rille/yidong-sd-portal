import * as React from 'react';
import * as _ from 'lodash';
import Headline from '../../../../components/Headline';
import Summaries from '../../../../components/Summaries'
import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import { Breadcrumb, Icon, Button, Spin, Cascader, Tabs, Row, Col, Modal } from 'antd';
import styles from '../../style/index.less';
import CompactTable from '../../../../components/CompactTable/'
import LogShine from '../../../../components/LogShine/'
import fmtLog from '../../utils/fmtLog'
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
import emitter from '../../../../common/emitter'
import qs from 'querystringify'

class MageneticInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: 'up',
            reset: false,
            tableLoading: false,
            events: [],
            activeKey: 'imdsDiskarrayStoragePool',
            detailKey: 'overview',
            diskarray: this.props.match.params.id,
            pageSize: 999,
            pageNo: 1,
            showBtn: true,
        }
    }
    goList() {
        let path = this.props.location.pathname.replace(/\/info\/(\w+)/, '')
        this.props.history.push(`${path}`)
    }
    sshLink = () => {
        let { config } = this.props
        let user = {
            name: 'admin',
            pwd: '111'
        };
        window.open(`${config.ssh}?${qs.stringify(user)}`)
    }
    callback = (key) => {
        if (key === 'detail') {
            this.setState({
                detailKey: 'overview'
            })
            this.props.actions.resetObjAttributes()
            this.props.actions.resetObjData()
            let moTypeKey = 'diskarray';
            let match = this.props.match
            let id = match.params.id
            this.props.actions.getObjAttributes(moTypeKey)
            this.props.actions.getObjData(moTypeKey, id)
        } else if (key === 'relation') {
            this.props.actions.resetList();
            this.setState({
                pageNo: 1,
                activeKey: 'imdsDiskarrayStoragePool'
            }, () => {
                this.getTableData()
            })
        }
    }
    tabInfo = (key) => {
        this.setState({
            showBtn: key === 'log' ? false : true,
            detailKey: key
        })
        if (key === 'log') {
            this.props.actions.getSyslog('diskarray', this.props.match.params.id, (data, err) => {
                if (data.code === 1) {
                    let data_fix = data.log.split('\n')
                    this.setState({
                        events: data_fix
                    })
                }
            })
        }
    }
    tabConnect = (activeKey) => {
        let self = this
        let oldKey = this.state.activeKey
        this.props.actions.resetList()
        if (activeKey === 'performance' || activeKey === 'other') {
            this.setState({
                activeKey
            })
            let { diskarray } = this.state
            let perform = ['imdsDiskarrayLun15MiKpis', 'imdsDiskarrayPort15MiKpis', 'imdsDiskarrayTemperature']
            let other = ['imdsDiskarrayBBU', 'imdsDiskarrayFan', 'imdsDiskarrayPower', 'imdsDiskarrayController']
            let keyArr = activeKey === 'performance' ? perform : other
            for (let i = 0; i < keyArr.length; i++) {
                this.props.actions.queryList(keyArr[i], { pageNo: 1, pageSize: 999, diskarray }, null, keyArr[i])
            }
            if (activeKey === 'performance') {
                let diskarray_id = this.props.match.params.id;
                this.props.actions.getSummary('imdsDiskarray15MiKpis', { diskarray: diskarray_id });
            }
        } else {
            this.setState({
                activeKey,
                pageNo: 1
            }, () => {
                if (activeKey.length > 0) {
                    this.getTableData()
                }
            })
        }
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
            },
            onCancel() {
                // self.setState({
                //     reset: false
                // })
            }
        })
    }
    confirmUpOrDown = (e) => {
        // let title = '上电'
        let content = '服务器正在运行，确定上电吗？'
        if (this.state.status === 'down') {
            // title = '上电'
            content = '服务器正在运行，确定上电吗？'
        } else if (this.state.status === 'up') {
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
                self.setState({
                    status: self.state.status === 'down' ? 'up' : 'down'
                })
            },
            onCancel() {
            }
        })
    }

    goPage = (pageNo) => {
        this.setState({
            pageNo
        }, () => {
            this.getTableData()
        })
    }
    getTableData() {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { activeKey, diskarray, pageNo, pageSize } = this.state
        this.props.actions.queryList(activeKey, { pageNo, pageSize, diskarray }, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    renderBtns() {
        return (
            <div className={styles.btn}>
                <Button type="primary"
                    style={{ margin: '0px 10px 0px 0' }}
                    icon="link" ghost
                    onClick={this.sshLink.bind(this, 'reset')}>SSH</Button>
            </div>
        )
    }
    renderPerformance() {
        let self = this;
        let { summary, list } = this.props
        let pageSize = 999
        if (list && list.imdsDiskarrayLun15MiKpis && list.imdsDiskarrayPort15MiKpis && list.imdsDiskarrayTemperature) {
            return (
                <div>
                    <Headline title="节点信息" ></Headline>
                    {summary ? <Summaries colNum={5} data={summary} /> : <Spin />}
                    <Headline title="LUN性能信息" />
                    <CompactTable
                        pageSize={pageSize}
                        data={list.imdsDiskarrayLun15MiKpis}
                    />
                    <Headline title="前端业务端口信息" />
                    <CompactTable
                        pageSize={pageSize}
                        data={list.imdsDiskarrayPort15MiKpis}
                    />
                    <Headline title="磁盘框温度" />
                    <Summaries colNum={2} data={list.imdsDiskarrayTemperature} />
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
    renderNormalTable() {
        let { list } = this.props
        let { tableLoading } = this.state
        if (list && list.header) {
            return (
                <CompactTable
                    goPage={this.goPage.bind(this)} // 翻页
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
    renderOthers() {
        let { list } = this.props
        let pageSize = 999
        if (list && list.imdsDiskarrayBBU && list.imdsDiskarrayFan && list.imdsDiskarrayPower && list.imdsDiskarrayController) {
            return (
                <div>
                    <Headline title="BBU信息" />
                    <CompactTable
                        pageSize={pageSize}
                        data={list.imdsDiskarrayBBU}
                    />
                    <Headline title="风扇信息" />
                    <CompactTable
                        pageSize={pageSize}
                        data={list.imdsDiskarrayFan}
                    />
                    <Headline title="电源信息" />
                    <CompactTable
                        pageSize={pageSize}
                        data={list.imdsDiskarrayPower}
                    />
                    <Headline title="控制器信息" />
                    <CompactTable
                        pageSize={pageSize}
                        data={list.imdsDiskarrayController}
                    />
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
    handleEditData(d, cb) {
        let moTypeKey = 'diskarray'
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
    componentWillMount() {
        let moTypeKey = 'diskarray';
        let match = this.props.match
        let id = match.params.id
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey, id)
    }
    componentWillUnmount() {
        this.props.actions.resetList();
        this.props.actions.resetSummary();
        this.props.actions.resetSyslog();
        this.props.actions.resetObjAttributes()
        this.props.actions.resetObjData()
    }
    renderDynamicPropertiesCollapse() {
        if (this.props.objAttributes && this.props.objData) {
            return (
                <DynamicPropertiesCollapse attributes={this.props.objAttributes}
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
    render() {
        const { nodeInfo } = this.props
        let { activeKey, events, detailKey } = this.state
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>磁阵详情</h1>
                    {nodeInfo ? (<Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item><a onClick={this.goList.bind(this)}>磁阵管理</a></Breadcrumb.Item>
                        <Breadcrumb.Item>磁阵详情</Breadcrumb.Item>
                    </Breadcrumb>) : ''}
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs onChange={this.callback} type="card" animated={false}>
                        <TabPane tab="资源详情" key="detail" >
                            <Tabs
                                activeKey={detailKey}
                                size="small"
                                onChange={this.tabInfo}
                                animated={false}
                                tabBarExtraContent={this.renderBtns()}
                            >
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
                                size="small"
                                animated={false}
                                activeKey={activeKey}
                                onChange={this.tabConnect}>
                                <TabPane tab="RAID信息" key="imdsDiskarrayStoragePool">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderNormalTable()}
                                    </div>
                                </TabPane>
                                <TabPane tab="LUN信息" key="imdsDiskarrayLun">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderNormalTable()}
                                    </div>
                                </TabPane>
                                <TabPane tab="ISCSI信息" key="imdsDiskarrayEthernetInterface">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderNormalTable()}
                                    </div>
                                </TabPane>
                                <TabPane tab="硬盘信息" key="imdsDiskarrayDisk">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderNormalTable()}
                                    </div>
                                </TabPane>
                                <TabPane tab="性能信息" key="performance">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderPerformance()}
                                    </div>
                                </TabPane>
                                {/* <TabPane tab="告警" key=""></TabPane> */}
                                <TabPane tab="其它信息" key="other">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderOthers()}
                                    </div>
                                </TabPane>
                            </Tabs>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
export default MageneticInfo;