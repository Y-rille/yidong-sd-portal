import * as React from 'react';
import * as _ from 'lodash';
import { Row, Col, Breadcrumb, Icon, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

import styles from '../../style/index.less'
class HostInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    onChange() {

    }
    render() {
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>主机管理</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                        <Breadcrumb.Item>主机管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs onChange={this.onChange.bind(this)} type="card">
                        <TabPane tab="资源详情" key="1">
                            <Tabs onChange={this.onChange.bind(this)}>
                                <TabPane tab="概况" key="11">概况</TabPane>
                                {/* <TabPane tab="日志" key="12">日志</TabPane> */}
                            </Tabs>
                        </TabPane>
                        <TabPane tab="资源关系" key="2">
                            <Tabs onChange={this.onChange.bind(this)}>
                                <TabPane tab="处理器信息" key="21">处理器信息</TabPane>
                                <TabPane tab="内存信息" key="22">内存信息</TabPane>
                                <TabPane tab="端口信息" key="23">端口信息</TabPane>
                                <TabPane tab="LLDP信息" key="23">LLDP信息</TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab="下级资源" key="3">
                            <Tabs onChange={this.onChange.bind(this)}>
                                <TabPane tab="概况" key="31">概况</TabPane>
                            </Tabs>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default HostInfo;