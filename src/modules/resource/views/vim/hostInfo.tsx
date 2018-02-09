import * as React from 'react';
import * as _ from 'lodash';
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Modal } from 'antd';
const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;

import styles from '../../style/index.less'
class HostInfo extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            status: 'up',
            reset: false
        }
    }
    onChange() {

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
                <div className={styles.tabCont}>
                    <Tabs onChange={this.onChange.bind(this)} type="card">
                        <TabPane tab="资源详情" key="1">
                            <Tabs
                                onChange={this.onChange.bind(this)}
                                size="small"
                                tabBarExtraContent={this.renderBtns()}>
                                <TabPane tab="概况" key="11">概况</TabPane>
                                {/* <TabPane tab="日志" key="12">日志</TabPane> */}
                            </Tabs>
                        </TabPane>
                        <TabPane tab="资源关系" key="2">
                            <Tabs onChange={this.onChange.bind(this)}>
                                <TabPane tab="处理器信息" key="21">处理器信息</TabPane>
                                <TabPane tab="内存信息" key="22">内存信息</TabPane>
                                <TabPane tab="端口信息" key="23">端口信息</TabPane>
                                <TabPane tab="LLDP信息" key="24">LLDP信息</TabPane>
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