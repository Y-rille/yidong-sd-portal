import * as React from 'react';
import { matchPath } from 'react-router'
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Tabs, Spin, Button } from 'antd';
import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import Headline from '../../../../components/Headline'
import CompactTable from '../../../../components/CompactTable'
import qs from 'querystringify'
import emitter from '../../../../common/emitter'
import { ResourceActions } from '../../actions/index'

const TabPane = Tabs.TabPane;
export interface VirtualNetworkInfoProps {
    location
    history
    match
    config
    actions: ResourceActions
    nodeInfo
    objAttributes
    objData
    list
}
class VirtualNetworkInfo extends React.Component<VirtualNetworkInfoProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: 999,
        }
    }
    goList() {
        let path = this.props.location.pathname.replace(/\/info\/(\w+)/, '')
        this.props.history.push(`${path}`)
    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'name') {
            this.props.history.push(`${match.url}/subnet/${obj.id}`)
        }
    }
    handleEditData(d, cb) {
        let moTypeKey = 'virtual_network'
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
    handleManage() {
        let { config } = this.props
        let id = this.props.match.params.id
        window.open(`${config.vim_manage_link.virtual_network}${id}/detail`)
    }
    getTableData(activeKey) {
        let self = this
        let match = this.props.match
        let id = match.params.id
        this.props.actions.queryList(activeKey, { virtualNetwork: id }, null, true)
    }
    componentWillMount() {
        let moTypeKey = 'virtual_network'
        let match = this.props.match
        let id = match.params.id
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey, id)
        this.getTableData('imdsVirtualSubnet')
        this.getTableData('imdsVirtualPort')
        this.getTableData('imdsVirtualNetworkDHCP')
    }
    componentWillUnmount() {
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
    renderTable() {
        let { config, list } = this.props
        const { pageSize } = this.state
        if (list) {
            return (
                <div>
                    <div style={{ 'marginTop': '20px' }}>
                        <Headline title="子网">
                            <Button type="primary" onClick={this.handleManage.bind(this)}>管理</Button>
                        </Headline>
                        <CompactTable
                            data={list.imdsVirtualSubnet}
                            pageSize={pageSize}
                            goLink={this.goLink.bind(this)}
                        />
                    </div >
                    <div style={{ 'marginTop': '20px' }}>
                        <Headline title="端口">
                            <Button type="primary" onClick={this.handleManage.bind(this)}>管理</Button>
                        </Headline>
                        <CompactTable
                            data={list.imdsVirtualPort}
                            pageSize={pageSize}
                        />
                    </div >
                    <div style={{ 'marginTop': '20px' }}>
                        <Headline title="DHCP" />
                        <CompactTable
                            data={list.imdsVirtualNetworkDHCP}
                            pageSize={pageSize}
                        />
                    </div>
                </div>
            )
        }
    }
    render() {
        let { nodeInfo } = this.props
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>虚拟网络详情</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item><a onClick={this.goList.bind(this)}>虚拟网络管理</a></Breadcrumb.Item>
                            <Breadcrumb.Item>虚拟网络详情</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs animated={false} type="card">
                        <TabPane tab="资源详情" key="1">
                            <Tabs
                                defaultActiveKey="1"
                                animated={false}
                                size="small"
                            >
                                <TabPane tab="资源概况" key="overview">
                                    {this.renderDynamicPropertiesCollapse()}
                                    {this.renderTable()}
                                </TabPane>
                            </Tabs>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default VirtualNetworkInfo;