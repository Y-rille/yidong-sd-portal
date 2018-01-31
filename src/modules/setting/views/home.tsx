import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import SplitPane from 'react-split-pane'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input } from 'antd';
const Search = Input.Search

import UserTable from '../../../components/UserTable/'

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
        const path = e.target.getAttribute('data-target')
        global.hashHistory.push(`${match.url}/${path}`)
    }
    componentWillMount() {
    }
    render() {
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
                    <div>
                        <div onClick={this.goPath.bind(this)} data-target="user">用户管理</div>
                        <div onClick={this.goPath.bind(this)} data-target="log">日志管理</div>
                    </div>
                    <div className={styles.main}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>用户管理</h1>

                            <Breadcrumb>
                                <Breadcrumb.Item>首页</Breadcrumb.Item>
                                <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
                                <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className={styles._title}>用户管理</h1>
                            <Button type="primary">新建用户</Button>
                            <Search
                                className={styles.search}
                                placeholder="请输入关键字"
                            />
                            <UserTable />
                        </div>

                        <Switch>
                            <Route path={`${match.url}/user`} component={User} />
                            <Route path={`${match.url}/log`} component={Log} />
                        </Switch>
                        11111

                    </div>
                </SplitPane>
            </Row>
        );
    }
}

export default Home;