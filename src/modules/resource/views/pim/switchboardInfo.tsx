
import * as React from 'react';
import * as _ from 'lodash';
import { Breadcrumb, Icon, Tabs } from 'antd';
import styles from '../../style/index.less'

const TabPane = Tabs.TabPane;
class SwitchboardInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    onChange() {

    }
    render() {
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>交换机详情</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                        <Breadcrumb.Item>交换机管理</Breadcrumb.Item>
                        <Breadcrumb.Item>交换机详情</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs onChange={this.onChange.bind(this)} type="card">
                        <TabPane tab="资源详情" key="1">
                            <Tabs defaultActiveKey="1" size="small">
                                <TabPane tab="概况" key="1">概况</TabPane>
                                <TabPane tab="日志" key="2">日志</TabPane>
                            </Tabs>
                        </TabPane>
                        <TabPane tab="资源关系" key="2">
                            <Tabs defaultActiveKey="1" size="small">
                                <TabPane tab="主板信息" key="1">主板信息</TabPane>
                                <TabPane tab="端口信息" key="2">端口信息</TabPane>
                                <TabPane tab="电源信息" key="3">电源信息</TabPane>
                                <TabPane tab="风扇信息" key="4">风扇信息</TabPane>
                                <TabPane tab="性能信息" key="5">性能信息</TabPane>
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