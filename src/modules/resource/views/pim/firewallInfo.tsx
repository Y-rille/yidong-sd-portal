
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
class FirewallInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pageNo } = qs.parse(this.props.location.search)
        this.state = {
            // reset: false,
            tableLoading: false,
            pageNo: pageNo ? pageNo : 1,
            pageSize: 10,
            activeKey: 'imdsFirewallMotherBoard',
            firewall: match.params.id
        }
    }
    callback = (key) => {
        // this.setState({
        //     pageNo: 1,
        //     activeKey: key
        // }, () => {
        //     this.props.actions.resetList()
        //     this.getTableData({ pageNo: 1 })
        // })
        let moTypeKey = 'firewall'
        this.setState({
            activeKey: key
        })
        if (key === 'relation') {
            let { pageNo } = this.state
            let queryObj = { pageNo }
            this.getTableData(queryObj)
        } else {
            this.props.actions.getObjAttributes(moTypeKey)
            this.props.actions.getObjData(moTypeKey)
        }
    }
    tabInfo = () => { }
    tabConnect = (key) => {
        let match = this.props.match
        let id = match.params.id
        this.setState({
            pageNo: 1,
            activeKey: key
        }, () => {
            this.props.actions.resetList()
            this.getTableData({ pageNo: 1 })
        })
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
    handleEditData(d) {
        // console.log(d, '=============>hostInfo')
        let moTypeKey = 'firewall'
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
        let moTypeKey = 'firewall';
        let firewall_id = this.props.match.params.id;
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey)
        this.props.actions.getSummary('imdsSwitch15MiKpis', { firewall: firewall_id });
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    renderDynamicPropertiesCollapse() {
        if (this.props.objAttributes && this.props.objData) {
            return (
                <DynamicPropertiesCollapse attributes={this.props.objAttributes} data={this.props.objData} editData={this.handleEditData.bind(this)} />
            )
        }
    }
    render() {
        let { nodeInfo, list, summary } = this.props
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        const { pageSize, tableLoading } = this.state;
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
                        <Breadcrumb.Item>防火墙管理</Breadcrumb.Item>
                        <Breadcrumb.Item>防火墙详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px 20px 0 20px' }}>
                    <Tabs onChange={this.callback} type="card" animated={false}>
                        <TabPane tab="资源详情" key="1" >
                            <Tabs
                                defaultActiveKey="1"
                                size="small"
                                animated={false}
                                onChange={this.tabInfo}
                            >
                                <TabPane tab="概况" key="1">
                                    {this.renderDynamicPropertiesCollapse()}
                                </TabPane>
                                <TabPane tab="日志" key="2"></TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab="资源关系" key="imdsFirewallMotherBoard">
                            <Tabs
                                defaultActiveKey="imdsFirewallMotherBoard"
                                size="small"
                                animated={false}
                                onChange={this.tabConnect}>
                                <TabPane tab="主板信息" key="imdsFirewallMotherBoard" style={{ padding: '20px 0' }}>
                                    <CompactTable
                                        goPage={this.goPage.bind(this)} // 翻页
                                        // goLink={this.goLink.bind(this)}
                                        data={list}
                                        actionAuth={['delete']}
                                        pageSize={pageSize}
                                        loading={tableLoading}
                                    // pageAuth={false}
                                    />
                                </TabPane>
                                <TabPane tab="性能信息" key="imdsFirewall15MiKpis" style={{ padding: '20px 0' }}>
                                    <div>
                                        {summary ? <Summaries colNum={5} data={summary} /> : ''}
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
export default FirewallInfo;