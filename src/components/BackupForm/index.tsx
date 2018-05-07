import React from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import styles from './index.less';
import _ from 'lodash'
import { FormComponentProps } from 'antd/lib/form/Form';

export interface BackupFormClsProps extends FormComponentProps {
    data?
    getData?
}
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
class BackupFormCls extends React.PureComponent<BackupFormClsProps, any> {
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
    handleReset() {
        this.props.form.resetFields()
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { data } = this.props;
        return (
            <Form className={styles.backupForm}>
                <Form.Item
                    {...formItemLayout}
                    label="存储目标地址"
                >
                    {getFieldDecorator('storageTargetType', {
                        initialValue: '1',
                        rules: [{
                            required: true, message: '请选择存储目标地址!',
                        }],
                    })(
                        <Select>
                            <Option value="1">本地服务器</Option>
                            <Option value="2">备份服务器(sftp)</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="描述"
                >
                    {getFieldDecorator('desciption', {
                        rules: [{
                            required: false,
                        }],
                    })(
                        <TextArea rows={4} />
                    )}
                </Form.Item>
            </Form>
        )
    }
}
const BackupForm = Form.create<any>()(BackupFormCls);

export default BackupForm;