import * as React from 'react';
import * as _ from 'lodash';
import DynamicPropertiesPanel from '../../../../components/DynamicPropertiesPanel'
import { Breadcrumb, Icon, Button, Spin, Cascader, Tabs, Row, Col } from 'antd';
import styles from '../../style/index.less'
const TabPane = Tabs.TabPane;
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
        'ediable': 0,
        'visible': 0,
        'attributeGroup': '基本属性'
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
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '基本属性'
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
        'visible': 0,
        'attributeGroup': '基本属性'
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
        'visible': 0,
        'attributeGroup': '基本属性'
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
        'attributeGroup': '基本属性'
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
        'attributeGroup': '基本属性'
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
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '其他属性'
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
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '其他属性'
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
        'attributeGroup': '其他属性'
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
        'attributeGroup': '其他'
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
        '磁阵资产状态'
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
        'PropertyState'
    ],
    'values': [
        [
            7,
            'ZJHZ-NFV3-C-SQ5-3F-C03-hwDA5600-STOR01',
            '',
            '',
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
            'Used'
        ],
    ]
};

class MageneticInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    callback = () => { }
    tabInfo = () => { }
    tabConnect = () => { }
    renderTitle = (title) => {
        return (
            <div className={styles.nodeTitle}>
                <span className={styles.nodeTitle1}></span>
                <span className={styles.nodeTitle2}>{title}</span>
            </div>
        )
    }
    renderPerformance() {
        return (
            <div>
                {this.renderTitle('节点信息')}
                <div className={styles.nodeInfo}>
                    <Row className={styles.nodeRow}>
                        <Col span={6}>平均IO时延:&nbsp;&nbsp;0.367</Col>
                        <Col span={6}>总带宽(Mbps):&nbsp;&nbsp;3.798</Col>
                        <Col span={6}>读带宽(Mbps):&nbsp;&nbsp;3.798</Col>
                        <Col span={6}>写带宽(Mbps):&nbsp;&nbsp;3.798</Col>
                    </Row>
                    <Row className={styles.nodeRow}>
                        <Col span={6}></Col>
                        <Col span={6}>总次数(IOps):&nbsp;&nbsp;153</Col>
                        <Col span={6}>读次数(IOps):&nbsp;&nbsp;153</Col>
                        <Col span={6}>写次数(IOps):&nbsp;&nbsp;153</Col>
                    </Row>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>磁阵详情</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                        <Breadcrumb.Item>磁阵列表</Breadcrumb.Item>
                        <Breadcrumb.Item>磁阵详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs onChange={this.callback} type="card">
                        <TabPane tab="资源详情" key="1">
                            <Tabs defaultActiveKey="1" size="small" onChange={this.tabInfo}>
                                <TabPane tab="概况" key="1">概况</TabPane>
                                <TabPane tab="日志" key="2">日志</TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab="资源关系" key="2">
                            <Tabs defaultActiveKey="1" size="small" onChange={this.tabConnect}>
                                <TabPane tab="RAID信息" key="1">RAID信息</TabPane>
                                <TabPane tab="LUN信息" key="2">LUN信息</TabPane>
                                <TabPane tab="ISCSI信息" key="3">ISCSI信息</TabPane>
                                <TabPane tab="硬盘信息" key="4">硬盘信息</TabPane>
                                <TabPane tab="性能信息" key="5">{this.renderPerformance()}</TabPane>
                                <TabPane tab="告警" key="6">告警</TabPane>
                                <TabPane tab="其它信息" key="7">其它信息</TabPane>
                            </Tabs>
                        </TabPane>
                    </Tabs>
                </div>
                <DynamicPropertiesPanel attributes={attributes} data={data} />
            </div>
        )
    }
}
export default MageneticInfo;