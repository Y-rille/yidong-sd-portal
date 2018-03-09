
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

class ServerInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pageNo } = qs.parse(this.props.location.search)
        // const log = []
        // for (let i = 0; i < 30; i++) {
        //     let item = {
        //         id: i,
        //         generated_at: '2018-02-27 15:40:00',
        //         hostname: 'quent.in',
        //         program: 'codedeploy-agent.log',
        //         message: 'INFO codedeploy-agent.log'
        //     }
        //     log.push(item)
        // }
        this.state = {
            status: 'up',
            reset: false,
            events: [],
            showBtn: true,
            tableLoading: false,
            pageNo: pageNo ? pageNo : 1,
            pageSize: 10,
            activeKey: 'imdsServerProcessor',
            serverId: match.params.id,
        }
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
                let operateType = self.state.status === 'down' ? 'poweron' : 'poweroff'
                let moTypeKey = 'server'
                let match = self.props.match
                let moInstId = match.params.id
                self.props.actions.operateStatus(moTypeKey, moInstId, operateType, (err, res) => {
                    // console.log(res, '================>res')
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
    // goPage = () => {
    //     this.props.history.push(`/resource/vim/1/server/info`)
    // }
    goLink(url) {
        this.props.history.push(url)
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
        this.props.actions.queryList('imdsServerHostInfo', {}, (err, res) => {
            if (!err && res['dataList']) {
                let server_info = _.head(res['dataList'])
                if (server_info) {
                    let id = server_info['id']
                    let vim_id = server_info['vim_id']
                    if (id && vim_id) {
                        this.props.history.replace(`/resource/vim/${vim_id}/host/info/${id}`)
                    }
                }
                // console.log(ID, vim_id, "11111111111111111111")
            }
        })
    }
    handleEditData(d) {
        // console.log(d, '=============>hostInfo')
        let moTypeKey = 'server'
        let match = this.props.match
        let moInstId = match.params.id
        // let moInstId = 
        this.props.actions.editObjData(moTypeKey, moInstId, d, (err, qdata) => {
            if (err || qdata.code !== 1) {

            }
            if (qdata.code === 1) {
                this.props.actions.getObjData(moTypeKey)
            }
        })
    }
    componentWillMount() {
        let moTypeKey = 'server';
        let server_id = this.props.match.params.id;
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey);
        this.props.actions.getSummary('imdsServerRaidCard', { server: server_id }, null, true);
        this.props.actions.getSummary('imdsServer15MiKpis', { server: server_id }, null, true);
    }
    renderDynamicPropertiesCollapse() {
        if (this.props.objAttributes && this.props.objData) {
            return (
                <DynamicPropertiesCollapse attributes={this.props.objAttributes} data={this.props.objData} editData={this.handleEditData.bind(this)} />
            )
        }
    }
    renderBtns() {
        let { showBtn } = this.state
        if (showBtn) {
            return (
                <div className={styles.btn}>
                    <Button
                        type="primary" ghost
                        icon="dingding"
                        style={{ margin: '0px 10px 0px 0' }}
                        onClick={this.confirmUpOrDown}
                    >{this.state.status === 'down' ? '上电' : '下电'}</Button>
                    <Button type="primary" style={{ margin: '0px 10px 0px 0' }} ghost icon="retweet" onClick={this.confirmRest.bind(this, 'reset')}>复位</Button>
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
        // console.log(info, '===========info')
    }
    onChange(key) {
        if (key === 'relation') {
            let { pageNo } = this.state
            let queryObj = {
                pageNo
            }
            this.getTableData(queryObj)
        }
    }
    onTab(key) {
        let match = this.props.match
        let id = match.params.id
        this.setState({
            pageNo: 1,
            activeKey: key
        }, () => {
            this.getTableData({ pageNo: 1 })
        })
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
        let { pageSize, activeKey, serverId } = this.state
        this.props.actions.queryList(activeKey, { pageNo, pageSize, serverId }, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    renderTab() {
        let title = ['处理器信息', '内存信息', '网卡信息', '硬盘信息', '风扇信息', '电源信息', '其他信息']
        let keys = ['imdsServerProcessor', 'imdsServerMemory', 'imdsServerEthernetinterface', 'imdsServerDisk', 'imdsServerFan', 'imdsServerPower', 'imdsServer15MiKpis']
        let { list, summary } = this.props;
        const { pageSize, tableLoading } = this.state;
        if (list) {
            return (
                keys.map((item, key) => {
                    // 网卡未
                    if (item === 'imdsServerEthernetinterface') {
                        return (
                            <TabPane tab={title[key]} key={item}>
                                <ServerNetworkCard data={list} />
                                <ServerNetworkCard data={list} />
                            </TabPane>
                        )
                    } else if (item === 'imdsServer15MiKpis') {
                        // 其他未
                        var arr = ['imdsServerPCIE', 'imdsServerRaidCard', '']
                        return (
                            <TabPane tab={title[key]} key={item}>
                                {
                                    // let item = 'imdsServerPCIE'

                                }
                                <Headline title="PCIe槽内信息" />
                                <CompactTable
                                    goPage={this.goPage.bind(this)}
                                    goLink={this.goLink.bind(this)}
                                    data={list}
                                    actionAuth={['delete']}
                                    pageAuth={false}
                                />

                                <div style={{ marginTop: '20px' }}>
                                    <Headline title="阵列卡信息" />
                                    <Summaries colNum={5} data={summary.imdsServerRaidCard} />
                                </div>
                                <div style={{ marginTop: '20px' }}>
                                    <Headline title="逻辑盘信息" />
                                    <CompactTable
                                        goPage={this.goPage.bind(this)} // 翻页
                                        goLink={this.goLink.bind(this)}
                                        data={list}
                                        actionAuth={['delete']}
                                        pageAuth={false}
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
                            <TabPane tab={title[key]} key={item}>
                                <CompactTable
                                    goPage={this.goPage.bind(this)} // 翻页
                                    // goLink={this.goLink.bind(this)}
                                    pageSize={pageSize}
                                    loading={tableLoading}
                                    actionAuth={[]}
                                    // pageAuth={true}
                                    data={list}
                                    outStyle={{ 'marginBottom': '20px' }}
                                />
                            </TabPane>
                        )
                    }
                }))
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                events: this.fmtData()
            })
        }, 4000)
    }

    render() {
        let { match, nodeInfo } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        let { events } = this.state
        let tdata = {
            'count': 2,
            'header': [{
                key: 'name',
                title: '网口名称'
            }, {
                key: 'address',
                title: '网口地址',
            }],
            'body': [
                {
                    'id': 1,
                    'name': 'Port1NC_MACAdress',
                    'address': '30:e1:71:6a:81:b4',
                },
                {
                    'id': 2,
                    'name': 'Port1NC_MACAdress',
                    'address': '30:e1:71:6a:81:b4',
                }
            ]
        }
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
                                defaultActiveKey="overview"
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
                                defaultActiveKey="1"
                                size="small"
                                animated={false}
                                onChange={this.onTab.bind(this)}>
                                {this.renderTab()}
                                {/* <TabPane tab="处理器信息" key="1" style={{ padding: '20px 0' }}>
                                    <CompactTable
                                        // goPage={this.goPage.bind(this)} // 翻页
                                        // goLink={this.goLink.bind(this)}
                                        // data={null}
                                        actionAuth={['delete']}
                                    />
                                </TabPane>
                                <TabPane tab="内存信息" key="2" style={{ padding: '20px 0' }}>
                                    <CompactTable
                                        // goPage={this.goPage.bind(this)} // 翻页
                                        // goLink={this.goLink.bind(this)}
                                        // data={null}
                                        actionAuth={['delete']}
                                    />
                                </TabPane>
                                <TabPane tab="网卡信息" key="3" style={{ padding: '20px 0' }}>
                                    <ServerNetworkCard data={tdata} />
                                    <ServerNetworkCard data={tdata} />
                                </TabPane>
                                <TabPane tab="硬盘信息" key="4" style={{ padding: '20px 0' }}>
                                    <CompactTable
                                        // goPage={this.goPage.bind(this)} // 翻页
                                        // goLink={this.goLink.bind(this)}
                                        // data={null}
                                        actionAuth={['delete']}
                                    />
                                </TabPane>
                                <TabPane tab="风扇信息" key="5" style={{ padding: '20px 0' }}>
                                    <CompactTable
                                        // goPage={this.goPage.bind(this)} // 翻页
                                        // goLink={this.goLink.bind(this)}
                                        // data={null}
                                        actionAuth={['delete']}
                                    />
                                </TabPane>
                                <TabPane tab="电源信息" key="6" style={{ padding: '20px 0' }}>
                                    <CompactTable
                                        // goPage={this.goPage.bind(this)} // 翻页
                                        // goLink={this.goLink.bind(this)}
                                        // data={null}
                                        actionAuth={['delete']}
                                    />
                                </TabPane>
                                <TabPane tab="其它信息" key="7" style={{ padding: '20px 0' }}>
                                    {this.renderOther()}
                                </TabPane> */}
                            </Tabs>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default ServerInfo;