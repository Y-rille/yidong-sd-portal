import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import styles from './index.less';
import { FormComponentProps } from 'antd/lib/form/Form';

export interface VimFormClsProps extends FormComponentProps {
    data?
}
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
class VimFormCls extends React.PureComponent<VimFormClsProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
        }
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

    render() {
        let vimInfo = this.props.data || ''
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className={styles.vimForm}>
                <Form.Item
                    {...formItemLayout}
                    label="VIM ID"
                >
                    {getFieldDecorator('id', {
                        initialValue: vimInfo.id,
                        rules: [{
                            required: true, message: '请输入VIM ID！',
                        }],
                    })(
                        <Input placeholder="请输入VIM ID" />
                        )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="名称"
                >
                    {getFieldDecorator('name', {
                        initialValue: vimInfo.name,
                        rules: [{
                            required: true, message: '请输入名称！',
                        }],
                    })(
                        <Input placeholder="请输入名称" />
                        )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="URL"
                >
                    {getFieldDecorator('url', {
                        initialValue: vimInfo.url,
                        rules: [{
                            required: true, message: '请输入URL！',
                        }],
                    })(
                        <Input placeholder="请输入URL" />
                        )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="位置"
                >
                    {getFieldDecorator('position', {
                        initialValue: vimInfo.position,
                        rules: [{
                        }],
                    })(
                        <Input placeholder="请输入位置" />
                        )}
                </Form.Item>
                <FormItem
                    {...formItemLayout}
                    label="描述"
                >
                    {getFieldDecorator('description', {
                        initialValue: vimInfo.description,
                        rules: [{
                        }],
                    })(
                        <TextArea rows={4} />
                        )}
                </FormItem>
            </Form>
        )
    }

}

const VimForm = Form.create<any>()(VimFormCls);

export default VimForm;