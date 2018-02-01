import * as React from 'react';
import * as _ from 'lodash';

import { Row, Breadcrumb } from 'antd';
import DynamicPropertiesPanel from '../../../components/DynamicPropertiesPanel'
import SplitPane from 'react-split-pane'
import styles from '../../../style/index.less'
import Log from '../../setting/container/log';
import User from '../../setting/container/user';

declare let global: any;

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

class Home extends React.Component<any, any> {
    handle() {
        global.hashHistory.push('/alarm')
    }

    render() {
        return (
            <Row className={styles.performance}>
                <div className={styles.main}>
                    <DynamicPropertiesPanel attributes={attributes} data={data}/>
                </div>
            </Row>
        );
    }
}

export default Home;