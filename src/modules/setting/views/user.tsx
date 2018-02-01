import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SplitPane from 'react-split-pane'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input } from 'antd';
const Search = Input.Search
import UserTable from '../../../components/UserTable/'
import UserEdit from '../../../components/UserEdit/'

declare let global: any;
import styles from '../style/index.less'

var qs = require('querystringify')
import { stringify } from 'querystringify'

import { SettingActions } from '../actions/index'

export interface UserProps {
    location?,
    actions: SettingActions,
    userList,
    params?
}

class User extends React.PureComponent<UserProps, any> {
    constructor(props) {
        super(props);
        let { page_num, query_key } = qs.parse(this.props.location.search)

        this.state = {
            visible: false,
            listLoading: false,
            page_size: 10,
            page_num: page_num ? page_num : 0,
            query_key: query_key ? query_key : '',
        };
    }
    componentWillReceiveProps(nextProps) {
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
    goEdit(id) {
        // 编辑
        this.setState({
            visible: true,
        });

    }
    goPage(current) {
        let page_num = current - 1
        let { page_size, query_key } = this.state
        let queryObj = {
            page_num, page_size, query_key
        }
        global.hashHistory.push(`/setting/user?${stringify(queryObj)}`)
        this.setState({
            page_num: page_num
        });
        this.getDataFn(queryObj)
    }
    getDataFn(queryObj) {
        this.setState({
            listLoading: true
        });
        let self = this
        let { page_num, page_size, query_key } = queryObj
        this.props.actions.getList({ page_num, page_size, query_key }, () => {
            self.setState({
                listLoading: false
            });
        })
    }
    searchHandler(query_key) {
        let { page_num, page_size } = this.state
        page_num = 0
        let queryObj = { page_num, query_key, page_size }
        global.hashHistory.push(`/setting/user?${stringify(queryObj)}`)
        this.setState({
            page_num, query_key
        });
        this.getDataFn(queryObj)
    }
    componentWillMount() {
        let { page_num, page_size, query_key } = this.state
        let queryObj = {
            page_num, page_size, query_key
        }
        this.getDataFn(queryObj)
    }
    render() {
        let { page_num, page_size, query_key } = this.state
        let userList = this.props.userList
        let canRender = false
        if (userList) {
            canRender = true
        }
        if (!canRender) {
            return <div />
        }
        // let { match, tree } = this.props
        // let { activeKey } = this.state
        // if (!tree) {
        //     return <div>loading</div>
        // }
        return (
            <Row className={styles.setting}>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
                        <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className={styles._title}>用户管理</h1>
                    <Button type="primary" onClick={this.showModal.bind(this)}>新建用户</Button>
                    <Search
                        className={styles.search}
                        placeholder="请输入关键字"
                        defaultValue={query_key}
                        onSearch={value => this.searchHandler(value)}
                    />
                    <UserTable
                        goPage={this.goPage.bind(this)}
                        page_num={page_num}
                        page_size={page_size}
                        showModal={this.showModal.bind(this)}
                        goEdit={this.goEdit.bind(this)}
                        userList={userList}
                    />
                </div>
                <UserEdit
                    visible={this.state.visible}
                    handleOk={this.handleOk.bind(this)}
                    handleCancel={this.handleCancel.bind(this)}
                />
            </Row>
        );
    }
}

export default User;