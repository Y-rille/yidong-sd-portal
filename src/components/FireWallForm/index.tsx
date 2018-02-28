import React from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import { FormComponentProps } from 'antd/lib/form/Form';

export interface FireWallFormClsProps extends FormComponentProps {

}
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

class FireWallFormCls extends React.PureComponent<FireWallFormClsProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            menuValue: '廊坊发现纳管',
            secondMenuValue: 'H3C'
        }
    }
    menuChange(value) {
        this.setState({
            menuValue: value
        })
    }
    secondMenuChange(value) {
        this.setState({
            secondMenuValue: value
        })
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
        // let fireWallInfo = this.props.data || ''
        const { menuValue, secondMenuValue } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className={styles.userForm}>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="发现服务"
                            hasFeedback
                            required
                        >
                            {getFieldDecorator('dServer', {
                                // initialValue: fireWallInfo.dServer,
                                rules: [{
                                    type: 'dServer', message: '请选择发现服务',
                                }],
                            })(
                                <Select
                                    value={menuValue}
                                    onChange={this.menuChange.bind(this)}
                                >
                                    <Option value="廊坊发现纳管">廊坊发现纳管</Option>
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
                                // initialValue: fireWallInfo.supplier,
                                rules: [{
                                    required: true, message: '请选择供应商！',
                                }],
                            })(
                                <Select
                                    value={secondMenuValue}
                                    onChange={this.secondMenuChange.bind(this)}
                                >
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
            </Form>
        )
    }
}
const FireWallForm = Form.create<any>()(FireWallFormCls);

export default FireWallForm;