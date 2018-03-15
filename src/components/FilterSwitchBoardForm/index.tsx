import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import styles from './index.less';
import '../../style/antd.aless'
import { Row, Col, Form, Select, Input, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
declare let global: any;

export interface FilterSwitchBoardFormProps {
    form
    getData
    subDataPIM?
    subDataSwitchType?
    subDataVendor?
}

/**
 * 指标添加
 * 
 * @export
 * @class FilterSwitchBoardForm
 * @extends {React.PureComponent<FilterSwitchBoardFormProps, any>}
 */

const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
class FilterSwitchBoardFormCls extends React.PureComponent<FilterSwitchBoardFormProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let self = this;
        self.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                values.type = 'switchtype';
                self.props.getData(values);
            }
        });
    }
    handleReset() {
        this.props.form.resetFields();
    }
    renderPIMOptions() {
        let { subDataPIM } = this.props
        return _.map(subDataPIM, (item) => {
            return <Option value={item.value}>{item.text}</Option>
        })
    }
    renderVendorOptions() {
        let { subDataVendor } = this.props
        return _.map(subDataVendor, (item) => {
            return <Option value={item.value}>{item.text}</Option>
        })
    }
    renderSwitchOptions() {
        let { subDataSwitchType } = this.props
        return _.map(subDataSwitchType, (item) => {
            return <Option value={item.value}>{item.text}</Option>
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let { subDataPIM, subDataSwitchType, subDataVendor } = this.props;
        let subDataPIMDefault = (subDataPIM ? _.head(subDataPIM) : '') ? _.head(subDataPIM).text : ''
        let subDataVendorDefault = (subDataVendor ? _.head(subDataVendor) : '') ? _.head(subDataVendor).text : ''
        let subDataSwitchDefault = (subDataSwitchType ? _.head(subDataSwitchType) : '') ? _.head(subDataSwitchType).text : ''
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="filterSwitchBoardForm">
                <Row>
                    <Col span={8}>
                        <FormItem label="发现服务" {...formItemLayout}>
                            {getFieldDecorator('server', {
                                rules: [{ required: true, message: '请输入发现服务！' }],
                                initialValue: subDataPIMDefault
                            })(
                                <Select>
                                    {this.renderPIMOptions()}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
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
                        <FormItem label="设备类型" {...formItemLayout}>
                            {getFieldDecorator('devicetype', {
                                rules: [{ required: true, message: '请输入设备类型！' }],
                                initialValue: subDataSwitchDefault
                            })(
                                <Select>
                                    {this.renderSwitchOptions()}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="设备IP" {...formItemLayout}>
                            {getFieldDecorator('deviceip', {
                                rules: [{ required: true, message: '请输入设备IP！' }],
                                initialValue: ''
                            })(
                                <Input placeholder="请输入设备IP" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="用户名" {...formItemLayout}>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名！' }],
                                initialValue: ''
                            })(
                                <Input placeholder="请输入用户名" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="密码" {...formItemLayout}>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码！' }],
                                initialValue: ''
                            })(
                                <Input placeholder="请输入密码" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="协议" {...formItemLayout}>
                            {getFieldDecorator('protocol', {
                                initialValue: ''
                            })(
                                <Input placeholder="请输入协议" />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <div style={{ textAlign: 'right' }}>
                    <Button style={{ marginRight: '10px' }} type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
                    <Button onClick={this.handleReset.bind(this)}>重置</Button>
                </div>
            </Form>
        );
    }
}
const FilterSwitchBoardForm = Form.create()(FilterSwitchBoardFormCls);

export default FilterSwitchBoardForm;