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

class ServerInfo extends React.Component<any, any> {
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
            server: match.params.id,
        }
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
                self.setState({
                    status: self.state.status === 2 ? 1 : 2
                })
                let operateType = self.state.status === 2 ? 'poweron' : 'poweroff'
                let moTypeKey = 'server'
                let match = self.props.match
                let moInstId = match.params.id
                self.props.actions.operateStatus(moTypeKey, moInstId, operateType, (err, res) => {
                    if (res.code === 1) {
                        emitter.emit('message', 'success', '操作成功！')
                    }
                    if (err || res.code !== 1) {
                        emitter.emit('message', 'error', '操作失败！')
                    }
                })
            },
            onCancel() {
            }
        })
    }
    tabInfo = (key) => {
        this.setState({
            showBtn: key === 'log' ? false : true
        })
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
                    // console.log(res, '================>res')
                    if (res.code === 1) {
                        emitter.emit('message', 'success', '操作成功！')
                    }
                    if (err || res.code !== 1) {
                        emitter.emit('message', 'error', '操作失败！')
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
    goHost() {
        let server = this.props.match.params.id
        // console.log(server, "]==[========================>")
        this.props.actions.queryList('imdsServerHostInfo', { server }, (err, res) => {
            if (!err && res['dataList']) {
                let server_info = _.head(res['dataList'])
                if (server_info) {
                    let id = server_info['id']
                    let vim_id = server_info['vim_id']
                    if (id && vim_id) {
                        this.props.history.replace(`/resource/vim/${vim_id}/host/info/${id}`)
                    }
                }
            }
        })
    }
    handleEditData(d) {
        let moTypeKey = 'server'
        let match = this.props.match
        let moInstId = match.params.id
        this.props.actions.editObjData(moTypeKey, moInstId, d, (err, qdata) => {
            if (err || qdata.code !== 1) {

            }
            if (qdata.code === 1) {
                this.props.actions.getObjData(moTypeKey, moInstId)
            }
        })
    }
    onChange(key) {
        if (key === 'relation') {
            this.setState({
                pageNo: 1,
                activeKey: 'imdsServerProcessor'
            }, () => {
                this.getTableData({ pageNo: 1 })
            })
        } else {
            let moTypeKey = 'server';
            let match = this.props.match
            let moInstId = match.params.id
            this.props.actions.getObjAttributes(moTypeKey)
            this.props.actions.getObjData(moTypeKey, moInstId);
        }
    }
    onTab(key) {
        let match = this.props.match
        let id = match.params.id
        let arr = ['imdsServerPCIE', 'imdsServerRaidCard', 'imdsServerLogicalDrive', 'imdsServer15MiKpis']
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
                tableLoading: false
            });
        })
    }
    componentWillMount() {
        let moTypeKey = 'server';
        let match = this.props.match
        let id = match.params.id
        this.props.actions.queryListServerPower('imdsServerPowerStatus', { server: id })
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey, id);
    }
    renderDynamicPropertiesCollapse() {
        if (this.props.objAttributes && this.props.objData) {
            return (
                <DynamicPropertiesCollapse attributes={this.props.objAttributes} data={this.props.objData} editData={this.handleEditData.bind(this)} />
            )
        }
    }
    renderBtns() {
        let { showBtn, status } = this.state
        if (this.props.power && this.props.power.powerStatus !== status && !status) {
            this.setState({
                status: this.props.power.powerStatus
            })
        }
        if (showBtn && this.props.power && status) {
            return (
                <div className={styles.btn}>
                    <Button
                        type="primary" ghost
                        icon="dingding"
                        style={{ margin: '0px 10px 0px 0' }}
                        onClick={this.confirmUpOrDown}
                    >{this.state.status === 1 ? '上电' : '下电'}</Button>
                    <Button type="primary" style={{ margin: '0px 10px 0px 0' }} ghost icon="retweet"
                        onClick={this.confirmRest.bind(this, 'reset')}>复位</Button>
                    <Button type="primary" ghost icon="eye-o" onClick={this.goHost.bind(this)}>查看主机</Button>
                </div>
            )
        }
    }
    //     正则修改日志字符串  
    fmtData = () => {
        let _str = `Nov 21 10:05:22 188.103.18.24  #ILO 4: 11/21/2017 02:04 Server reset.
                    Nov 21 10:05:22 188.103.18.24  #ILO 4: 11/21/2017 02:04 Server power restored.
                    Nov 21 10:05:55 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
                    Nov 21 10:05:55 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
                    Nov 21 10:05:55 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
                    Nov 21 10:05:56 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
                    Nov 21 10:05:56 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
                    Nov 21 10:05:58 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
                    Nov 21 10:05:58 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
                    Nov 21 10:05:59 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
                    Nov 21 10:05:59 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
                    Nov 21 10:06:01 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.
                    Nov 21 10:06:01 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP login by admin - 188.103.15.147.
                    Nov 21 10:06:03 188.103.18.24  #ILO 4: 11/21/2017 02:04 IPMI/RMCP logout: admin - 188.103.15.147.`
        let patt1 = /\S+\b.*\d\d\:\d\d\:\d\d/
        let patt2 = /(\d{1,3}\.){3}\d{1,3}/
        let patt3 = /\#\S+\b.*\d(?=\:\s)/
        let patt4 = /\d{1,2}\/\S+\b.*/
        let info = []
        let arr = _str.split(/\n/)
        arr.map(function (item, index) {
            let _info = {
                generated_at: item.match(patt1)[0],
                IP: item.match(patt2)[0],
                hostname: item.match(patt3)[0],
                message: item.match(patt4)[0]
            }
            info.push(_info)
        })
        return info
    }

    renderTab() {
        let title = ['处理器信息', '内存信息', '网卡信息', '硬盘信息', '风扇信息', '电源信息', '其他信息']
        let keys = ['imdsServerProcessor', 'imdsServerMemory', 'imdsServerEthernetCard', 'imdsServerDisk', 'imdsServerFan', 'imdsServerPower', 'imdsServer15MiKpis']
        let { list, summary } = this.props;
        const { pageSize, tableLoading } = this.state;
        let self = this
        return (
            keys.map((item, key) => {
                if (item === 'imdsServerEthernetCard') {
                    list = list || {}
                    let ethernetCard = {}
                    ethernetCard = _.groupBy(list.dataList, function (obj) {
                        return JSON.stringify({ model: obj.model, ethernetInterfaceType: obj.ethernetInterfaceType, status: obj.status })
                    })
                    let ethernetCardTitle = _.keys(ethernetCard)
                    let ethernetCardTable = _.values(ethernetCard)
                    return (
                        <TabPane tab={title[key]} key={item}>
                            <div style={{ marginTop: '20px' }}>
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
                        </TabPane>
                    )
                } else if (item === 'imdsServer15MiKpis') {
                    list = list || {}
                    summary = summary || {}
                    if (list && summary) {
                        return (
                            <TabPane tab={title[key]} key={item}>
                                <Headline title="PCIe槽内信息" />
                                <CompactTable
                                    actionAuth={['delete']}
                                    pageSize={pageSize}
                                    data={list.imdsServerPCIE}
                                />
                                <div style={{ marginTop: '20px' }}>
                                    <Headline title="阵列卡信息" />
                                    <Summaries colNum={5} data={summary.imdsServerRaidCard} />
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <Headline title="逻辑盘信息" />
                                    <CompactTable
                                        data={list.imdsServerLogicalDrive}
                                        actionAuth={['delete']}
                                        pageSize={pageSize}
                                    />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <Headline title="其他信息" />
                                    <Summaries colNum={5} data={summary.imdsServer15MiKpis} />
                                </div>
                            </TabPane>
                        )
                    } else {
                        return (
                            <div style={{ position: 'relative', height: '30px' }}>
                                <Spin />
                            </div>
                        )
                    }

                } else {
                    return (
                        <TabPane tab={title[key]} key={item}>
                            <CompactTable
                                pageSize={pageSize}
                                loading={tableLoading}
                                actionAuth={[]}
                                data={list}
                                outStyle={{ 'marginTop': '20px', 'marginBottom': '20px' }}
                            />
                        </TabPane>
                    )
                }
            }))

    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                events: this.fmtData()
            })
        }, 4000)
    }
    componentWillUnmount() {
        this.props.actions.resetList();
        this.props.actions.resetSummary();
    }
    render() {
        let { match, nodeInfo } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        let { events, activeKey } = this.state
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
                        <Breadcrumb.Item>服务器管理</Breadcrumb.Item>
                        <Breadcrumb.Item>服务器详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px 20px 0 20px' }}>
                    <Tabs onChange={this.onChange.bind(this)} type="card" animated={false}>
                        <TabPane tab="资源详情" key="detail" >
                            <Tabs
                                size="small"
                                animated={false}
                                onChange={this.tabInfo}
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
                                {this.renderTab()}
                            </Tabs>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default ServerInfo;