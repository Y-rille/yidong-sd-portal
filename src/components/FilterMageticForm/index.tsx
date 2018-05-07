import React from 'react';
import styles from './index.less';
import { Form, Input, Button, Select, Row, Col, Cascader } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import _ from 'lodash'
import { FormComponentProps } from 'antd/lib/form/Form';

export interface MagneticTableClsProps extends FormComponentProps {
    getData?
    data?
    subDataVendor?
    subDataCenter?
}
const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
};

class MagneticTableCls extends React.PureComponent<MagneticTableClsProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            datacenter: ''
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
    getCascaderData(type, value) {
        let { datacenter } = this.state
        this.setState({
            datacenter: type === 'DataCenter' ? value : datacenter,
        })
    }
    handleReset() {
        this.props.form.resetFields();
    }
    renderOptions(data) {
        return _.map(data, (item) => {
            return <Option value={item.value}>{item.text}</Option>
        })
    }
    renderVendorOptions() {
        let { subDataVendor } = this.props
        return _.map(subDataVendor, (item) => {
            return <Option value={item.value}>{item.text}</Option>
        })
    }
    render() {
        const { menuValue, secondMenuValue, datacenter } = this.state;
        const { getFieldDecorator } = this.props.form;
        const { data, subDataVendor, subDataCenter } = this.props;
        const firstData = _.head(data);
        let subDataVendorDefault = (subDataVendor ? _.head(subDataVendor) : '') ? _.head(subDataVendor).text : ''
        return (
            <Form className={styles.MagneticTable}>
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem label="供应商" {...formItemLayout}>
                            {getFieldDecorator('provider', {
                                rules: [{ required: true, message: '请输入供应商！' }],
                                initialValue: subDataVendorDefault
                            })(
                                <Select>
                                    {this.renderVendorOptions()}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="开始IP" {...formItemLayout}
                        >
                            {getFieldDecorator('startip', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请输入开始IP!',
                                }],
                            })(
                                <Input placeholder="请输入开始IP" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="结束IP" {...formItemLayout}>
                            {getFieldDecorator('endip', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请输入结束IP!',
                                }],
                            })(
                                <Input placeholder="请输入结束IP" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="Provider IP"
                        >
                            {getFieldDecorator('providerip', {
                                rules: [{
                                    required: true, message: '请输入Provider IP!',
                                }],
                            })(
                                <Input placeholder="请输入Provider IP" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="Provider用户名"
                        >
                            {getFieldDecorator('providerusername', {
                                rules: [{
                                    required: true, message: '请输入Provider用户名!',
                                }],
                            })(
                                <Input placeholder="请输入Provider用户名" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="Provider密码"
                        >
                            {getFieldDecorator('providerpassword', {
                                rules: [{
                                    required: true, message: '请输入Provider密码!',
                                }],
                            })(
                                <Input type="password" placeholder="请输入Provider密码" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="Provider命名空间"
                        >
                            {getFieldDecorator('providernamespace', {
                                rules: [{
                                    required: true, message: '请输入Provider命名空间!',
                                }],
                            })(
                                <Input placeholder="请输入Provider命名空间" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="数据中心"
                        >
                            {getFieldDecorator('datacenter', {
                                rules: [{
                                    required: true, message: '请选择！',
                                }],
                            })(
                                <Cascader
                                    value={datacenter}
                                    options={this.props.subDataCenter}
                                />

                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="安装U位"
                        >
                            {getFieldDecorator('slot', {
                            })(
                                <Input placeholder="请输入安装U位" />
                            )}
                        </FormItem>
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