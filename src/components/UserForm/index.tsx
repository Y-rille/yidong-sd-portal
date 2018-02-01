import React from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import styles from './index.less';
import { FormComponentProps } from 'antd/lib/form/Form';

export interface UserFormClsProps extends FormComponentProps {
    data?
    id?
}
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
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
        const { getFieldDecorator } = this.props.form;
        const children = [];
        const arr = ['admin', 'performance', 'resource', 'alarm']
        arr.map((item, index) => {
            children.push(<Option key={item}>{item}</Option>)
        })
        return (
            <Form className={styles.userForm}>
                <Form.Item
                    {...formItemLayout}
                    label="邮箱"
                    hasFeedback
                    required
                >
                    {getFieldDecorator('email', {
                        // initialValue: email,
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }],
                    })(
                        <Input placeholder="请输入邮箱" />
                        )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="真实姓名"
                >
                    {getFieldDecorator('name', {
                        // initialValue: name
                        rules: [{
                            required: true, message: '请输入真实姓名！',
                        }],
                    })(
                        <Input placeholder="请输入真实姓名" />
                        )}
                </Form.Item>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        // initialValue: password
                        rules: [{
                            required: true, message: '请输入密码！',
                        }],
                    })(
                        <Input type="password" />
                        )}
                </FormItem>
                <Form.Item
                    {...formItemLayout}
                    label="手机号"
                >
                    {getFieldDecorator('mobile', {
                        // initialValue: mobile
                        rules: [{
                            required: true, message: '请输入手机号！',
                        }],
                    })(
                        <Input placeholder="请输入手机号" />
                        )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="角色"
                >
                    {getFieldDecorator('remark', {
                        // initialValue: remark
                        rules: [{
                            required: true, message: '请选择角色！',
                        }],
                    })(
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="请选择角色"
                            onChange={this.handleChange.bind(this)}
                        >
                            {children}
                        </Select>
                        )}
                </Form.Item>
            </Form>
        )
    }

}

const UserForm = Form.create<any>()(UserFormCls);

export default UserForm;