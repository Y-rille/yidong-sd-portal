import * as React from 'react';
import * as _ from 'lodash';
import Headline from '../../../../components/Headline';
import Summaries from '../../../../components/Summaries'
import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import { Breadcrumb, Icon, Button, Spin, Cascader, Tabs, Row, Col, Modal } from 'antd';
import styles from '../../style/index.less';
import CompactTable from '../../../../components/CompactTable/'
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
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
        'ediable': 0,
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
        'ediable': 0,
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

class MageneticInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: 'up',
            reset: false
        }
    }
    callback = () => { }
    tabInfo = () => { }
    tabConnect = () => { }
    confirmRest = () => {
        let self = this
        let content = '服务器正在运行，确定复位吗？'
        confirm({
            title: content,
            content: '',
            okText: '确认',
            cancelText: '取消',
            iconType: 'exclamation-circle',
            onOk() {
                self.setState({
                    reset: true
                })
            },
            onCancel() {
                // self.setState({
                //     reset: false
                // })
            }
        })
    }
    confirmUpOrDown = (e) => {
        // let title = '上电'
        let content = '服务器正在运行，确定上电吗？'
        if (this.state.status === 'down') {
            // title = '上电'
            content = '服务器正在运行，确定上电吗？'
        } else if (this.state.status === 'up') {
            // title = '下电'
            content = '服务器正在运行，确定下电吗？'
        }
        let self = this
        confirm({
            title: content,
            content: '',
            okText: '确认',
            cancelText: '取消',
            iconType: 'exclamation-circle',
            onOk() {
                self.setState({
                    status: self.state.status === 'down' ? 'up' : 'down'
                })
            },
            onCancel() {
            }
        })

    }
    goPage = () => {
        // this.props.history.push(`/resource/vim/1/host/info`)
    }
    goLink(url) {
        // let { match } = this.props
        // this.props.history.push(`${match}/info/1`)
    }
    renderPerformance() {
        let self = this;
        return (
            <div>
                <Headline title="节点信息" />
                {/* <div className={styles.nodeInfo}>
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
                </div> */}
                <Summaries colNum={5} />
                <div style={{ marginTop: '20px' }}>
                    <Headline title="LUN性能信息" />
                    <CompactTable
                        // goPage={self.goPage.bind(self)} // 翻页
                        // goLink={self.goLink.bind(self)}
                        // data={null}
                        actionAuth={['delete']}
                        pageAuth={false}
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Headline title="前端业务端口信息" />
                    <CompactTable
                        // goPage={self.goPage.bind(self)} // 翻页
                        // goLink={self.goLink.bind(self)}
                        // data={null}
                        actionAuth={['delete']}
                        pageAuth={false}
                    />
                </div>
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Headline title="磁盘框温度" />
                    <CompactTable
                        // goPage={self.goPage.bind(self)} // 翻页
                        // goLink={self.goLink.bind(self)}
                        // data={null}
                        actionAuth={['delete']}
                        pageAuth={false}
                    />
                </div>
            </div>
        )
    }
    renderBtns() {
        return (
            <div className={styles.btn}>
                <Button
                    type="primary" ghost
                    icon="dingding"
                    style={{ margin: '0px 10px 0px 0' }}
                    onClick={this.confirmUpOrDown}
                >{this.state.status === 'down' ? '上电' : '下电'}</Button>
                <Button type="primary" ghost icon="retweet" onClick={this.confirmRest.bind(this, 'reset')}>复位</Button>
            </div>
        )
    }
    renderRAID() {
        return (
            <CompactTable
                // goPage={this.goPage.bind(this)} // 翻页
                // goLink={this.goLink.bind(this)}
                // data={null}
                actionAuth={['delete']}
                pageAuth={false}
            />
        )
    }
    renderLUN() {
        return (
            <CompactTable
                // goPage={this.goPage.bind(this)} // 翻页
                // goLink={this.goLink.bind(this)}
                // data={null}
                actionAuth={['delete']}
                pageAuth={false}
            />
        )
    }
    renderISCSI() {
        return (
            <CompactTable
                // goPage={this.goPage.bind(this)} // 翻页
                // goLink={this.goLink.bind(this)}
                // data={null}
                actionAuth={['delete']}
                pageAuth={false}
            />
        )
    }
    renderHardware() {
        return (
            <CompactTable
                // goPage={this.goPage.bind(this)} // 翻页
                // goLink={this.goLink.bind(this)}
                // data={null}
                actionAuth={['delete']}
                pageAuth={false}
            />
        )
    }
    renderOthers() {
        return (
            <div>
                <Headline title="BBU信息" />
                <CompactTable
                    // goPage={this.goPage.bind(this)} // 翻页
                    // goLink={this.goLink.bind(this)}
                    // data={null}
                    actionAuth={['delete']}
                    pageAuth={false}
                />
                <Headline title="风扇信息" />
                <CompactTable
                    // goPage={this.goPage.bind(this)} // 翻页
                    // goLink={this.goLink.bind(this)}
                    // data={null}
                    actionAuth={['delete']}
                    pageAuth={false}
                />
                <Headline title="电源信息" />
                <CompactTable
                    // goPage={this.goPage.bind(this)} // 翻页
                    // goLink={this.goLink.bind(this)}
                    // data={null}
                    actionAuth={['delete']}
                    pageAuth={false}
                />
                <Headline title="控制器信息" />
                <CompactTable
                    // goPage={this.goPage.bind(this)} // 翻页
                    // goLink={this.goLink.bind(this)}
                    // data={null}
                    actionAuth={['delete']}
                    pageAuth={false}
                />
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
                        <Breadcrumb.Item>磁阵管理</Breadcrumb.Item>
                        <Breadcrumb.Item>磁阵详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={styles.tabCont}>
                    <Tabs onChange={this.callback} type="card" animated={false}>
                        <TabPane tab="资源详情" key="1" >
                            <Tabs
                                defaultActiveKey="1"
                                size="small"
                                onChange={this.tabInfo}
                                tabBarExtraContent={this.renderBtns()}>
                                <TabPane tab="概况" key="1">
                                    <DynamicPropertiesCollapse attributes={attributes} data={data} />
                                </TabPane>
                                <TabPane tab="日志" key="2"></TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab="资源关系" key="2">
                            <Tabs
                                defaultActiveKey="1"
                                size="small"
                                onChange={this.tabConnect}>
                                <TabPane tab="RAID信息" key="1">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderRAID()}
                                    </div>
                                </TabPane>
                                <TabPane tab="LUN信息" key="2">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderLUN()}
                                    </div>
                                </TabPane>
                                <TabPane tab="ISCSI信息" key="3">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderISCSI()}
                                    </div>
                                </TabPane>
                                <TabPane tab="硬盘信息" key="4">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderHardware()}
                                    </div>
                                </TabPane>
                                <TabPane tab="性能信息" key="5">{this.renderPerformance()}</TabPane>
                                <TabPane tab="告警" key="6">告警信息
                                </TabPane>
                                <TabPane tab="其它信息" key="7">
                                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        {this.renderOthers()}
                                    </div>
                                </TabPane>
                            </Tabs>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
export default MageneticInfo;