import React from 'react';
import styles from './index.less';
import { Form, Input, Button, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import _ from 'lodash'
import { FormComponentProps } from 'antd/lib/form/Form';

export interface MagneticTableClsProps extends FormComponentProps {
    getData?
    data?
}
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
};

class MagneticTableCls extends React.PureComponent<MagneticTableClsProps, any> {
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
        this.props.form.resetFields();
    }
    renderOptions(data) {
        return _.map(data, (item) => {
            return <Option value={item.value}>{item.text}</Option>
        })
    }
    render() {
        const { menuValue, secondMenuValue } = this.state;
        const { getFieldDecorator } = this.props.form;
        const { data } = this.props;
        const firstData = _.head(data);
        return (
            <Form className={styles.MagneticTable}>
                <Row>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="发现服务"
                        // hasFeedback
                        // required
                        >
                            {getFieldDecorator('server', {
                                initialValue: firstData.value,
                                rules: [{
                                    required: true, message: '请选择发现服务',
                                }],
                            })(
                                <Select>
                                    {this.renderOptions(data)}
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="用户名"
                        >
                            {getFieldDecorator('username', {
                                // initialValue: fireWallInfo.name,
                                rules: [{
                                    required: true, message: '请输入用户名！',
                                }],
                            })(
                                <Input placeholder="请输入用户名" />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="子网掩码"
                        >
                            {getFieldDecorator('subnetmask', {
                                // initialValue: fireWallInfo.name,
                                rules: [{
                                    required: true, message: '请输入子网掩码！',
                                }],
                            })(
                                <Input placeholder="请输入子网掩码" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="开始IP"
                        >
                            {getFieldDecorator('startip', {
                                rules: [{
                                    required: true, message: '请输入开始IP！',
                                }],
                            })(
                                <Input placeholder="请输入开始IP" />
                            )}
                        </Form.Item>
                        <FormItem
                            {...formItemLayout}
                            label="密码"
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: '请输入密码！',
                                }],
                            })(
                                <Input type="password" placeholder="请输入密码" />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="DNS"
                        >
                            {getFieldDecorator('dns', {

                                rules: [{
                                    required: false, message: '请输入DNS！',
                                }],
                            })(
                                <Input placeholder="请输入DNS" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="结束IP"
                        >
                            {getFieldDecorator('endip', {
                                rules: [{
                                    required: true, message: '请输入结束IP！',
                                }],
                            })(
                                <Input placeholder="请输入结束IP" />
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="网关"
                        >
                            {getFieldDecorator('gateway', {
                                // initialValue: fireWallInfo.protocol,
                                rules: [{
                                    required: true, message: '请输入网关！',
                                }],
                            })(
                                <Input placeholder="请输入网关" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" onClick={this.getData.bind(this)}>确定</Button>
                        <Button style={{ marginLeft: 10 }} onClick={this.handleReset.bind(this)}>重置</Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
const MagneticTable = Form.create<any>()(MagneticTableCls);

export default MagneticTable;