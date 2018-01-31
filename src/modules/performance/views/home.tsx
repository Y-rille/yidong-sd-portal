import * as React from 'react';
import * as _ from 'lodash';
import * as classNames from 'classnames';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SplitPane from 'react-split-pane'
import moment from '../../../common/moment'
import { Row, Col, Breadcrumb, Icon, Tabs, Button } from 'antd';
import FactModal from '../../../components/FactModal/'
import TreeSelect from '../../../components/TreeSelect'

declare let global: any;

import Current from '../container/current'
import History from '../container/history'

import { PerformanceActions } from '../actions/index';

import styles from '../style/index.less'

export interface HomeProps {
    actions: PerformanceActions,
    location?
    match?
    moInstKpiThresholds?
}

class Home extends React.Component<HomeProps, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pathname } = this.props.location
        this.state = {
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/current` }) != null && 'current',
                matchPath(pathname, { path: `${match.url}/history` }) != null && 'history',
            ]).toString(),
            visible: false,
            kpis: []
        };
    }
    triggerResize() {
        let e: Event = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
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
    showModal() {
        this.setState({
            visible: true
        })
    }
    handleOk() {
        this.setState({
            visible: false
        })
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    componentWillMount() {
        this.props.actions.getMoInstKpiThresholds(1, 1)
    }
    componentDidMount() {
        this.props.actions.getMoTypeKpis(1, 7, (data) => {
            if (data) {
                this.setState({
                    kpis: data['data']
                })
            }

        })
    }
    componentWillReceiveProps(nextProps) {
        let { match } = nextProps
        let { pathname } = nextProps.location
        this.state = {
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/current` }) != null && 'current',
                matchPath(pathname, { path: `${match.url}/history` }) != null && 'history',
            ]).toString()
        };
    }
    render() {
        // console.log(`15分钟前:${moment().tz('Asia/Shanghai').subtract(15, 'minutes').format()}`)
        // console.log(`开始时间:${moment().tz('Asia/Shanghai').subtract(15, 'minutes').valueOf()}`)
        // console.log(`结束时间:${moment().tz('Asia/Shanghai').valueOf()}`)
        let { match, tree } = this.props
        let { activeKey } = this.state
        // if (!tree) {
        //     return <div>loading</div>
        // }
        return (
            <Row className={styles.performance}>
                <SplitPane
                    split="vertical"
                    minSize={100}
                    maxSize={300}
                    defaultSize={200}
                    onChange={this.triggerResize} >
                    <div className={styles.tree}>
                        <TreeSelect />
                    </div>
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
                            <Button onClick={this.showModal.bind(this)}><Icon type="tag-o" />添加指标</Button>
                        </div>
                        <Switch>
                            <Redirect from={`${match.url}`} to={`${match.url}/current`} exact />
                            <Route path={`${match.url}/current`} component={Current} />
                            <Route path={`${match.url}/history`} component={History} />
                        </Switch>
                    </div>
                </SplitPane>
                <FactModal visible={this.state.visible} handleOk={this.handleOk.bind(this)} handleCancel={this.handleCancel.bind(this)} kpis={this.state.kpis} />
            </Row>
        );
    }
}

export default Home;