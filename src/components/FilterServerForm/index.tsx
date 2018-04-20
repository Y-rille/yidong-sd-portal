import React from 'react';
import { Form, Input, Select, Row, Col, Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
import styles from './index.less';
import _ from 'lodash'
import { FormComponentProps } from 'antd/lib/form/Form';

export interface FilterServerFormClsProps extends FormComponentProps {
    data?
    getData?
}
const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
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
    renderOptions(data) {
        return _.map(data, (item) => {
            return <Option value={item.value}>{item.text}</Option>
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { data } = this.props;
        const firstData = _.head(data);
        return (
            <Form className="filterServerForm">
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="发现服务"
                        >
                            {getFieldDecorator('server', {
                                initialValue: firstData.value,
                                rules: [{
                                    required: true,
                                }],
                            })(
                                <Select style={{ width: '100%' }} >
                                    {this.renderOptions(data)}
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                            label="开始IP"
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
                        <Form.Item
                            {...formItemLayout}
                            label="结束IP"
                        >
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
                            label="子网掩码"
                        >
                            {getFieldDecorator('subnetmask', {
                                initialValue: '',
                                rules: [{
                                    required: true, message: '请输入子网掩码!',
                                }],
                            })(
                                <Input placeholder="请输入子网掩码" />
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
                                <Input placeholder="请输入DNS" />
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
                                    required: true, message: '请输入网关!',
                                }],
                            })(
                                <Input placeholder="请输入网关" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <div className={styles.btn}>
                    <Button className={styles.btn_ok} type="primary" onClick={this.getData.bind(this)}>确定</Button>
                    <Button onClick={this.resetForm.bind(this)}>重置</Button>
                </div>
            </Form>
        )
    }

}

const FilterServerForm = Form.create<any>()(FilterServerFormCls);

export default FilterServerForm;