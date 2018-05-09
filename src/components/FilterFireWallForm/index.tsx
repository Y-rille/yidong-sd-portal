import React from 'react';
import styles from './index.less';
import { Form, Input, Button, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import { FormComponentProps } from 'antd/lib/form/Form';
import * as _ from 'lodash';

export interface FilterFireWallFormClsProps extends FormComponentProps {
    getData?
    subDataPIM?
    subDataVendor?
}
const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
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
    renderServerOptions(data) {
        return _.map(data, (item) => {
            return <Option value={item['value']}>{item['text']}</Option>
        })
    }
    renderProviderOptions(data) {
        return _.map(data, (item) => {
            return <Option value={item['value']}>{item['text']}</Option>
        })
    }
    render() {
        // let fireWallInfo = this.props.data || ''
        const { menuValue, secondMenuValue } = this.state;
        const { getFieldDecorator } = this.props.form;
        const { subDataPIM, subDataVendor } = this.props
        const firstServerValue = _.head(subDataPIM)['text'];
        const firstProviderValue = _.head(subDataVendor)['text'];
        return (
            <Form className={styles.filterFireWallForm}>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="发现服务"
                        >
                            {getFieldDecorator('server', {
                                initialValue: firstServerValue,
                                rules: [{
                                    required: true, message: '请选择发现服务',
                                }],
                            })(
                                <Select>
                                    {this.renderServerOptions(subDataPIM)}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="供应商"
                        >
                            {getFieldDecorator('vendor', {
                                initialValue: firstProviderValue,
                                rules: [{
                                    required: true, message: '请选择供应商！',
                                }],
                            })(
                                <Select
                                >
                                    {this.renderProviderOptions(subDataVendor)}
                                </Select>
                            )}
                        </Form.Item>
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
                </Row>
                <Row gutter={24}>
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
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="协议"
                        >
                            {getFieldDecorator('protocol', {
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