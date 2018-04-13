import * as React from 'react';
import { matchPath } from 'react-router'
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Tabs, Spin } from 'antd';
import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import Headline from '../../../../components/Headline'
import CompactTable from '../../../../components/CompactTable'
import qs from 'querystringify'
import emitter from '../../../../common/emitter'
const TabPane = Tabs.TabPane;
class VirtualNetworkInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        this.state = {
            virtualNetwork: match.params.id
        }
    }
    goList() {
        let path = this.props.location.pathname.replace(/\/info\/(\w+)/, '')
        this.props.history.push(`${path}`)
    }
    handleEditData(d, cb) {
        let moTypeKey = 'virtual_network'
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
        let moTypeKey = 'virtual_network'
        let match = this.props.match
        let id = match.params.id
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey, id)
        this.props.actions.queryList('imdsVirtualNetworkSubnet', { virtualNetwork: id })
        this.props.actions.queryList('imdsVirtualNetworkPort', { virtualNetwork: id })
        this.props.actions.queryList('imdsVirtualNetworkDHCP', { virtualNetwork: id })
    }
    componentWillUnmount() {
        this.props.actions.resetObjAttributes()
        this.props.actions.resetObjData()
    }
    renderDynamicPropertiesCollapse() {
        if (this.props.objAttributes && this.props.objData) {
            return (
                <DynamicPropertiesCollapse
                    outStyle={{ paddingTop: '20px' }}
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
    renderTable(type) {
        let { list } = this.props
        let pageSize = 999
        let { virtualNetwork } = this.state
        let baseData = {
            imdsVirtualNetworkSubnet: '子网',
            imdsVirtualNetworkPort: '端口',
            imdsVirtualNetworkDHCP: 'DHCP'
        }
        let titleTxt = ''
        for (const key in baseData) {
            if (type === key) {
                titleTxt = baseData[key]
            }
        }
        return (
            <div style={{ 'marginTop': '20px' }}>
                <Headline title={titleTxt} />
                {list ? (<CompactTable
                    data={list}
                    pageSize={pageSize}
                />) : ''}
            </div>
        )
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
                                    {this.renderTable('imdsVirtualNetworkSubnet')}
                                    {this.renderTable('imdsVirtualNetworkPort')}
                                    {this.renderTable('imdsVirtualNetworkDHCP')}
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