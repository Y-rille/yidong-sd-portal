import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import SplitPane from 'react-split-pane'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input, Menu , Tree } from 'antd';
const Search = Input.Search
const TreeNode = Tree.TreeNode
import UserTable from '../../../components/UserTable/'
import * as classNames from 'classnames';
declare let global: any;
import SideBar from '../../../components/SideBar'
import styles from '../style/index.less'
import Log from '../container/log'
import User from '../container/user'
const SubMenu = Menu.SubMenu

class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
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
            this.props.history.push(`/${path}`)
        }
    }
    componentWillMount() {
    }
    handleClick(e) {
        this.goPath(e.key);
    }

    renderSider(match) {
        let route = this.props.location.pathname.replace('/resource/', '')
        let resourceTree = this.props.resourceTree
        let current = route.replace('/info', '')
        if (resourceTree && current.indexOf('resource') < 0) {
            return <SideBar match={match} pathname={this.props.location.pathname} onLinkHandleClick={this.handleClick} resourceTree={resourceTree} />
        } else {
            return <div />
        }
    }
    renderLeftNav() {
        let path = this.props.location.pathname;
        let pathKey = path.replace('/setting/', '');
        if (pathKey.indexOf('setting') < 0) {
            return (
                <Menu onClick={this.handleClick.bind(this)} defaultSelectedKeys={pathKey} mode="inline"> 
                        {/* <SubMenu key="resource" title={<span><Icon type="folder" /><span>资源管理</span></span>}> 
                            <Menu.Item key="5">Option 5</Menu.Item>
                            <Menu.Item key="6">Option 6</Menu.Item>
                            <Menu.Item key="7">Option 7</Menu.Item>
                        </SubMenu>                 */}
                        <Menu.Item key="resource">
                            <Icon type="folder" />资源管理
                        </Menu.Item>
                        <Menu.Item key="alarm">
                            <Icon type="bell" />告警管理
                        </Menu.Item>
                        <Menu.Item key="performance">
                            <Icon type="exception" />性能管理
                        </Menu.Item>
                        <Menu.Item key="setting/user">
                            <Icon type="solution" />用户管理
                        </Menu.Item>
                        <Menu.Item key="setting/log">
                            <Icon type="form" />日志管理
                        </Menu.Item>
                </Menu>
            );
        }
    }
    render() {
        let { match, tree , nodeInfo} = this.props
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
                            <Route path={`${match.url}/log`} component={Log} />
                        </Switch>
                    </div>
                </SplitPane>
            </Row>
        );
    }
}

export default Home;