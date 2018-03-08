
import * as React from 'react';
import * as _ from 'lodash';
import { Breadcrumb, Icon, Tabs } from 'antd';
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
import Headline from '../../../../components/Headline/'
import Summaries from '../../../../components/Summaries/'
import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'

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
class SwitchboardInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    onChange() {

    }
    goPage() {

    }
    goLink() {

    }

    renderBoardTable() {
        let board_data = {
            'count': 17,
            'header': [{
                key: 'id',
                title: '主板编号',
                // fixed: true,
                // link: true,
            }, {
                key: 'name',
                title: '序列号',
                // fixed: true,
            }, {
                key: 'mobile',
                title: '软件版本',
            }, {
                key: 'vm',
                title: '内存'
            },
            {
                key: 'email',
                title: '闪存',
            }],
            'body': [
                {
                    'id': 1,
                    'name': '2c55-:d357-612de-32',
                    'mobile': 'CMWDERF VER B',
                    'vm': '2048Mbytes',
                    'email': '2048Mbytes',
                },
                {
                    'id': 2,
                    'name': '2c55-:d357-612de-32',
                    'mobile': 'CMWDERF VER B',
                    'vm': '2048Mbytes',
                    'email': '2048Mbytes',
                }
            ]
        }
        return (
            <CompactTable
                outStyle={{ marginTop: '20px' }}
                goPage={this.goPage.bind(this)} // 翻页
                goLink={this.goLink.bind(this)}
                data={board_data}
                pageAuth={true}
                actionAuth={[]}
            />
        )
    }

    renderPortTable() {
        let port_data = {
            'count': 17,
            'header': [{
                key: 'id',
                title: '名称',
                // fixed: true,
                // link: true,
            }, {
                key: 'name',
                title: '描述',
                // fixed: true,
            }, {
                key: 'mobile',
                title: '类型',
            }, {
                key: 'vm',
                title: '速率'
            },
            {
                key: 'email',
                title: '物理状态',
            },
            {
                key: 'luoji',
                title: '逻辑状态',
            },
            {
                key: 'mac',
                title: '绑定MAC地址',
            },
            {
                key: 'portmac',
                title: '端口实际连接MAC地址'
            },
            {
                key: 'portIp',
                title: '端口所连设备IP地址',
            },
            {
                key: 'vlan',
                title: 'VLAN信息',
            },
            {
                key: 'port',
                title: '对端端口唯一标识'
            }],
            'body': [
                {
                    'id': 'c119699c',
                    'name': 'c119699c',
                    'mobile': '标准物理接口',
                    'vm': 0,
                    'email': 'up',
                    'luoji': 'up',
                    'mac': '2c:55:d3:576:12:de:32',
                    'portmac': '2c:55:d3:576:12:de:32',
                    'portIp': '188.103.13.21',
                    'vlan': 0,
                    'port': '2c:55:d3:576:12:de:32'
                },
                {
                    'id': '-39cb-400d',
                    'name': 'c119699c',
                    'mobile': '标准物理接口',
                    'vm': 0,
                    'email': 'up',
                    'luoji': 'up',
                    'mac': '2c:55:d3:576:12:de:32',
                    'portmac': '2c:55:d3:576:12:de:32',
                    'portIp': '188.103.13.21',
                    'vlan': 0,
                    'port': '2c:55:d3:576:12:de:32'
                }
            ]
        }
        return (
            <CompactTable
                outStyle={{ marginTop: '20px' }}
                goPage={this.goPage.bind(this)} // 翻页
                goLink={this.goLink.bind(this)}
                data={port_data}
                pageAuth={true}
                actionAuth={[]}
            />
        )
    }

    renderPowerTable() {
        let power_data = {
            'count': 17,
            'header': [{
                key: 'id',
                title: '编号',
                // fixed: true,
                // link: true,
            }, {
                key: 'name',
                title: '电源状态',
                // fixed: true,
            }],
            'body': [
                {
                    'id': 1,
                    'name': '电源正在供电',

                },
                {
                    'id': 2,
                    'name': '电源正在供电',
                }
            ]
        }
        return (
            <CompactTable
                outStyle={{ marginTop: '20px' }}
                goPage={this.goPage.bind(this)} // 翻页
                goLink={this.goLink.bind(this)}
                data={power_data}
                pageAuth={true}
                actionAuth={[]}
            />
        )
    }

    renderFanTable() {
        let fan_data = {
            'count': 17,
            'header': [{
                key: 'id',
                title: '编号',
                // fixed: true,
                // link: true,
            }, {
                key: 'name',
                title: '转速（%）',
                // fixed: true,
            }, {
                key: 'mobile',
                title: '风扇状态',
            }],
            'body': [
                {
                    'id': 'c119699c',
                    'name': 40,
                    'mobile': '正常',
                },
                {
                    'id': '-39cb-400d',
                    'name': 40,
                    'mobile': '正常',
                }
            ]
        }
        return (
            <CompactTable
                outStyle={{ marginTop: '20px' }}
                goPage={this.goPage.bind(this)} // 翻页
                goLink={this.goLink.bind(this)}
                data={fan_data}
                pageAuth={true}
                actionAuth={[]}
            />
        )
    }

    renderPerformanceTable() {
        let performance_data = {
            'count': 17,
            'header': [{
                key: 'id',
                title: '主板名称',
                // fixed: true,
                // link: true,
            }, {
                key: 'name',
                title: '端口名称',
                // fixed: true,
            }, {
                key: 'mobile',
                title: '出字节数',
            }, {
                key: 'vm',
                title: '入字节数'
            },
            {
                key: 'email',
                title: '出错包数',
            },
            {
                key: 'luoji',
                title: '入错包数',
            },
            {
                key: 'mac',
                title: '错包率',
            },
            {
                key: 'portmac',
                title: '出丢包数'
            },
            {
                key: 'portIp',
                title: '入丢包数',
            },
            {
                key: 'vlan',
                title: '丢包率',
            },
            {
                key: 'port',
                title: '出单播包数'
            },
            {
                key: 'rudan',
                title: '入单播包数'
            },
            {
                key: 'chuzu',
                title: '出组播包数'
            },
            {
                key: 'ruzu',
                title: '入组播包数'
            },
            {
                key: 'chuguang',
                title: '出广播包数'
            },
            {
                key: 'ruguang',
                title: '入广播包数'
            },
            {
                key: 'chusu',
                title: '出速率'
            },
            {
                key: 'rusu',
                title: '入速率'
            },
            {
                key: 'chudai',
                title: '出宽带'
            },
            {
                key: 'rudai',
                title: '入宽带'
            }],
            'body': [
                {
                    'id': 1,
                    'name': 'NULL0',
                    'mobile': 0,
                    'vm': 0,
                    'email': 0,
                    'luoji': 0,
                    'mac': 0,
                    'portmac': 0,
                    'portIp': 0,
                    'vlan': 0,
                    'port': 0,
                    'rudan': 0,
                    'chuzu': 0,
                    'ruzu': 0,
                    'chuguang': 0,
                    'ruguang': 0,
                    'chusu': 0,
                    'rusu': 0,
                    'chudai': 0,
                    'rudai': 0
                },
                {
                    'id': 2,
                    'name': 'NULL0',
                    'mobile': 1000,
                    'vm': 1000,
                    'email': 1000,
                    'luoji': 1000,
                    'mac': 1000,
                    'portmac': 1000,
                    'portIp': 1000,
                    'vlan': 1000,
                    'port': 1000,
                    'rudan': 1000,
                    'chuzu': 1000,
                    'ruzu': 1000,
                    'chuguang': 1000,
                    'ruguang': 1000,
                    'chusu': 1000,
                    'rusu': 1000,
                    'chudai': 1000,
                    'rudai': 1000
                }
            ]
        }
        return (
            <div>
                <Headline title="系统信息" />
                <Summaries
                    data={[
                        {
                            attr: 'CPU利用率',
                            value: '78%'
                        }, {
                            attr: 'CPU利用率峰值',
                            value: '80%'
                        }, {
                            attr: '内存利用率',
                            value: '78%'
                        }, {
                            attr: '缓存利用率',
                            value: '80%'
                        }
                    ]}
                    colNum={2} />
                <Headline
                    title="接口信息（按端口统计）"
                />
                <CompactTable
                    goPage={this.goPage.bind(this)} // 翻页
                    goLink={this.goLink.bind(this)}
                    data={performance_data}
                    pageAuth={true}
                    actionAuth={[]}
                />
            </div>

        )
    }
    handleEditData(d) {
        // console.log(d, '=============>hostInfo')
        let moTypeKey = 'switch'
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
        let moTypeKey = 'switch'
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey)
    }
    renderDynamicPropertiesCollapse() {
        if (this.props.objAttributes && this.props.objData) {
            return (
                <DynamicPropertiesCollapse attributes={this.props.objAttributes} data={this.props.objData} editData={this.handleEditData.bind(this)} />
            )
        }
    }
    render() {
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
                        <TabPane tab="资源详情" key="1">
                            <Tabs defaultActiveKey="1" animated={false} size="small">
                                <TabPane tab="概况" key="1">
                                    {this.renderDynamicPropertiesCollapse()}
                                </TabPane>
                                <TabPane tab="日志" key="2">日志</TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab="资源关系" key="2">
                            <Tabs defaultActiveKey="1" animated={false} size="small">
                                <TabPane tab="主板信息" key="1">
                                    {this.renderBoardTable()}
                                </TabPane>
                                <TabPane tab="端口信息" key="2">
                                    {this.renderPortTable()}
                                </TabPane>
                                <TabPane tab="电源信息" key="3">
                                    {this.renderPowerTable()}
                                </TabPane>
                                <TabPane tab="风扇信息" key="4">
                                    {this.renderFanTable()}
                                </TabPane>
                                <TabPane tab="性能信息" key="5">
                                    {this.renderPerformanceTable()}
                                </TabPane>
                                <TabPane tab="告警信息" key="6">告警信息</TabPane>
                            </Tabs>
                        </TabPane>
                    </Tabs>
                </div>

            </div>
        );
    }
}
export default SwitchboardInfo;