import React from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import styles from './index.less';
import { FormComponentProps } from 'antd/lib/form/Form';

export interface UserFormClsProps extends FormComponentProps {
    userInfo?
    id?
}
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const formItemLayoutBei = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
};
class UserFormCls extends React.PureComponent<UserFormClsProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            // avatar: data && data.avatar ? data.avatar : '',
        }
    }
    handleChange(value) {
        // console.log(`selected ${value}`);
    }
    getData() {
        let data = null
        this.props.form.validateFields((err, values) => {
            if (!err) {
                delete values.username
                data = values
            } else {
                data = null
            }
        })
        return data
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
    }

    render() {
        let userInfo = this.props.userInfo || ''
        // let disabled = this.props.userInfo ? true : false
        let rolesStr = ''
        let rolesArr = []
        if (this.props.userInfo) {
            rolesStr = userInfo.roles
            rolesArr = rolesStr.split(',')
        }
        const { getFieldDecorator } = this.props.form;
        const children = [];
        const arr = ['admin', 'performance', 'resource', 'alarm']
        arr.map((item, index) => {
            children.push(<Option key={item}>{item}</Option>)
        })
        return (
            <Form className={styles.userForm}>
                <Row>
                    <Col span={12}>
                        <Form.Item
                            {...formItemLayout}
                            label="邮箱"
                            hasFeedback
                            required
                        >
                            {getFieldDecorator('email', {
                                initialValue: userInfo.email,
                                rules: [{
                                    type: 'email', message: 'The input is not valid E-mail!',
                                }],
                            })(
                                <Input placeholder="请输入邮箱" />
                                )}
                        </Form.Item>
                        {
                            this.props.userInfo ? '' : <FormItem
                                {...formItemLayout}
                                label="密码"
                            >
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: '请输入密码！',
                                    }],
                                })(
                                    <Input type="password" placeholder="请输入密码" />
                                    )}
                            </FormItem>
                        }
                        <Form.Item
                            {...formItemLayout}
                            label="角色"
                        >
                            {getFieldDecorator('roles', {
                                initialValue: rolesArr,
                                rules: [{
                                    required: true, message: '请选择角色！',
                                }],
                            })(
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="请选择角色"
                                    onChange={this.handleChange.bind(this)}
                                >
                                    {children}
                                </Select>
                                )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            {...formItemLayout}
                            label="真实姓名"
                        >
                            {getFieldDecorator('name', {
                                initialValue: userInfo.name,
                                rules: [{
                                    required: true, message: '请输入真实姓名！',
                                }],
                            })(
                                <Input placeholder="请输入真实姓名" />
                                )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="手机号"
                        >
                            {getFieldDecorator('mobile', {
                                initialValue: userInfo.mobile,
                                rules: [{
                                }],
                            })(
                                <Input placeholder="请输入手机号" />
                                )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem
                            {...formItemLayoutBei}
                            label="备注"
                        >
                            {getFieldDecorator('remark', {
                                initialValue: userInfo.remark,
                                rules: [{
                                }],
                            })(
                                <TextArea rows={5} />
                                )}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }

}

const UserForm = Form.create<any>()(UserFormCls);

export default UserForm;