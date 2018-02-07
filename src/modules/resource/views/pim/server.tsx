import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import ServerInfo from '../../container/pim/serverInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin } from 'antd';
import styles from '../../style/index.less'
class Server extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    goInfo = () => {
        this.props.history.push(`/resource/pim/1/server/info`)
    }
    render() {
        let { match } = this.props
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>服务器列表</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                        <Breadcrumb.Item>服务器列表</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={styles.queryBar}>
                    queryBar
                </div>
                <Switch>
                    <Route path={`${match.url}/info`} component={ServerInfo} />
                    <Route render={() => (
                        <div onClick={this.goInfo}>详情</div>
                    )} />
                </Switch>
            </div>
        );
    }
}
export default Server;