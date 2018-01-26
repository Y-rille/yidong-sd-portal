import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route } from 'react-router-dom'

import { Row, Col } from 'antd';

declare let global: any;

import Current from '../container/current'
import History from '../container/history'

class Home extends React.Component<any, any> {
    tabClick(e) {
        let path = e.target.getAttribute('data-path')
        global.hashHistory.push(`/performance/${path}`)
    }
    render() {
        return (
            <Row>
                <Col span={6}>
                    菜单树
                </Col>
                <Col span={18} style={{ padding: '16px', height: '500px', borderLeft: '1px solid #666' }}>
                    <div>性能监控  /   二级菜单  /   三级菜单   / 四级菜单</div>
                    <div>大标题</div>
                    <div>
                        <span onClick={this.tabClick.bind(this)} data-path="">当前状态</span>|
                        <span onClick={this.tabClick.bind(this)} data-path="history">历史趋势</span>
                    </div>
                    <Switch>
                        <Route path="/performance" exact component={Current} />
                        <Route path="/performance/history" component={History} />
                    </Switch>
                </Col>
            </Row>
        );
    }
}

export default Home;