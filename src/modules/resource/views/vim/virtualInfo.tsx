import * as React from 'react';
import * as _ from 'lodash';
import { Breadcrumb, Icon, Tabs } from 'antd';
import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import styles from '../../style/index.less'
const TabPane = Tabs.TabPane;

const attributes = [
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'NAME',
        'isobjectid': 0,
        'physicalTablefield': 'NAME',
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
        'attributeName': 'biaoshi',
        'isobjectid': 0,
        'physicalTablefield': 'biaoshi',
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
        'attributeName': 'status',
        'isobjectid': 0,
        'physicalTablefield': 'status',
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
        'attributeName': 'yu',
        'isobjectid': 0,
        'physicalTablefield': 'yu',
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
        'attributeName': 'host',
        'isobjectid': 0,
        'physicalTablefield': 'host',
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
        'attributeName': 'NAME2',
        'isobjectid': 0,
        'physicalTablefield': 'NAME2',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '规格信息'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'biaoshi2',
        'isobjectid': 0,
        'physicalTablefield': 'biaoshi2',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '规格信息'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'neicun',
        'isobjectid': 0,
        'physicalTablefield': 'neicun',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '规格信息'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'VCPUs',
        'isobjectid': 0,
        'physicalTablefield': 'VCPUs',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '规格信息'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'vCPUm',
        'isobjectid': 0,
        'physicalTablefield': 'vCPUm',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '规格信息'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'cipan',
        'isobjectid': 0,
        'physicalTablefield': 'cipan',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '规格信息'
    },

    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'dkbiaoshi',
        'isobjectid': 0,
        'physicalTablefield': 'dkbiaoshi',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '网络接口'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'VIFModel',
        'isobjectid': 0,
        'physicalTablefield': 'VIFModel',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '网络接口'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'MACd',
        'isobjectid': 0,
        'physicalTablefield': 'MACd',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '网络接口'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'netw',
        'isobjectid': 0,
        'physicalTablefield': 'netw',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '网络接口'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'MTU',
        'isobjectid': 0,
        'physicalTablefield': 'MTU',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '网络接口'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'VPA',
        'isobjectid': 0,
        'physicalTablefield': 'VPA',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '网络接口'
    },

    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'IPName',
        'isobjectid': 0,
        'physicalTablefield': 'IPName',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': 'IP地址'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'IPA',
        'isobjectid': 0,
        'physicalTablefield': 'IPA',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': 'IP地址'
    },

    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'anquan',
        'isobjectid': 0,
        'physicalTablefield': 'anquan',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '安全组'
    },

    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'myName',
        'isobjectid': 0,
        'physicalTablefield': 'myName',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '元数据'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'yxbiaoshi',
        'isobjectid': 0,
        'physicalTablefield': 'yxbiaoshi',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '元数据'
    },
    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'yxName',
        'isobjectid': 0,
        'physicalTablefield': 'yxName',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '元数据'
    },

    {
        'moAttributeId': 56,
        'moTypeId': 1,
        'attributeType': 1,
        'attributeName': 'link',
        'isobjectid': 0,
        'physicalTablefield': 'link',
        'state': 1,
        'version': '1.0',
        'ediable': 0,
        'visible': 1,
        'attributeGroup': '已连接卷'
    },
];

const data = {
    'headers': [
        '名称',
        '标识',
        '状态',
        '可用域',
        '主机',

        '名称',
        '标识',
        '内存',
        'VCPUs（min/cur/max)',
        'vCPU数量',
        '磁盘',

        '端口标识',
        'VIF Model',
        'MAC 地址',
        '网络',
        'MTU',
        'Virture PIC address',

        '名称',
        '地址',

        '安全组',

        '秘钥对名称',
        '映像标识',
        '映像名称',
        '链接到',

    ],
    'columns': [
        'NAME',
        'biaoshi',
        'status',
        'yu',
        'host',

        'NAME2',
        'biaoshi2',
        'neicun',
        'VCPUs',
        'vCPUm',
        'cipan',

        'dkbiaoshi',
        'VIFModel',
        'MACd',
        'netw',
        'MTU',
        'VPA',

        'IPName',
        'IPA',

        'anquan',

        'myName',
        'yxbiaoshi',
        'yxName',
        'link',
    ],
    'values': [
        [
            'BBBB-TEst',
            '2102310YJA10H6003708',
            'Huawei',
            'RH2288H V3',
            'BC11HGSA',

            '137Watts',
            'ZJHZ-NFV3-B-XSCYY1H2F-D1',
            '4GB',
            '2/2/2',
            '2',
            '40GB',

            'BC11HGSA',
            'viritiio',
            'XSCYY1H2F：D1',
            'ZJHZ-NFV3-B-XSCYY1H2F',
            '1500',
            'ZJHZ：NFV3：XSCYY1H2F：D1',

            '192.168.0.1',
            '192.168.0.2',

            '不可用',

            'BC11HGSA',
            'viritiio',
            'ZJHZ-NFV3-B-XSCYY1H2F-D1',
            'ZJHZ：NFV3：XSCYY1H2F：D1'
        ],
    ]
};
class VirtualInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    onChange() {

    }
    handleEditData(d) {
        // console.log(d, '=============>hostInfo')
        let moTypeKey = 'vm'
        let match = this.props.match
        let moInstId = match.params.id
        // let moInstId = 
        this.props.actions.editObjData(moTypeKey, moInstId, d, (err, qdata) => {
            if (err || qdata.code !== 1) {

            }
            if (qdata.code === 1) {
                this.props.actions.getObjData(moTypeKey, moInstId)
            }
        })
    }
    componentWillMount() {
        let moTypeKey = 'vm'
        let match = this.props.match
        let id = match.params.id
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey, id)
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
        let { nodeInfo } = this.props
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>虚拟机详情</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item>虚拟机管理</Breadcrumb.Item>
                            <Breadcrumb.Item>虚拟机详情</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs onChange={this.onChange.bind(this)} animated={false} type="card">
                        <TabPane tab="资源详情" key="1">
                            <Tabs defaultActiveKey="1" animated={false} size="small">
                                <TabPane tab="资源概况" key="1">
                                    {this.renderDynamicPropertiesCollapse()}
                                </TabPane>
                                <TabPane tab="日志" key="2">日志</TabPane>
                            </Tabs>
                        </TabPane>

                    </Tabs>
                </div>

            </div>
        );
    }
}
export default VirtualInfo;