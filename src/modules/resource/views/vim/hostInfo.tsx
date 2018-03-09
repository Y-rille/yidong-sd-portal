import * as React from 'react';
import * as _ from 'lodash';
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Modal, Spin } from 'antd';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import CompactTable from '../../../../components/CompactTable'
import { stringify } from 'querystringify'
import qs from 'querystringify'

const attributes = [
    {
        'moAttributeId': 1,
        'moTypeId': 1,
        'attributeType': 0,
        'attributeName': 'ID',
        'isobjectid': 1,
        'physicalTablefield': 'ID',
        'state': 1,
        'version': '1.0',
        'ediable': 1,
        'visible': 1,
        'attributeGroup': '基本信息'
    },
    {
        'moAttributeId': 2,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'NAME',
        'isobjectid': 0,
        'physicalTablefield': 'NAME',
        'state': 1,
        'version': '1.0',
        'ediable': 1,
        'visible': 1,
        'attributeGroup': '基本信息'
    },
    {
        'moAttributeId': 3,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'TIME',
        'isobjectid': 0,
        'physicalTablefield': 'TIME',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '基本信息'
    },
    {
        'moAttributeId': 4,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'EXPIRY_TIME',
        'isobjectid': 0,
        'physicalTablefield': 'EXPIRY_TIME',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '基本信息'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'SerialNumber',
        'isobjectid': 0,
        'physicalTablefield': 'SerialNumber',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '基本信息'
    },
    {
        'moAttributeId': 57,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'Hostname',
        'isobjectid': 0,
        'physicalTablefield': 'Hostname',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '基本信息'
    },
    {
        'moAttributeId': 57,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'VimId',
        'isobjectid': 0,
        'physicalTablefield': 'Hostname',
        'state': 1,
        'version': '1.0',
        'ediable': 1,
        'visible': 1,
        'attributeGroup': '位置信息'
    },
    {
        'moAttributeId': 57,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'Model',
        'isobjectid': 0,
        'physicalTablefield': 'Hostname',
        'state': 1,
        'version': '1.0',
        'ediable': 1,
        'visible': 1,
        'attributeGroup': '位置信息'
    },
    {
        'moAttributeId': 57,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'SerialNumber',
        'isobjectid': 0,
        'physicalTablefield': 'Hostname',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '位置信息'
    },
    {
        'moAttributeId': 57,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'OperationingStatus',
        'isobjectid': 0,
        'physicalTablefield': 'Hostname',
        'state': 1,
        'version': '1.0',
        'ediable': 1,
        'visible': 1,
        'attributeGroup': '维护信息'
    }
];

const data = {
    'headers': [
        'ID',
        'NAME',
        'TIME',
        'EXPIRY_TIME',
        'ext_id',
        'biz_id',
        '接口版本',
        '资源池系统标识',
        'ChassisType',
        '磁阵资产编号',
        '磁阵制造商',
        '磁阵型号',
        '磁阵序列号',
        '磁阵来源',
        '磁阵投入生产运行时间',
        '磁阵License信息',
        '磁阵软件版本',
        '磁阵运行状态',
        '磁阵资产状态',
        'Hostname',
    ],
    'columns': [
        'ID',
        'NAME',
        'TIME',
        'EXPIRY_TIME',
        'ext_id',
        'biz_id',
        'Version',
        'VimId',
        'ChassisType',
        'AssetTag',
        'Manufacturer',
        'Model',
        'SerialNumber',
        'PropertySource',
        'PutIntoProductionTime',
        'License',
        'SoftwareVersion',
        'OperationingStatus',
        'PropertyState',
        'Hostname'
    ],
    'values': [
        [
            7,
            'ZJHZ-NFV3-C-SQ5-3F-C03-hwDA5600-STOR01',
            '21:00:00',
            '21:00:01',
            '1081',
            '1081',
            '2.0',
            '1ea72c1b-fc85-4a99-adf8-7488c46d2a07',
            'DiskArray',
            'assetTg',
            'huawei',
            '5600_V3',
            '210235980510H6000012',
            'Property',
            '99days',
            '',
            '3.20.06.102',
            'OK',
            'Used',
            'huawei'
        ],
    ]
};

const lower_resources_data = {
    'count': 18,
    'header': [{
        key: 'id',
        title: '虚拟机名称',
        fixed: true,
        link: true,
    }, {
        key: 'name',
        title: '项目',
    }, {
        key: 'mobile',
        title: '主机',
    }, {
        key: 'vm',
        title: 'cpu数'
    },
    {
        key: 'email',
        title: '镜像',
    }, {
        key: 'cpu',
        title: 'IP地址'
    }, {
        key: 'memory',
        title: '状态'
    }, {
        key: 'role',
        title: '运行时间',
    }],
    'dataList': [
        {
            'id': 'whj_train1',
            'name': 'p3tenant_c119699c-39cb-400d-8f06-6a85b31f7eb9',
            'mobile': 'TO:XSYY1B2F-E01-hp',
            'vm': '93',
            'email': 'win2012',
            'cpu': 'HW-Volte-Test-Busi-V1175188.103.19.171',
            'memory': 'running',
            'role': '14天24小时'
        },
        {
            'id': 'whj_train2',
            'name': 'p3tenant_c119699c-39cb-400d-8f06-6a85b31f7eb9',
            'mobile': 'TO:XSYY1B2F-E01-hp',
            'vm': '93',
            'email': 'win2012',
            'cpu': 'HW-Volte-Test-Busi-V1175188.103.19.171',
            'memory': 'running',
            'role': '14天24小时'
        }
    ]
}
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
        if (key === 'relation' || key === 'subordinate') {
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
    handleEditData(d) {
        // console.log(d, '=============>hostInfo')
        let moTypeKey = 'host'
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
    showServer = (e) => {
        let server_info = _.head(this.props.list.dataList)
        if (server_info) { 
            let id = server_info['id']
            let pim_id = server_info['pim_id']
            if (id && pim_id) {
                this.props.history.replace(`/resource/pim/${pim_id}/server/info/${id}`)
            }
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
        this.props.actions.queryList('imdsHostServerInfo', {})
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
                                    // pageAuth={true}
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
                    <h1 className={styles.title}>主机管理</h1>
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
