import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Button, Spin, Cascader, Tabs, Row, Col, Modal } from 'antd';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import CompactTable from '../../../../components/CompactTable/'
import Summaries from '../../../../components/Summaries'
import qs from 'querystringify'
import LogShine from '../../../../components/LogShine/'
import fmtLog from '../../utils/fmtLog'
import emitter from '../../../../common/emitter'

class FirewallInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pageNo } = qs.parse(this.props.location.search)
        this.state = {
            tableLoading: false,
            pageNo: pageNo ? pageNo : 1,
            pageSize: 999,
            activeKey: 'imdsFirewallMotherBoard',
            detailKey: 'overview',
            firewall: match.params.id,
            events: [],
        }
    }
    goList() {
        let path = this.props.location.pathname.replace(/\/info\/(\w+)/, '')
        this.props.history.push(`${path}`)
    }

    sshLink = () => {
        let { objAttributes, objData, config } = this.props
        if (objAttributes && objData) {
            let _data = {}
            objData.columns.map((item, index) => {
                const key = item
                const values = objData.values[0] && objData.values[0][index]
                _data[key] = values
            });
            window.open(`${config.ssh}?ip=${_data['ManagerV4IP']}`)
        }
    }
    callback = (key) => {
        if (key === 'relation') {
            this.props.actions.resetList();
            this.setState({
                pageNo: 1,
                activeKey: 'imdsFirewallMotherBoard'
            }, () => {
                this.getTableData({ pageNo: 1 })
            })
        } else {
            this.setState({
                detailKey: 'overview'
            })
            this.props.actions.resetObjAttributes()
            this.props.actions.resetObjData()
            let moTypeKey = 'firewall'
            let match = this.props.match
            let id = match.params.id
            this.props.actions.getObjAttributes(moTypeKey)
            this.props.actions.getObjData(moTypeKey, id)
        }
    }
    tabInfo = (key) => {
        this.setState({
            showBtn: key === 'log' ? false : true,
            detailKey: key
        })
        if (key === 'log') {
            this.props.actions.getSyslog('firewall', this.props.match.params.id, (data, err) => {
                if (data.code === 1) {
                    let data_fix = data.log.split('\n')
                    this.setState({
                        events: data_fix
                    })
                }
            })
        }
    }
    tabConnect = (key) => {
        let match = this.props.match
        let id = match.params.id
        this.props.actions.resetList();
        if (key === 'imdsFirewall15MiKpis') {
            this.setState({
                activeKey: 'imdsFirewall15MiKpis'
            })
            let firewall_id = this.props.match.params.id;
            this.props.actions.getSummary('imdsFirewall15MiKpis', { firewall: firewall_id });
        } else {
            this.setState({
                pageNo: 1,
                activeKey: key
            }, () => {
                this.props.actions.resetList()
                this.getTableData({ pageNo: 1 })
            })
        }

    }
    goPage(num) {
        let pageNo = num
        let queryObj = { pageNo }
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
        let { pageSize, activeKey, firewall } = this.state
        this.props.actions.queryList(activeKey, { pageNo, pageSize, firewall }, () => {
            self.setState({
                tableLoading: false
            });
        })
    }

    handleEditData(d, cb) {
        let moTypeKey = 'firewall'
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
    renderBtns() {
        return (
            <div className={styles.btn}>
                <Button type="primary"
                    icon="link" ghost
                    onClick={this.sshLink.bind(this, 'reset')}>设备管理</Button>
            </div>
        )
    }
    renderMotherBoard() {
        let { list } = this.props
        const { pageSize, tableLoading } = this.state;
        if (list) {
            return (
                <CompactTable
                    goPage={this.goPage.bind(this)}
                    data={list}
                    pageSize={pageSize}
                    loading={tableLoading}
                />)
        } else {
            return (
                <div style={{ position: 'relative', height: '50px' }}>
                    <Spin />
                </div>
            )
        }
    }
    renderOther() {
        let { summary } = this.props
        if (summary) {
            return (
                <Summaries colNum={5} data={summary} />
            )
        } else {
            return (
                <div style={{ position: 'relative', height: '50px' }}>
                    <Spin />
                </div>
            )
        }
    }
    componentWillMount() {
        let moTypeKey = 'firewall';
        let match = this.props.match
        let id = match.params.id
        let firewall_id = this.props.match.params.id;
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey, id)
    }
    componentWillUnmount() {
        this.props.actions.resetList();
        this.props.actions.resetSummary();
        this.props.actions.resetList()
        this.props.actions.resetObjAttributes()
        this.props.actions.resetObjData()
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
    render() {
        let { nodeInfo, list, summary } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        const { pageSize, tableLoading, activeKey, events, detailKey } = this.state;
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>防火墙详情</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item><a onClick={this.goList.bind(this)}>防火墙管理</a></Breadcrumb.Item>
                        <Breadcrumb.Item>防火墙详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs onChange={this.callback} type="card" animated={false}>
                        <TabPane tab="资源详情" key="1" >
                            <Tabs
                                activeKey={detailKey}
                                size="small"
                                animated={false}
                                onChange={this.tabInfo}
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
                                activeKey={activeKey}
                                size="small"
                                animated={false}
                                onChange={this.tabConnect}>
                                <TabPane tab="主板信息" key="imdsFirewallMotherBoard" style={{ padding: '20px 0' }}>
                                    {this.renderMotherBoard()}
                                </TabPane>
                                <TabPane tab="性能信息" key="imdsFirewall15MiKpis" style={{ padding: '20px 0' }}>
                                    {this.renderOther()}
                                </TabPane>
                            </Tabs>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default FirewallInfo;