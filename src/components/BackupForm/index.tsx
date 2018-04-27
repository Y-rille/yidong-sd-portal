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
    render() {
        const { getFieldDecorator } = this.props.form;
        const { data } = this.props;
        return (
            <Form className={styles.backupForm}>
                <Form.Item
                    {...formItemLayout}
                    label="存储目标地址"
                >
                    {getFieldDecorator('startip', {
                        rules: [{
                            required: true, message: '请输入存储目标地址!',
                        }],
                    })(
                        <Input placeholder="请输入存储目标地址" />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="存储名称"
                >
                    {getFieldDecorator('startip', {
                        rules: [{
                            required: true, message: '请输入存储名称!',
                        }],
                    })(
                        <Input placeholder="请输入存储名称" />
                    )}
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="描述"
                >
                    {getFieldDecorator('endip', {
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