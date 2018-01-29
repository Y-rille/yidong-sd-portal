import * as React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Icon, Input, Row, Col, Alert, notification, Divider, Checkbox } from 'antd';
import styles from '../style/index.less';
import { CommonActions } from '../../common/actions/index'
import emitter from '../../../common/emitter'
import { FormComponentProps } from 'antd/lib/form/Form';

declare let global: any;

const FormItem = Form.Item;
const links = [{
    title: '帮助',
    href: '',
}, {
    title: '隐私',
    href: '',
}, {
    title: '条款',
    href: '',
}];
const copyright = <div>Copyright <Icon type="copyright" /> 2017</div>;

export interface LoginProps {
    location?,
    actions: CommonActions,
    currentUser?
    form
}

class LoginCls extends React.PureComponent<LoginProps, any> {
    static childContextTypes = {
        location: PropTypes.object,
    }
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let self = this
        this.props.form.validateFields((err, values) => {
            if (!err) {
                self.setState({
                    loading: true
                })
                self.props.actions.login(values, (data) => {
                    self.setState({
                        loading: false
                    })
                    if (data) {
                        emitter.emit('message', 'success', '登录成功！')
                        global.hashHistory.replace(`/performance/1/current`)
                    }
                })
            }
        });
    }
    renderForm() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.main}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input size="large" prefix={<Icon type="user" className={styles.prefixIcon} />} placeholder="用户名" disabled={this.state.loading} />
                            )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input size="large" prefix={<Icon type="lock" className={styles.prefixIcon} />} placeholder="密码" type="password" disabled={this.state.loading} />
                            )}

                    </FormItem>

                    <FormItem className={styles.additional}>
                        {getFieldDecorator('remember', {
                            initialValue: true,
                        })(
                            <Checkbox className={styles.remember}>记住用户名</Checkbox>
                            )}
                        <Button size="large" className={styles.submit} type="primary" htmlType="submit" disabled={this.state.loading} >
                            登录 </Button>
                        <a className="login-form-forgot" href="javascript:;">忘记密码</a>
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
                        <a href="/">
                            <img alt="" className={styles.logo} src={require('../../../img/logo.png')} />
                        </a>
                    </div>
                    {/*<p className={styles.desc}>cloud management platform</p>*/}
                    <Divider style={{ margin: '32px 0' }}>用户登录</Divider>
                    {this.renderForm()}
                </div>
            </div>
        );
    }
}
const Login = Form.create<any>()(LoginCls);

export default Login;
