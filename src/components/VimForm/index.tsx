import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;
import styles from './index.less';
import { FormComponentProps } from 'antd/lib/form/Form';
import UUID from 'uuid'
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
        let { data } = this.props
        this.state = {
            VimId: data && data.VimId ? data.VimId : UUID.v1()
        }
    }
    getData() {
        let data = null
        this.props.form.validateFields((err, values) => {
            if (!err) {
                delete values.username
                data = values
                data.VimId = this.state.VimId
            } else {
                data = null
            }
        })
        return data
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data.ID !== this.props.data.ID) {
            this.setState({
                VimId: nextProps.data.VimId
            })
        }
    }
    render() {
        let { data } = this.props
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className={styles.vimForm}>
                <Form.Item
                    {...formItemLayout}
                    label="VIM ID"
                >
                    <p>{this.state.VimId}</p>
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="名称"
                >
                    {getFieldDecorator('NAME', {
                        initialValue: data.NAME,
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
                        initialValue: data.url,
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
                        initialValue: data.position,
                        rules: [{
                            // required: true, message: '请输入位置！',
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
                        initialValue: data.description,
                        rules: [{
                            // required: true, message: '请输入描述！',
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