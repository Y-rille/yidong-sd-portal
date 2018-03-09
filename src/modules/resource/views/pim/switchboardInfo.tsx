
import * as React from 'react';
import * as _ from 'lodash';
import { Breadcrumb, Icon, Tabs, Spin } from 'antd';
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
import Headline from '../../../../components/Headline/'
import Summaries from '../../../../components/Summaries/'
import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import qs from 'querystringify'
import { stringify } from 'querystringify'

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
        let { match } = this.props
        let { pageNo } = qs.parse(this.props.location.search)
        this.state = {
            disabled: false,
            reset: false,
            tableLoading: false,
            pageNo: pageNo ? pageNo : 1,
            pageSize: 10,
            activeKey: 'imdsSwitchMotherboard',
            switch_id: match.params.id
        }
    }
    goLink() {

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
    onChange(key) {
        if (key === 'relation') {
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
        if (key === 'imdsSwitchPort15MiKpis') {
            this.setState({
                disabled: true,
                activeKey: key
            }, () => {
                this.goPage(1)
            })
        } else {
            this.setState({
                disabled: false,
                activeKey: key
            }, () => {
                this.goPage(1)
            })
        }
    }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { pageSize, activeKey, switch_id } = this.state
        this.props.actions.queryList(activeKey, { pageNo, pageSize, switch_id }, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    renderTab() {
        let title = ['主板信息', '端口信息', '电源信息', '风扇信息', '性能信息']
        let keys = ['imdsSwitchMotherboard', 'imdsSwitchPort', 'imdsSwitchPower', 'imdsSwitchFan', 'imdsSwitchPort15MiKpis']
        let { list, summary } = this.props
        const { pageSize, tableLoading } = this.state;
        if (list) {
            return (
                keys.map((item, key) => {
                    if (item) {
                        return (
                            <TabPane tab={title[key]} key={item}>
                                {this.state.disabled ? (<div>
                                    <Headline title="系统信息" />
                                    {summary ? <Summaries
                                        data={summary}
                                        colNum={2} /> : ''}
                                    <Headline
                                        title="接口信息（按端口统计）"
                                    />
                                </div>) : ''}
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
        let moTypeKey = 'switch';
        let switch_id = this.props.match.params.id
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey)
        this.props.actions.getSummary('imdsSwitch15MiKpis', { switch: switch_id });
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

                        <TabPane tab="资源关系" key="relation">
                            <Tabs size="small" onChange={this.onTab.bind(this)} animated={false}>
                                {this.renderTab()}
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