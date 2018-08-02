import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import SplitPane from 'react-split-pane'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input, Menu } from 'antd';
const Search = Input.Search

import UserTable from '../../../components/UserTable/'
import * as classNames from 'classnames';
declare let global: any;

import styles from '../style/index.less'
import Log from '../container/log'
import User from '../container/user'
import Resource from '../../resource/routes'
import Alarm from '../../alarm/routes/'
import sideBar from '../../../components/SideBar'

class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    triggerResize() {
        let e: Event = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
    }
    componentWillReceiveProps(nextProps) {
    }
    goPath(e) {
        let { match } = this.props
        const path = e
        const currentUrl = this.props.location.pathname
        if (currentUrl.indexOf(path) < 0) {
            this.props.history.push(`${match.url}/${path}`)
        }

    }
    componentWillMount() {
    }
    handleClick(e) {
        this.goPath(e.key);
    }
    renderLeftNav() {
        let path = this.props.location.pathname
        let pathKey = path.replace('/setting/', '');
        if (pathKey.indexOf('setting') < 0) {
            return (
                <div>
                <Menu onClick={this.handleClick.bind(this)} defaultSelectedKeys={pathKey} mode="inline">
                    <Menu.Item key="resource">
                        <Icon type="folder" />资源管理
                    </Menu.Item>
                    <Menu.Item key="alarm">
                        <Icon type="bell" />告警管理
                    </Menu.Item>
                    <Menu.Item key="performance">
                        <Icon type="bar-chart" />性能管理
                    </Menu.Item>
                    <Menu.SubMenu key="log" title={<span><Icon type="form" />日志管理</span>}>
                        <Menu.Item key="login">
                            登录日志
                        </Menu.Item>
                        <Menu.Item key="activity">
                            活动日志
                        </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="user">
                        <Icon type="solution" />用户管理
                    </Menu.Item>
                </Menu>
                </div>
            )
        }
    }
    render() {
        let { match, tree } = this.props
        let { activeKey } = this.state
        // if (!tree) {
        //     return <div>loading</div>
        // }
        return (
            <Row className={styles.setting}>
                <SplitPane
                    split="vertical"
                    minSize={100}
                    maxSize={300}
                    defaultSize={200}
                    onChange={this.triggerResize} >
                    <div className="sideBar">
                        {this.renderLeftNav()}
                    </div>
                    <div className={styles.main}>
                        <Switch>
                            <Redirect from={`${match.url}`} to={`${match.url}/user`} exact />
                            <Route path={`${match.url}/user`} component={User} />}
                            <Route path={`${match.url}/log/login`} component={Log} />
                            <Route path={`${match.url}/resource`} component={Resource} />
                            <Route path={`${match.url}/alarm`} component={Alarm} />
                        </Switch>
                    </div>
                </SplitPane>
            </Row>
        );
    }
}

export default Home;