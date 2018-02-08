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
                <Menu onClick={this.handleClick.bind(this)} defaultSelectedKeys={pathKey} mode="inline">
                    <Menu.Item key="user">
                        <Icon type="solution" />用户管理
                    </Menu.Item>
                    <Menu.Item key="log">
                        <Icon type="form" />日志管理
                    </Menu.Item>
                </Menu>
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
                    {this.renderLeftNav()}
                    <div className={styles.main}>
                        <Switch>
                            <Redirect from={`${match.url}`} to={`${match.url}/user`} exact />
                            <Route path={`${match.url}/user`} component={User} />}
                            <Route path={`${match.url}/log`} component={Log} />
                        </Switch>
                    </div>
                </SplitPane>
            </Row>
        );
    }
}

export default Home;