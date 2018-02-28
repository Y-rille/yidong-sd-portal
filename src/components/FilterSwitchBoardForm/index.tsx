import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import styles from './index.less';
import { Row, Col, Form, Select, Input, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
declare let global: any;

export interface FilterSwitchBoardFormProps {
    form
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
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
            }
        });
    }
    handleReset() {
        this.props.form.resetFields();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className={styles.filter_switchboard_form}>
                <Row>
                    <Col span={8}>
                        <FormItem label="发现服务" {...formItemLayout}>
                            {getFieldDecorator('findService', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                                initialValue: 'langfang'
                            })(
                                <Select>
                                    <Option value="langfang">廊坊发现纳管</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="供应商" {...formItemLayout}>
                            {getFieldDecorator('supplier', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                                initialValue: 'huawei'
                            })(
                                <Select>
                                    <Option value="huawei">华为</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="设备类型" {...formItemLayout}>
                            {getFieldDecorator('equipmentType', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                                initialValue: 'IPSwitchBoard'
                            })(
                                <Select>
                                    <Option value="IPSwitchBoard">IP交换机</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="设备IP" {...formItemLayout}>
                            {getFieldDecorator('equipmentIP', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                                initialValue: ''
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="用户名" {...formItemLayout}>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                                initialValue: ''
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="密码" {...formItemLayout}>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                                initialValue: ''
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <FormItem label="协议" {...formItemLayout}>
                            {getFieldDecorator('protocol', {
                                rules: [{ message: 'Please input your note!' }],
                                initialValue: ''
                            })(
                                <Input />
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