import * as React from 'react';
import * as _ from 'lodash';
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Modal, Spin } from 'antd';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import CompactTable from '../../../../components/CompactTable'
import { stringify } from 'querystringify'
import qs from 'querystringify'
import styles from '../../style/index.less'
import Item from 'antd/lib/list/Item';

class HostInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pageNo } = qs.parse(this.props.location.search)
        this.state = {
            tableLoading: false,
            pageNo: pageNo ? pageNo : 1,
            pageSize: 10,
            activeKey: 'imdsHostProcessor',
            host: match.params.id,
        }
    }
    onChange(key) {
        if (key === 'detail') {
            let moTypeKey = 'host'
            this.props.actions.getObjAttributes(moTypeKey)
            this.props.actions.getObjData(moTypeKey)
        } else if (key === 'relation') {
            let { pageNo } = this.state
            let queryObj = {
                pageNo,
            }
            this.getTableData(queryObj)
        } else if (key === 'subordinate') {
            this.setState({
                pageNo: 1,
                activeKey: 'imdsHostSubRes'
            }, () => {
                this.getTableData({ pageNo: 1 })
            })
        }
    }
    onTab(key) {
        let match = this.props.match
        let id = match.params.id
        this.setState({
            pageNo: 1,
            activeKey: key
        }, () => {
            this.goPage(1)
        })
    }
    handleEditData(d) {
        // console.log(d, '=============>hostInfo')
        let moTypeKey = 'host'
        let match = this.props.match
        let moInstId = match.params.id
        this.props.actions.editObjData(moTypeKey, moInstId, d, (err, qdata) => {
            if (err || qdata.code !== 1) {

            }
            if (qdata.code === 1) {
                this.props.actions.getObjData(moTypeKey)
            }
        })
    }
    showServer = (e) => {
        this.props.actions.queryList('imdsHostServerInfo', {}, (err, res) => {
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
        let { pageSize, activeKey, host } = this.state
        this.props.actions.queryList(activeKey, { pageNo, pageSize, host }, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    componentWillMount() {
        let moTypeKey = 'host'
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey)
    }
    componentWillUnmount() {
        this.props.actions.resetList()
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
    renderDynamicPropertiesCollapse() {
        if (this.props.objAttributes && this.props.objData) {
            return (
                <DynamicPropertiesCollapse attributes={this.props.objAttributes} data={this.props.objData} editData={this.handleEditData.bind(this)} />
            )
        } else {
            return (<Spin />)
        }
    }
    renderTab() {
        let title = ['处理器信息', '内存信息', '端口信息', 'LLDP信息']
        let keys = ['imdsHostProcessor', 'imdsHostMemory', 'imdsHostPort', 'imdsHostLLDP']
        let list = this.props.list
        const { pageSize, tableLoading } = this.state;
        if (list) {
            return (
                keys.map((item, key) => {
                    if (item) {
                        return (
                            <TabPane tab={title[key]} key={item}>
                                <CompactTable
                                    goPage={this.goPage.bind(this)} // 翻页
                                    // goLink={this.goLink.bind(this)}
                                    pageSize={pageSize}
                                    loading={tableLoading}
                                    actionAuth={[]}
                                    // pageAuth={false}
                                    data={list}
                                    outStyle={{ 'marginTop': '20px' }}
                                />
                            </TabPane>
                        )
                    } else {
                        return (
                            <Spin />
                        )
                    }
                }))
        }
    }
    renderTable() {
        let list = this.props.list
        const { pageSize, tableLoading } = this.state;
        if (list) {
            return (
                <CompactTable
                    goPage={this.goPage.bind(this)} // 翻页
                    // goLink={this.goLink.bind(this)}
                    // pageAuth={false}
                    pageSize={pageSize}
                    loading={tableLoading}
                    actionAuth={[]}
                    data={list}
                    outStyle={{ 'marginTop': '20px' }}
                />
            )
        } else {
            return (
                <Spin />
            )
        }
    }
    render() {
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
                            <Breadcrumb.Item>主机管理</Breadcrumb.Item>
                            <Breadcrumb.Item>主机详情</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs onChange={this.onChange.bind(this)} type="card" animated={false}>
                        <TabPane tab="资源详情" key="detail">
                            <Tabs
                                onChange={this.onChange.bind(this)}
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
                            <Tabs size="small" onChange={this.onTab.bind(this)} animated={false}>
                                {this.renderTab()}
                            </Tabs>
                        </TabPane>
                        <TabPane tab="下级资源" key="subordinate">
                            {this.renderTable()}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default HostInfo;
