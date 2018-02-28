import React from 'react';
import styles from './index.less';
import { Form, Input, Button, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import { FormComponentProps } from 'antd/lib/form/Form';

export interface MagneticTableClsProps extends FormComponentProps {

}
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
};

class MagneticTableCls extends React.PureComponent<MagneticTableClsProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            // menuValue: '廊坊发现纳管',
            // secondMenuValue: 'H3C'
        }
    }
    // menuChange(value) {
    //     this.setState({
    //         menuValue: value
    //     })
    // }
    // secondMenuChange(value) {
    //     this.setState({
    //         secondMenuValue: value
    //     })
    // }
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
                                // value={menuValue}
                                // defaultValue="廊坊发现纳管"
                                // onChange={this.menuChange.bind(this)}
                                >
                                    <Option value="廊坊发现纳管">廊坊发现纳管</Option>
                                    <Option value="发现纳管">发现纳管</Option>
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
                        <Form.Item
                            {...formItemLayout}
                            label="子网掩码"
                        >
                            {getFieldDecorator('name', {
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
                            {getFieldDecorator('supplier', {
                                initialValue: '请输入开始IP',
                                rules: [{
                                    required: true, message: '请输入开始IP！',
                                }],
                            })(
                                <Input placeholder="请输入子网掩码" />
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
                        <FormItem
                            {...formItemLayout}
                            label="DNS"
                        >
                            {getFieldDecorator('password', {
                                // initialValue: fireWallInfo.password,
                                rules: [{
                                    required: false, message: '请输入DNS！',
                                }],
                            })(
                                <Input type="password" placeholder="请输入DNS" />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="结束IP"
                        >
                            {getFieldDecorator('ip', {
                                // initialValue: fireWallInfo.ip,
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
                            {getFieldDecorator('protocol', {
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
            </Form>
        )
    }
}
const MagneticTable = Form.create<any>()(MagneticTableCls);

export default MagneticTable;