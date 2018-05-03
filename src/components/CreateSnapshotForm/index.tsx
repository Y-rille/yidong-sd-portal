import React from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import styles from './index.less';
import _ from 'lodash'
import { FormComponentProps } from 'antd/lib/form/Form';

export interface CreateSnapshotFormClsProps extends FormComponentProps {
    data?
    getData?
}
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};
class CreateSnapshotFormCls extends React.PureComponent<CreateSnapshotFormClsProps, any> {
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
    render() {
        const { getFieldDecorator } = this.props.form;
        const { data } = this.props;
        return (
            <Form className={styles.createSnapshotForm}>
                <Form.Item
                    {...formItemLayout}
                    label="名称"
                >
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: '请输入名称!',
                        }],
                    })(
                        <Input placeholder="请输入名称" />
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
const CreateSnapshotForm = Form.create<any>()(CreateSnapshotFormCls);

export default CreateSnapshotForm;