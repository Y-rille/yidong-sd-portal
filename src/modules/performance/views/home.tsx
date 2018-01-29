import * as React from 'react';
import * as _ from 'lodash';
import * as classNames from 'classnames';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SplitPane from 'react-split-pane'

import { Row, Col, Breadcrumb, Icon, Button } from 'antd';

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
        let path = e.target.getAttribute('data-path')
        this.setState({
            activeKey: path
        })
        global.hashHistory.push(`${match.url}/${path}`)
    }
    renderTab() {
        let { activeKey } = this.state
        let tab = [{ key: 'current', name: '当前状态' }, { key: 'history', name: '历史趋势' }]
        return _.map(tab, (item) => {
            let cls = {
                tabItem: true,
                active: activeKey === item.key ? true : false
            }
            return <li className={classNames(cls)} data-path={item.key} onClick={this.tabClick.bind(this)}>{item.name}</li>
        })
    }
    render() {

        let { match } = this.props
        let { activeKey } = this.state
        return (
            <Row className={styles.performance}>
                <SplitPane split="vertical" minSize={100} maxSize={300} defaultSize={200} >
                    <div>菜单树</div>
                    <div className={styles.main}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>交换机</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item>性能监控</Breadcrumb.Item>
                                <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
                                <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
                                <Breadcrumb.Item>四级菜单</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div className={styles.tabBar}>
                            <ul>
                                {this.renderTab()}
                            </ul>
                            <Button><Icon type="tag-o" />添加指标</Button>
                        </div>
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