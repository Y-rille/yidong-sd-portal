import * as React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Input, Row, Col, Alert, notification, Divider, Checkbox } from 'antd';
import styles from '../style/index.less';
import { CommonActions } from '../../common/actions/index'
import emitter from '../../../common/emitter'
import { FormComponentProps } from 'antd/lib/form/Form';

declare let global: any;

const FormItem = Form.Item;

export interface LoginProps {
    location?,
    actions: CommonActions,
    currentUser?,
    history?
    form
}

class LoginCls extends React.PureComponent<LoginProps, any> {
    static childContextTypes = {
        location: PropTypes.object,
    }
    constructor(props) {
        super(props)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let self = this
        this.props.form.validateFields((err, values) => {
            if (!err) {
                self.props.actions.login(values, (data) => {
                    if (data) {
                        emitter.emit('message', 'success', '登录成功！')
                        this.props.history.replace(`/performance`)
                    } else {
                        emitter.emit('message', 'error', '用户名或密码错误！')
                    }
                })
            }
        });
    }
    renderForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.formcont}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input size="large" prefix={<Icon type="user" className={styles.prefixIcon} />} placeholder="用户名" />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input size="large" prefix={<Icon type="lock" className={styles.prefixIcon} />} placeholder="密码" type="password" />
                            )}

                    </FormItem>

                    <FormItem className={styles.additional}>
                        {/* {getFieldDecorator('remember', {
                            initialValue: true,
                        })(
                            <Checkbox className={styles.remember}>记住用户名</Checkbox>
                            )} */}
                        <Button size="large" className={styles.submit} type="primary" htmlType="submit">
                            登录 </Button>
                        <a className={styles.forgot} href="javascript:;">忘记密码</a>
                    </FormItem>
                </Form>

            </div>
        )
    }
    render() {
        return (
            <div className={styles.login} style={{ height: window.innerHeight }}>
                <div className={styles.top}>
                    <div className={styles.header}>
                        <img alt="logo" className={styles.logo} src={require('../../../img/logo.png')} />
                    </div>
                    <Divider style={{ margin: '32px 0' }}>用户登录</Divider>
                    {this.renderForm()}
                </div>
            </div>
        );
    }
}
const Login = Form.create<any>()(LoginCls);

export default Login;
