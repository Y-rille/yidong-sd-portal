import React from 'react';
import { Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import styles from './index.less';
import { FormComponentProps } from 'antd/lib/form/Form';

export interface FilterServerFormClsProps extends FormComponentProps {
    data?
}
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
class FilterServerFormCls extends React.PureComponent<FilterServerFormClsProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
        }
    }
    handleChange(value) {
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
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className={styles.filter_server_form}>
                <div className={styles.layout}>
                    <Form.Item
                        {...formItemLayout}
                        label="发现服务"
                    >
                        {getFieldDecorator('id', {
                            initialValue: '',
                            rules: [{
                                required: true,
                            }],
                        })(
                            <Select onChange={this.handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="开始IP"
                    >
                        {getFieldDecorator('name', {
                            initialValue: '',
                            rules: [{
                                required: true, message: '请输入名称！',
                            }],
                        })(
                            <Input placeholder="请输入名称" />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="结束IP"
                    >
                        {getFieldDecorator('url', {
                            initialValue: '',
                            rules: [{
                                required: true, message: '请输入URL！',
                            }],
                        })(
                            <Input placeholder="请输入URL" />
                        )}
                    </Form.Item>
                </div>
            </Form>
        )
    }

}

const FilterServerForm = Form.create<any>()(FilterServerFormCls);

export default FilterServerForm;