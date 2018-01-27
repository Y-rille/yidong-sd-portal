import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SplitPane from 'react-split-pane'

import { Row, Col, Breadcrumb, Tabs, Button } from 'antd';
const TabPane = Tabs.TabPane;

declare let global: any;

import Current from '../container/current'
import History from '../container/history'

import styles from '../style/index.less'

class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pathname } = this.props.location

        this.state = {
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/current` }) != null && 'current',
                matchPath(pathname, { path: `${match.url}/history` }) != null && 'history',
            ]).toString()
        };
    }
    tabClick(e) {
        let { match } = this.props

        this.setState({
            activeKey: e
        })
        global.hashHistory.push(`${match.url}/${e}`)
    }
    isActive(path) {
        let { location } = this.props
        return matchPath(location.pathname, { path }) != null
    }
    render() {

        let { match } = this.props
        let { activeKey } = this.state
        return (
            <Row className={styles.performance}>
                <SplitPane split="vertical" minSize={100} maxSize={300} defaultSize={200} >
                    <div>菜单树</div>
                    <div style={{ padding: '16px', borderLeft: '1px solid #e8e8e8' }}>
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
                            <TabPane tab="当前状态" key="current"></TabPane>
                            <TabPane tab="历史趋势" key="history"></TabPane>
                        </Tabs>
                        <Switch>
                            <Route path={`${match.url}/current`} exact component={Current} />
                            <Route path={`${match.url}/history`} component={History} />
                        </Switch>
                    </div>
                </SplitPane>
            </Row>
        );
    }
}

export default Home;