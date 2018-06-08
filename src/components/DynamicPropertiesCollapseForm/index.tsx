import * as React from 'react';
import * as _ from 'lodash';
import { Tooltip, Button, Form, Row, Col, Input, Spin, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

interface DynamicPropertiesCollapseFormProps {
    data: object
    editData?
    loading?
    form?
    dict?
    dictOptions?
}
const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
};
class SetDynamicPropertiesCollapseForm extends React.PureComponent<DynamicPropertiesCollapseFormProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            loading: false
        };
    }
    handleEdit() {
        let fmtdata = _.map(_.filter(this.props.data, (o) => {
            return o.editable === 1
        }), 'physicalTablefield')
        if (this.state.isEdit) {
            let submitData = _.pick(this.props.form.getFieldsValue(), fmtdata)
            if (this.props.editData) {
                this.setState({
                    loading: true
                })
                this.props.editData(submitData, () => {
                    this.setState({
                        loading: false,
                        isEdit: false
                    })
                    this.handleCancle()
                })
            }
        } else {
            this.setState({
                isEdit: true
            })
        }

    }
    handleCancle = () => {
        this.setState({
            isEdit: false
        })
        this.props.form.resetFields();
    }

    componentDidMount() {
    }
    renderOptions(data) {
        return _.map(data, (item) => {
            return <Option value={item}>{item}</Option>
        })
    }
    renderForm(data) {
        let items = []
        const { getFieldDecorator } = this.props.form;
        let { dict, dictOptions } = this.props
        let dictOptions_fix = _.keyBy(dictOptions, 'dictName')
        return data.map((item, index) => {
            if (item.editable && this.state.isEdit) {
                // 编辑状态
                if (dict.indexOf(item.physicalTablefield) > -1 && dictOptions_fix[item.physicalTablefield]) {
                    return (
                        <Col span={12} key={index}>
                            <FormItem {...formItemLayout} label={item.key}>
                                {getFieldDecorator(`${item.physicalTablefield}`, {
                                    initialValue: item.values, rules: [
                                        {
                                            required: true, message: '输入不能为空!',
                                        }]
                                })(
                                    <Select>{this.renderOptions(dictOptions_fix[item.physicalTablefield].dictItems)}</Select>
                                )}
                            </FormItem>
                        </Col>
                    )
                } else {
                    return (
                        <Col span={12} key={index}>
                            <FormItem {...formItemLayout} label={item.key}>
                                {getFieldDecorator(`${item.physicalTablefield}`, {
                                    initialValue: item.values, rules: [
                                        {
                                            required: true, message: '输入不能为空!',
                                        }]
                                })(
                                    <Input readOnly={!this.state.isEdit} name={item.attributeName} />
                                )}
                            </FormItem>
                        </Col>
                    )
                }
            } else {
                // 展示状态
                return (
                    <Col span={12} key={index}>
                        <FormItem {...formItemLayout} label={item.key}>
                            {getFieldDecorator(`${item.physicalTablefield}`, {
                                initialValue: item.values, rules: [
                                    {
                                        required: true, message: '输入不能为空!',
                                    }]
                            })(
                                item.values.length > 25 ?
                                    (<Tooltip placement="top" title={item.values} arrowPointAtCenter>
                                        <p style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.values}</p>
                                    </Tooltip>) :
                                    <p>{item.values}</p>
                            )}
                        </FormItem>
                    </Col>
                )
            }
        })
    }
    render() {
        if (this.props.data) {
            let isEditor = false;
            if (_.find(this.props.data, { editable: 1 })) {
                isEditor = true;
            }
            return (
                <Spin spinning={this.state.loading}>
                    <Form className="ant-advanced-search-form">
                        <Row gutter={24}>
                            {this.renderForm(this.props.data)}
                        </Row>
                        {isEditor ? <Row>
                            <Col span={24} style={{ marginTop: '10px', textAlign: 'right' }}>
                                <Button style={{ marginLeft: 8 }} onClick={this.handleEdit.bind(this)} type="primary">
                                    {this.state.isEdit ? '保存' : '修改'}
                                </Button>
                                {this.state.isEdit ? <Button style={{ marginLeft: 8 }} onClick={this.handleCancle.bind(this)}
                                    type="primary">
                                    取消
                                    </Button> : null}
                            </Col>
                        </Row> : null}
                    </Form>
                </Spin>
            )
        }
    }
}

const DynamicPropertiesCollapseForm = Form.create()(SetDynamicPropertiesCollapseForm)
export default DynamicPropertiesCollapseForm 