import * as React from 'react';
import * as _ from 'lodash';
import { Tooltip, Button, Form, Row, Col, Input, Spin } from 'antd';

const FormItem = Form.Item;

interface DynamicPropertiesCollapseFormProps {
    data: object;
    editData?
    loading?
}
const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
};
class SetDynamicPropertiesCollapseForm extends React.PureComponent<DynamicPropertiesCollapseFormProps> {
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
        // this.props.form.resetFields();
    }

    componentDidMount() {
    }
    renderForm(data) {
        let self = this
        let items = []
        const { getFieldDecorator } = this.props.form;
        data.map((item, index) => {
            items.push(
                <Col span={12} key={index}>
                    <FormItem {...formItemLayout} label={item.key}>
                        {getFieldDecorator(`${item.physicalTablefield}`, {
                            initialValue: item.values, rules: [
                                {
                                    required: true, message: '输入不能为空!',
                                }]
                        })(
                            item.editable && this.state.isEdit ? <Input readOnly={!this.state.isEdit}
                                name={item.attributeName} /> : (item.values.length > 25 ? <Tooltip placement="topLeft" title={item.values} arrowPointAtCenter>
                                    <p style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.values}</p>
                                </Tooltip> : <p>{item.values}</p>)
                        )}
                    </FormItem>
                </Col>
            )
        })
        return items;
    }
    render() {
        // console.log(this.state.ediable, '=======>this.state.ediable')
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
                            <Col span={24} style={{ textAlign: 'left' }}>
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