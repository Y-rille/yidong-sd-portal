import * as React from 'react';
import styles from '../style/index.less'
import * as _ from 'lodash';
import { Row, Col, Breadcrumb, Icon, Tabs, Button } from 'antd';
import UserForm from '../../../components/UserForm/'
import { SettingActions } from '../actions/index'
declare let global: any;
import emitter from '../../../common/emitter'

export interface UserEditProps {
    modalTitle?
    actions: SettingActions,
    userInfo?
    history?,
    match?
}

class UserEdit extends React.PureComponent<UserEditProps, any> {
    formRef: any;
    constructor(props) {
        super(props);
        this.state = {
            // listLoading: false
            page_size: 5,
            page_num: 1,
            query_key: '',
        };
    }

    doCancel() {
        this.props.history.goBack()
    }

    doSubmit() {
        let formdata = this.formRef.getData()
        let arr = formdata.roles
        let base_data = {
            admin: '系统管理员',
            resource: '资源运维人员',
            alarm: '告警运维人员',
            performance: '性能运维人员'
        }
        let rolesArr = []
        for (var i = 0; i < arr.length; i++) {
            for (var key in base_data) {
                if (base_data[key] === arr[i]) {
                    rolesArr.push(key)
                }
            }
        }
        formdata.roles = rolesArr.toString()
        let { match, history } = this.props
        let id = match.params.userId
        if (formdata) {
            if (id) {
                this.props.actions.editUser(id, formdata, (err, data) => {
                    if (data) {
                        emitter.emit('message', 'success', '修改成功！')
                        setTimeout(() => {
                            history.push('/setting/user')
                        }, 1000)
                    }
                })
            } else {
                this.props.actions.createUser(formdata, (err, data) => {
                    if (data) {
                        emitter.emit('message', 'success', '创建成功！')
                        setTimeout(() => {
                            history.push('/setting/user')
                        }, 1000)
                    }
                })
            }
        }

    }
    componentWillMount() {
        let { match } = this.props
        let id = match.params.userId
        if (id) {
            this.props.actions.getUserInfo(id)
        }

    }

    componentWillUnmount() {
        let { page_num, page_size, query_key } = this.state
        this.props.actions.resetUserInfo()
        this.props.actions.getList({ page_num, page_size, query_key }, () => { })
    }
    goUserList() {
        this.props.history.push('/setting/user')
    }
    render() {
        let { match } = this.props
        let id = match.params.userId
        let modalTitle = match.params.userId ? '编辑用户' : '创建用户'
        return (
            <Row className={styles.setting}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{modalTitle}</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                        <Breadcrumb.Item onClick={this.goUserList.bind(this)}><a>用户管理</a></Breadcrumb.Item>
                        <Breadcrumb.Item>{modalTitle}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={styles.tb}>
                    <UserForm
                        id={id}
                        userInfo={this.props.userInfo}
                        wrappedComponentRef={(node) => { this.formRef = node }}
                    />
                </div>
                <div className={styles.footer}>
                    <Button type="primary" onClick={this.doSubmit.bind(this)}>确定</Button>
                    <Button onClick={this.doCancel.bind(this)}>取消</Button>
                </div>
            </Row>
        )
    }
}
export default UserEdit;