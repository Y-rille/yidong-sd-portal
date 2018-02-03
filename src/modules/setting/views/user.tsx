import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SplitPane from 'react-split-pane'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input, Modal } from 'antd';
const Search = Input.Search
import UserTable from '../../../components/UserTable/'
import UserEditPassword from '../../../components/UserEditPassword/'
import UserEdit from '../container/userEdit'

declare let global: any;
import styles from '../style/index.less'

var qs = require('querystringify')
import { stringify } from 'querystringify'

import { SettingActions } from '../actions/index'

import emitter from '../../../common/emitter'

export interface UserProps {
    location?,
    actions: SettingActions,
    userList,
    params?
    history?
}

class User extends React.PureComponent<UserProps, any> {
    constructor(props) {
        super(props);
        let { page_num, query_key } = qs.parse(this.props.location.search)

        this.state = {
            currentId: false,
            userId: '',
            visible: false,
            listLoading: false,
            page_size: 10,
            page_num: page_num ? page_num : 0,
            query_key: query_key ? query_key : '',
        };
    }
    componentWillReceiveProps(nextProps) {
    }
    showModal(userId) {
        this.setState({
            visible: true,
            userId: userId
        })
    }
    handleOk(param) {
        if (param) {
            let userId = this.state.userId
            this.props.actions.editUserPassword(userId, param, (err, data) => {
                if (data) {
                    this.setState({
                        visible: false,
                        userId: ''
                    });
                    emitter.emit('message', 'success', '修改成功！')
                }
            })
        }
    }
    handleCancel() {
        this.setState({
            visible: false,
            userId: ''
        })
    }
    goCreate() {
        this.props.history.push(`/setting/user/create`)
    }
    goEdit(id) {
        // 编辑
        this.props.history.push(`/setting/user/edit/${id}`)
    }
    goDelete(userId, name) {
        let self = this
        Modal.confirm({
            title: '确定要删除' + name + '吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                self.props.actions.deleteUser(userId, (data) => {
                    if (data) {
                        emitter.emit('message', 'success', '删除成功！')
                    } else {
                        emitter.emit('message', 'error', '删除失败！')
                    }
                })
            },
            onCancel() { },
        });
    }
    goPage(current) {
        let page_num = current - 1
        let { page_size, query_key } = this.state
        let queryObj = {
            page_num, page_size, query_key
        }
        this.props.history.push(`/setting/user?${stringify(queryObj)}`)
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
        this.props.history.push(`/setting/user?${stringify(queryObj)}`)
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
        let { match } = this.props
        return (
            <Switch>
                <Route path={`${match.url}/create`} component={UserEdit} />
                <Route path={`${match.url}/edit/:userId`} component={UserEdit} />
                <Route render={() => (
                    <Row className={styles.setting}>
                        <div className={styles.cont}>
                            <div className={styles.header}>
                                <h1 className={styles.title}>用户管理</h1>
                                <Breadcrumb>
                                    <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                    <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div className={styles.filter}>
                                <Search
                                    className={styles.search}
                                    placeholder="请输入用户名"
                                    defaultValue={query_key}
                                    enterButton="查询"
                                    onSearch={value => this.searchHandler(value)}
                                />
                                <Button className={styles.bn} onClick={this.goCreate.bind(this)}><Icon type="file-add" />新建用户</Button>
                            </div>
                            <UserTable
                                showModal={this.showModal.bind(this)}
                                goDelete={this.goDelete.bind(this)}
                                goPage={this.goPage.bind(this)}
                                page_num={page_num}
                                page_size={page_size}
                                goEdit={this.goEdit.bind(this)}
                                userList={userList}
                            />
                            <UserEditPassword
                                visible={this.state.visible}
                                handleOk={this.handleOk.bind(this)}
                                handleCancel={this.handleCancel.bind(this)}
                            />
                        </div>
                    </Row>
                )} />
            </Switch>
        );
    }
}

export default User;