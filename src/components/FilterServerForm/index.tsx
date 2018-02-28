import React from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import styles from './index.less';
import { FormComponentProps } from 'antd/lib/form/Form';

export interface FilterServerFormClsProps extends FormComponentProps {
    data?
    getData?
}
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
class FilterServerFormCls extends React.PureComponent<FilterServerFormClsProps, any> {
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
        if (this.props.getData) {
            this.props.getData(data)
        }
    }
    resetForm() {
        this.props.form.resetFields()
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className={styles.filter_server_form}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="发现服务"
                        >
                            {getFieldDecorator('sever_find', {
                                initialValue: '1',
                                rules: [{
                                    required: true,
                                }],
                            })(
                                <Select style={{ width: '100%' }}>
                                    <Option value="1">Option 1</Option>
                                    <Option value="2">Option 2</Option>
                                    <Option value="3">Option 3</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="开始IP"
                        >
                            {getFieldDecorator('start_ip', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '',
                                }],
                            })(
                                <Input placeholder="" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="结束IP"
                        >
                            {getFieldDecorator('end_ip', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '',
                                }],
                            })(
                                <Input placeholder="" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="用户名"
                        >
                            {getFieldDecorator('name', {
                                initialValue: '',
                                rules: [{
                                    required: true,
                                }],
                            })(
                                <Input placeholder="" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="密码"
                        >
                            {getFieldDecorator('password', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '',
                                }],
                            })(
                                <Input type="password" placeholder="" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="网关"
                        >
                            {getFieldDecorator('gateway', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '',
                                }],
                            })(
                                <Input placeholder="" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="子网掩码"
                        >
                            {getFieldDecorator('subnet_mask', {
                                initialValue: '',
                                rules: [{
                                    required: true,
                                }],
                            })(
                                <Input placeholder="" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="DNS"
                        >
                            {getFieldDecorator('dns', {
                                initialValue: '',
                            })(
                                <Input placeholder="" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <div className={styles.bn}>
                    <Button className={styles.bn_ok} type="primary" onClick={this.getData.bind(this)}>确定</Button>
                    <Button onClick={this.resetForm.bind(this)}>重置</Button>
                </div>
            </Form>
        )
    }

}

const FilterServerForm = Form.create<any>()(FilterServerFormCls);

export default FilterServerForm;