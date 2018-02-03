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
}

class UserEdit extends React.PureComponent<UserEditProps, any> {
    formRef: any;
    constructor(props) {
        super(props);
        this.state = {
            // listLoading: false
        };
    }

    doCancel() {
        global.hashHistory.goBack()
    }

    doSubmit() {
        let formdata = this.formRef.getData()
        let { match } = this.props
        let id = match.params.userId
        if (formdata) {
            if (id) {
                this.props.actions.editUser(id, formdata, (err, data) => {
                    if (data) {
                        emitter.emit('notification', '修改成功！', '', 'success')
                        setTimeout(() => {
                            global.hashHistory.push('/setting/user')
                        }, 1000)
                    }
                })
            } else {
                this.props.actions.createUser(formdata, (err, data) => {
                    if (data) {
                        emitter.emit('notification', '创建成功！', '', 'success')
                        setTimeout(() => {
                            global.hashHistory.push('/setting/user')
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
        this.props.actions.resetUserInfo()
    }
    render() {
        let { match } = this.props
        let id = match.params.userId
        let modalTitle = match.params.userId ? '编辑用户' : '创建用户'
        return (
            <Row className={styles.setting}>
                <div className={styles.cont}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>{modalTitle}</h1>
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                            <Breadcrumb.Item>{modalTitle}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <UserForm
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