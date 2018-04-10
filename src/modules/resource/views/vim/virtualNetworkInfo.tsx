import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Tabs, Spin } from 'antd';
import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import Headline from '../../../../components/Headline'
import CompactTable from '../../../../components/CompactTable'
const TabPane = Tabs.TabPane;
class VirtualNetworkInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    static defaultProps = {
        list: {
            dataList: [
                { id: 6, name: 'MANO-NFVO', haCount: 1, hostCount: 2 },
                { id: 3, name: 'MANO-VNFM', haCount: 1, hostCount: 2 },
                { id: 4, name: 'VNF', haCount: 1, hostCount: 9 },
                { id: 2, name: 'ZJHZ-XSCYY1B2F-hpeAZ-ZABBIX', haCount: 1, hostCount: 1 },
                { id: 8, name: 'az1', haCount: 2, hostCount: 2 }
            ],
            header: [
                { key: 'haCount', title: 'HA数', link: false, width: 200 },
                { key: 'hostCount', title: '主机数', link: false, width: 200 },
                { key: 'id', title: 'id', link: false, width: 100 },
                { key: 'name', title: '名称', link: true, width: 240 }
            ],
            pageNo: 1,
            pageSize: 10,
            totalCount: 5
        }
    }
    onChange() {

    }
    goList() {
        let path = this.props.location.pathname.replace(/\/info\/(\w+)/, '')
        this.props.history.push(`${path}`)
    }
    componentWillMount() {
        let moTypeKey = 'vm'
        let match = this.props.match
        let id = match.params.id
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey, id)
    }
    componentWillUnmount() {
        this.props.actions.resetObjAttributes()
        this.props.actions.resetObjData()
    }
    renderDynamicPropertiesCollapse() {
        if (this.props.objAttributes && this.props.objData) {
            return (
                <DynamicPropertiesCollapse attributes={this.props.objAttributes}
                    data={this.props.objData} />
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
        // let { tableLoading, pageSize } = this.state
        let baseData = {
            network: '子网',
            port: '端口',
            dhcp: 'DHCP'
        }
        let titleTxt = ''
        for (const key in baseData) {
            if (type === key) {
                titleTxt = baseData[key]
            }
        }
        if (list) {
            return (
                <div>
                    <Headline title={titleTxt} />
                    <CompactTable
                        outStyle={{ marginBottom: '20px' }}
                        data={list}
                        pageSize={pageSize}
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
                    <Tabs onChange={this.onChange.bind(this)} animated={false} type="card">
                        <TabPane tab="资源详情" key="1">
                            <Tabs
                                defaultActiveKey="1"
                                animated={false}
                                size="small"
                            >
                                <TabPane tab="资源概况" key="overview">
                                    {this.renderDynamicPropertiesCollapse()}
                                    {this.renderTable('network')}
                                    {this.renderTable('port')}
                                    {this.renderTable('dhcp')}
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