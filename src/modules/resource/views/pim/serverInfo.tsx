
import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Switch, Route, Redirect, matchPath } from 'react-router-dom'
import { Breadcrumb, Icon, Button, Spin, Cascader, Tabs, Row, Col, Modal } from 'antd';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
import DynamicPropertiesPanel from '../../../../components/DynamicPropertiesPanel';
import CompactTable from '../../../../components/CompactTable/'
import Headline from '../../../../components/Headline';
import Summaries from '../../../../components/Summaries'

import LogShine from '../../../../components/LogShine/'

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
            'Used'
        ],
    ]
};

class ServerInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const log = []
        for (let i = 0; i < 30; i++) {
            let item = {
                id: i,
                generated_at: '2018-02-27 15:40:00',
                hostname: 'quent.in',
                program: 'codedeploy-agent.log',
                message: 'INFO codedeploy-agent.log'
            }
            log.push(item)
        }
        this.state = {
            status: 'up',
            reset: false,
            events: log
        }
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
    callback = () => { }
    tabInfo = () => { }
    tabConnect = () => { }
    goPage = () => {
        this.props.history.push(`/resource/vim/1/server/info`)
    }
    goLink(url) {
        this.props.history.push(url)
    }
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
    renderOther() {
        let self = this;
        return (
            <div>
                <Headline title="PCIe槽内信息" />
                <CompactTable
                    // goPage={this.goPage.bind(this)} // 翻页
                    // goLink={this.goLink.bind(this)}
                    // data={null}
                    actionAuth={['delete']}
                    pageAuth={false}
                />

                <div style={{ marginTop: '20px' }}>
                    <Headline title="阵列卡信息" />
                    <Summaries colNum={5} />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Headline title="逻辑盘信息" />
                    <CompactTable
                        // goPage={this.goPage.bind(this)} // 翻页
                        // goLink={this.goLink.bind(this)}
                        // data={null}
                        actionAuth={['delete']}
                        pageAuth={false}
                    />
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Headline title="其他信息" />
                    <Summaries colNum={5} />
                </div>
            </div>
        )
    }
    componentDidMount() {
        let { events } = this.state
        let item = {
            id: 0,
            generated_at: '2018-02-27 15:40:00',
            hostname: 'ERROR',
            program: 'codedeploy-agent.log',
            message: 'INFO codedeploy-agent.log INFO codedeploy-agent.log INFO codedeploy-agent.log INFO codedeploy-agent.logINFO codedeploy-agent.log INFO codedeploy-agent.log'
        }
        setTimeout(() => {
            this.setState({
                events: [...events, item, item, item, item, item]
            })
        }, 4000)
    }

    render() {
        let { match } = this.props;
        let { events } = this.state

        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>磁阵详情</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>物理部署组织</Breadcrumb.Item>
                        <Breadcrumb.Item>服务器管理</Breadcrumb.Item>
                        <Breadcrumb.Item>服务器详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px 20px 0 20px' }}>
                    <Tabs onChange={this.callback} type="card" animated={false}>
                        <TabPane tab="资源详情" key="1" >
                            <Tabs
                                defaultActiveKey="1"
                                size="small"
                                animated={false}
                                onChange={this.tabInfo}
                                tabBarExtraContent={this.renderBtns()}>
                                <TabPane tab="概况" key="1">
                                    <DynamicPropertiesPanel attributes={attributes} data={data} />
                                </TabPane>
                                <TabPane tab="日志" key="2">
                                    <LogShine events={events} />
                                </TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab="资源关系" key="2">
                            <Tabs
                                defaultActiveKey="1"
                                size="small"
                                animated={false}
                                onChange={this.tabConnect}>
                                <TabPane tab="处理器信息" key="1" style={{ padding: '20px 0' }}>
                                    <CompactTable
                                        // goPage={this.goPage.bind(this)} // 翻页
                                        // goLink={this.goLink.bind(this)}
                                        // data={null}
                                        actionAuth={['delete']}
                                        pageAuth={false}
                                    />
                                </TabPane>
                                <TabPane tab="内存信息" key="2" style={{ padding: '20px 0' }}>
                                    <CompactTable
                                        // goPage={this.goPage.bind(this)} // 翻页
                                        // goLink={this.goLink.bind(this)}
                                        // data={null}
                                        actionAuth={['delete']}
                                        pageAuth={false}
                                    />
                                </TabPane>
                                <TabPane tab="网卡信息" key="3" style={{ padding: '20px 0' }}>
                                    <CompactTable
                                        // goPage={this.goPage.bind(this)} // 翻页
                                        // goLink={this.goLink.bind(this)}
                                        // data={null}
                                        actionAuth={['delete']}
                                        pageAuth={false}
                                    />
                                </TabPane>
                                <TabPane tab="硬盘信息" key="4" style={{ padding: '20px 0' }}>
                                    <CompactTable
                                        // goPage={this.goPage.bind(this)} // 翻页
                                        // goLink={this.goLink.bind(this)}
                                        // data={null}
                                        actionAuth={['delete']}
                                        pageAuth={false}
                                    />
                                </TabPane>
                                <TabPane tab="风扇信息" key="5" style={{ padding: '20px 0' }}>
                                    <CompactTable
                                        // goPage={this.goPage.bind(this)} // 翻页
                                        // goLink={this.goLink.bind(this)}
                                        // data={null}
                                        actionAuth={['delete']}
                                        pageAuth={false}
                                    />
                                </TabPane>
                                <TabPane tab="电源信息" key="6" style={{ padding: '20px 0' }}>
                                    <CompactTable
                                        // goPage={this.goPage.bind(this)} // 翻页
                                        // goLink={this.goLink.bind(this)}
                                        // data={null}
                                        actionAuth={['delete']}
                                        pageAuth={false}
                                    />
                                </TabPane>
                                <TabPane tab="其它信息" key="7" style={{ padding: '20px 0' }}>
                                    {this.renderOther()}
                                </TabPane>
                            </Tabs>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default ServerInfo;