
import * as React from 'react';
import * as _ from 'lodash';
import { Breadcrumb, Icon, Tabs, Spin } from 'antd';
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
import Headline from '../../../../components/Headline/'
import Summaries from '../../../../components/Summaries/'
import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import qs from 'querystringify'
import { stringify } from 'querystringify'
import LogShine from '../../../../components/LogShine/'
import fmtLog from '../../utils/fmtLog'
import emitter from '../../../../common/emitter'
const TabPane = Tabs.TabPane;

class SwitchboardInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pageNo } = qs.parse(this.props.location.search)
        this.state = {
            disabled: false,
            reset: false,
            tableLoading: false,
            pageNo: pageNo ? pageNo : 1,
            pageSize: 999,
            activeKey: 'imdsSwitchMotherboard',
            switch_id: match.params.id,
            events: [],
        }
    }
    goLink() {

    }
    goPage(num) {
        let { match } = this.props
        let pageNo = num
        let queryObj = { pageNo }
        this.props.history.push(`${match.url}`)
        this.getTableData({
            pageNo
        })
    }
    onChange(key) {
        let moTypeKey = 'switch'
        this.setState({
            activeKey: key
        })
        if (key === 'relation') {
            this.props.actions.resetList();
            this.setState({
                pageNo: 1,
                activeKey: 'imdsSwitchMotherboard'
            }, () => {
                this.getTableData({ pageNo: 1 })
            })
        } else {
            this.props.actions.resetObjAttributes()
            this.props.actions.resetObjData()
            let match = this.props.match
            let id = match.params.id
            this.props.actions.getObjAttributes(moTypeKey)
            this.props.actions.getObjData(moTypeKey, id)
        }
    }
    tabInfo = (key) => {
        this.setState({
            showBtn: key === 'log' ? false : true
        })
        if (key === 'log') {
            this.props.actions.getSyslog('switch', this.props.match.params.id, (data, err) => {
                if (data.code === 1) {
                    this.setState({
                        events: fmtLog(data.log)
                    })
                }
            })
        }
    }
    onTab(key) {
        let match = this.props.match
        let id = match.params.id
        this.props.actions.resetList();
        if (key === 'imdsSwitchPort15MiKpis') {
            this.props.actions.resetList();
            this.setState({
                disabled: true,
                activeKey: key
            }, () => {
                this.goPage(1)
                this.props.actions.getSummary('imdsSwitch15MiKpis', { switch_id: id });
            })

        } else {
            this.setState({
                disabled: false,
                activeKey: key
            }, () => {
                this.goPage(1)
            })
        }
    }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { pageSize, activeKey, switch_id } = this.state
        this.props.actions.queryList(activeKey, { pageNo, pageSize, switch_id }, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    renderTab() {
        let { list, summary } = this.props
        const { pageSize, tableLoading } = this.state;
        if (list) {
            return (
                <CompactTable
                    // goPage={this.goPage.bind(this)} // 翻页
                    // goLink={this.goLink.bind(this)}
                    pageSize={pageSize}
                    loading={tableLoading}
                    actionAuth={[]}
                    // pageAuth={false}
                    data={list}
                    outStyle={{ 'marginTop': '20px' }}
                />
            )
        } else {
            return (
                <div style={{ position: 'relative', height: '60px' }}>
                    <Spin />
                </div>
            )

        }
    }
    renderPerformanceTab() {
        let { list, summary } = this.props
        const { pageSize, tableLoading } = this.state;

        if (list && summary) {
            return (
                <div>
                    <Headline title="系统信息" />
                    <Summaries
                        data={summary}
                        colNum={2} />
                    <Headline
                        title="接口信息（按端口统计）"
                    />

                    <CompactTable
                        pageSize={pageSize}
                        actionAuth={[]}
                        data={list}
                        outStyle={{ 'marginTop': '20px' }}
                    />
                </div>
            )
        } else {
            return (
                <div style={{ position: 'relative', height: '50px' }}>
                    <Spin />
                </div>
            )
        }
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
                    if (res && res === 1) {
                        if (cb) {
                            cb()
                        }
                    }
                    if (res && res === 0 || error) {
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
        let moTypeKey = 'switch';
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
        let { activeKey, events } = this.state
        let { match, nodeInfo } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>交换机详情</h1>
                    {nodeInfo ? (<Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item>交换机管理</Breadcrumb.Item>
                        <Breadcrumb.Item>交换机详情</Breadcrumb.Item>
                    </Breadcrumb>) : ''}
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs onChange={this.onChange.bind(this)} animated={false} type="card">
                        <TabPane tab="资源详情" key="detail">
                            <Tabs defaultActiveKey="1"
                                animated={false}
                                size="small"
                                onChange={this.tabInfo}>
                                <TabPane tab="概况" key="overview">
                                    {this.renderDynamicPropertiesCollapse()}
                                </TabPane>
                                <TabPane tab="日志" key="log">
                                    <LogShine events={events} />
                                </TabPane>
                            </Tabs>
                        </TabPane>

                        <TabPane tab="资源关系" key="relation">
                            <Tabs size="small" activeKey={activeKey} onChange={this.onTab.bind(this)} animated={false}>
                                <TabPane tab={'主板信息'} key={'imdsSwitchMotherboard'}>
                                    {this.renderTab()}
                                </TabPane>
                                <TabPane tab={'端口信息'} key={'imdsSwitchPort'}>
                                    {this.renderTab()}
                                </TabPane>
                                <TabPane tab={'电源信息'} key={'imdsSwitchPower'}>
                                    {this.renderTab()}
                                </TabPane>
                                <TabPane tab={'风扇信息'} key={'imdsSwitchFan'}>
                                    {this.renderTab()}
                                </TabPane>
                                <TabPane tab={'性能信息'} key={'imdsSwitchPort15MiKpis'}>
                                    {this.renderPerformanceTab()}
                                </TabPane>

                                {/* <TabPane tab="告警信息" key="6">告警信息</TabPane> */}
                            </Tabs>
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        );
    }
}
export default SwitchboardInfo;