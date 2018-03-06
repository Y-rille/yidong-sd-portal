import * as React from 'react';
import * as _ from 'lodash';
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Modal } from 'antd';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import CompactTable from '../../../../components/CompactTable'

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
    'body': [
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
        this.state = {
            reset: false
        }
    }
    onChange(key) {
        if (key === '资源关系') {
            this.props.actions.queryList('imdsQueryListHostProcessor', { 'host': 1 })
        }
    }
    onTab(key) {
        let match = this.props.match
        let id = match.params.id
        this.props.actions.queryList(key, { 'host': id })
    }
    handleEditData(d) {
        // console.log(d, '=============>hostInfo')
        this.props.actions.editObjData(1, 1, d, (err, qdata) => {
            if (err || qdata.code !== 1) {

            }
            if (qdata.code === 1) {
                this.props.actions.getObjData(1)
            }
        })
    }
    showServer = (e) => {
        this.props.history.replace(`/resource/pim/4/server/info/1`)
    }
    componentWillMount() {
        this.props.actions.getObjAttributes(1)
        this.props.actions.getObjData(1)
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
    renderTab() {
        let title = ['处理器信息', '内存信息', '端口信息', 'LLDP信息']
        let keys = ['imdsQueryListHostProcessor', 'imdsQueryListHostMemory', 'imdsQueryListHostPort', 'imdsQueryListHostLLDP']
        let list = this.props.list
        if (list) {
            return (
                keys.map((item, key) => {
                    return (
                        <TabPane tab={title[key]} key={item}>
                            <CompactTable
                                // goPage={this.goPage.bind(this)} // 翻页
                                // goLink={this.goLink.bind(this)}
                                actionAuth={[]}
                                // pageAuth={true}
                                data={list}
                                outStyle={{ 'marginTop': '20px' }}
                            />
                        </TabPane>
                    )
                })
            )
        }
    }
    renderDynamicPropertiesCollapse() {
        if (this.props.objAttributes && this.props.objData) {
            return (
                <DynamicPropertiesCollapse attributes={this.props.objAttributes} data={this.props.objData} editData={this.handleEditData.bind(this)} />
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
                        <TabPane tab="资源详情" key="1">
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
                        <TabPane tab="资源关系" key="2">
                            <Tabs size="small" onChange={this.onTab.bind(this)} animated={false}>
                                {this.renderTab()}
                            </Tabs>
                        </TabPane>
                        <TabPane tab="下级资源" key="3">
                            <CompactTable
                                // goPage={this.goPage.bind(this)} // 翻页
                                // goLink={this.goLink.bind(this)}
                                actionAuth={[]}
                                pageAuth={true}
                                data={lower_resources_data}
                                outStyle={{ 'marginTop': '20px' }}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default HostInfo;