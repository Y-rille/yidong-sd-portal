import React from 'react';
import styles from './index.less';
import { Form, Input, Button, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import { FormComponentProps } from 'antd/lib/form/Form';

export interface FilterFireWallFormClsProps extends FormComponentProps {
    // data?
    getData?
    handleCancel?
}
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
};

class FilterFireWallFormCls extends React.PureComponent<FilterFireWallFormClsProps, any> {
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
    handleReset() {
        this.props.form.resetFields()
    }
    handleCancel() {
        if (this.props.handleCancel) {
            this.props.handleCancel()
        }
    }
    render() {
        // let fireWallInfo = this.props.data || ''
        const { menuValue, secondMenuValue } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className={styles.filterFireWallForm}>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="发现服务"
                        // hasFeedback
                        // required
                        >
                            {getFieldDecorator('dServer', {
                                initialValue: '廊坊发现纳管',
                                rules: [{
                                    required: true, message: '请选择发现服务',
                                }],
                            })(
                                <Select
                                >
                                    <Option value="廊坊发现纳管">廊坊发现纳管</Option>
                                    <Option value="发现纳管">望京发现纳管</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="用户名"
                        >
                            {getFieldDecorator('name', {
                                // initialValue: fireWallInfo.name,
                                rules: [{
                                    required: true, message: '请输入用户名！',
                                }],
                            })(
                                <Input placeholder="请输入用户名" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="供应商"
                        >
                            {getFieldDecorator('supplier', {
                                initialValue: 'HPE',
                                rules: [{
                                    required: true, message: '请选择供应商！',
                                }],
                            })(
                                <Select
                                >
                                    <Option value="HPE">HPE</Option>
                                    <Option value="H3C">H3C</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                        >
                            {getFieldDecorator('password', {
                                // initialValue: fireWallInfo.password,
                                rules: [{
                                    required: true, message: '请输入密码！',
                                }],
                            })(
                                <Input type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="设备IP"
                        >
                            {getFieldDecorator('ip', {
                                // initialValue: fireWallInfo.ip,
                                rules: [{
                                    required: true, message: '请输入设备IP！',
                                }],
                            })(
                                <Input placeholder="请输入设备IP" />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="协议"
                        >
                            {getFieldDecorator('protocol', {
                                // initialValue: fireWallInfo.protocol,
                                rules: [{
                                    required: true, message: '请输入协议！',
                                }],
                            })(
                                <Input placeholder="请输入协议" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.getData.bind(this)}>确定</Button>
                        <Button style={{ marginLeft: 10 }} onClick={this.handleReset.bind(this)}>重置</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
const FilterFireWallForm = Form.create<any>()(FilterFireWallFormCls);

export default FilterFireWallForm;