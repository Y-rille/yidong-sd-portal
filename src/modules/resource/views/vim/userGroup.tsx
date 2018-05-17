import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Button, Input, Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import UserGroupList from '../../container/vim/UserGroupList'
import qs from 'querystringify'
import { stringify } from 'querystringify'
class UserGroup extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/vim/:id'
        })
        let { match } = this.props
        let { pathname } = this.props.location
        let { pageNo, userName, groupName } = qs.parse(this.props.location.search)
        this.state = {
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/user` }) != null && 'user',
                matchPath(pathname, { path: `${match.url}/group` }) != null && 'group'
            ]).toString(),
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            userName: userName ? userName : '',
            groupName: groupName ? groupName : '',
            vim_id: mp_node.params.id
        }
    }
    handleManage() {
        let { config } = this.props
        if (this.state.activeKey === 'user') {
            window.open(config.vim_manage_link.user)
        } else {
            window.open(config.vim_manage_link.group)
        }
    }
    changeUserNameValue(value) {
        this.setState({
            userName: value
        })
    }
    changeGroupNameValue(value) {
        this.setState({
            groupName: value
        })
    }
    getTableData(queryObj, actKey = null) {
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        let vim_id = mp_node.params.id
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { userName, groupName, pageSize, activeKey } = this.state
        let act_Key = actKey || activeKey
        let params_obj = (act_Key === 'user') ? { pageNo, pageSize, userName, groupName, vim_id } : { pageNo, pageSize, groupName, vim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        let dsname = ''
        switch (act_Key) {
            case 'user':
                dsname = 'imdsUser'
                break
            default:
                dsname = 'imdsUsergroup'
        }
        this.props.actions.queryList(dsname, params_obj, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    goPage = (num) => {
        let { match } = this.props
        let { userName, groupName, activeKey } = this.state
        let pageNo = num
        let queryObj = (activeKey === 'user') ? { pageNo, userName } : { pageNo, groupName }
        this.props.history.push(`${match.url}/${activeKey}?${qs.stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    goView(key, obj) {
        let { match } = this.props
        let pageNo = 1
        this.props.history.push(`${match.url}/user?pageNo=1&groupName=${obj.name}`)
        this.setState({
            activeKey: 'user',
            groupName: obj.name
        }, () => {
            this.getTableData({
                pageNo,
            })
        })
    }
    handleClick() {
        let { match } = this.props
        let { userName, groupName, activeKey } = this.state
        let pageNo = 1
        let queryObj = (activeKey === 'user') ? { pageNo, userName, groupName } : { pageNo, groupName }
        this.props.history.push(`${match.url}/${activeKey}?${qs.stringify(queryObj)}`)
        this.getTableData(queryObj)
        this.props.actions.resetList()
    }
    onChange(key) {
        let { match } = this.props
        let { pathname } = this.props.location
        let { userName, groupName } = this.state
        let pageNo = 1
        let queryObj = { pageNo }
        this.props.history.push(`${match.url}/${key}?${qs.stringify(queryObj)}`)
        this.setState({
            activeKey: key,
            userName: '',
            groupName: ''
        }, () => {
            this.getTableData({
                queryObj, key
            })
        })
        this.props.actions.resetList()
    }
    componentWillMount() {
        let { pathname } = this.props.location
        if (this.state.activeKey.length > 0) {  // 刷新
            let { pageNo } = this.state
            let queryObj = {
                pageNo
            }
            this.getTableData(queryObj)
        }
    }
    componentWillReceiveProps(nextProps) {
        let { match } = this.props
        let { pathname } = nextProps.location
        let actKey = _.compact([
            matchPath(pathname, { path: `${match.url}/user` }) != null && 'user',
            matchPath(pathname, { path: `${match.url}/group` }) != null && 'group'
        ]).toString()
        if (this.state.activeKey.length === 0 && actKey.length > 0) {    // 第一次进入;info返回；进入info
            let pageNo = qs.parse(nextProps.location.search).pageNo || 1
            let queryObj = {
                pageNo
            }
            this.getTableData(queryObj, actKey)
        }
        this.setState({
            activeKey: actKey
        })
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    render() {
        let { match, nodeInfo, list } = this.props
        let { activeKey, pageSize, tableLoading, userName, groupName } = this.state
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
                    <div className={styles.queryBar}>

                        {
                            activeKey === 'user' ? (
                                <Input placeholder="用户名称"
                                    value={userName} type="text"
                                    onChange={e => this.changeUserNameValue(e.target.value)}
                                />
                            ) : ''
                        }
                        <Input placeholder="用户组名称"
                            value={groupName} type="text"
                            onChange={e => this.changeGroupNameValue(e.target.value)} />
                        <Button
                            type="primary"
                            onClick={this.handleClick.bind(this)}
                        >
                            查询
                        </Button>
                        <Button style={{ float: 'right' }}
                            type="primary"
                            onClick={this.handleManage.bind(this)}
                        >
                            管理
                        </Button>
                    </div>
                    <Tabs onChange={this.onChange.bind(this)} type="card" activeKey={activeKey} animated={false}>
                        <TabPane tab="用户" key="user"></TabPane>
                        <TabPane tab="用户组" key="group"></TabPane>
                    </Tabs>
                    <Switch>
                        <Redirect from={`${match.url}`} to={`${match.url}/user`} exact />
                        <Route path={`${match.url}/:type`}
                            render={() => <UserGroupList {...this.props} pageSize={pageSize} goPage={this.goPage.bind(this)} data={list} tableLoading={tableLoading}
                                goView={this.goView.bind(this)}
                            />}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}
export default UserGroup;