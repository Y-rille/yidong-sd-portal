import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;
import { FormComponentProps } from 'antd/lib/form/Form';

export interface UserPasswordFormClsProps extends FormComponentProps {
    wrappedComponentRef?
}
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
class UserPasswordFormCls extends React.PureComponent<UserPasswordFormClsProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {

        }
    }
    getData() {
        let data = null
        this.props.form.validateFields((err, values) => {
            if (!err) {
                data = values
            } else {
                data = null
            }
        })
        return data
    }
    resetForm() {
        this.props.form.resetFields()
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="新密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入新密码！',
                        }],
                    })(
                        <Input type="password" placeholder="请输入新密码" />
                        )}
                </FormItem>
            </Form>
        )
    }

}

const UserPasswordForm = Form.create<any>()(UserPasswordFormCls);

export default UserPasswordForm;