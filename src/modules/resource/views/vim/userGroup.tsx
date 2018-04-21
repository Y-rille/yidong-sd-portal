import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import UserGroupList from '../../container/vim/UserGroupList'
class UserGroup extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pathname } = this.props.location
        this.state = {
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/user` }) != null && 'user',
                matchPath(pathname, { path: `${match.url}/group` }) != null && 'group'
            ]).toString(),
        }
    }
    onChange(key) {
        let { match } = this.props
        let { pathname } = this.props.location
        this.props.history.push(`${match.url}/${key}`)
        this.setState({
            activeKey: key,
            // pageNo
        })
    }
    componentWillReceiveProps(nextProps) {
        let { match } = this.props
        let { pathname } = nextProps.location
        this.state = {
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/user` }) != null && 'user',
                matchPath(pathname, { path: `${match.url}/group` }) != null && 'group'
            ]).toString(),
        }
    }
    render() {
        let { match, nodeInfo, config } = this.props
        let { activeKey } = this.state
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>用户和用户组管理</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item>用户和用户组管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs onChange={this.onChange.bind(this)} type="card" activeKey={activeKey} animated={false}>
                        <TabPane tab="用户" key="user"></TabPane>
                        <TabPane tab="用户组" key="group"></TabPane>
                    </Tabs>
                    <Switch>
                        <Redirect from={`${match.url}`} to={`${match.url}/user`} exact />
                        <Route path={`${match.url}/:type`}
                            render={() => <UserGroupList {...this.props} />}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}
export default UserGroup;