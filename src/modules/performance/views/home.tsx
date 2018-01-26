import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route } from 'react-router-dom'

import { Row, Col, Breadcrumb, Tabs, Button } from 'antd';
const TabPane = Tabs.TabPane;

declare let global: any;

import Current from '../container/current'
import History from '../container/history'

import styles from '../style/index.less'

class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { pathname } = this.props.location
        this.state = {
            activeKey: pathname.split('/').length >= 2 ? pathname.split('/')[2] : ''
        };
    }
    tabClick(e) {
        this.setState({
            activeKey: e
        })
        global.hashHistory.push(`/performance/${e}`)
    }
    render() {
        let { activeKey } = this.state
        return (
            <Row className={styles.performance}>
                <Col span={4}>
                    菜单树
                </Col>
                <Col span={20} style={{ padding: '16px', borderLeft: '1px solid #e8e8e8' }}>
                    <Breadcrumb>
                        <Breadcrumb.Item>性能监控</Breadcrumb.Item>
                        <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
                        <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
                        <Breadcrumb.Item>四级菜单</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className={styles.title}>交换机</h1>
                    <Tabs
                        onChange={this.tabClick.bind(this)}
                        tabBarExtraContent={<Button>添加指标</Button>}
                        type="card"
                        defaultActiveKey={activeKey}
                    >
                        <TabPane tab="当前状态" key=""></TabPane>
                        <TabPane tab="历史趋势" key="history"></TabPane>
                    </Tabs>
                    <Switch>
                        <Route path="/performance/" exact component={Current} />
                        <Route path="/performance/history" component={History} />
                    </Switch>
                </Col>
            </Row>
        );
    }
}

export default Home;