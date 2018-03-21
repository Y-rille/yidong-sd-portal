import * as React from 'react';
import * as _ from 'lodash';
import { Tooltip, Button, Form, Row, Col, Input, Spin } from 'antd';

const FormItem = Form.Item;

interface DynamicPropertiesCollapseFormProps {
    data: object;
    editData?
    loading?
}

class SetDynamicPropertiesCollapseForm extends React.PureComponent<DynamicPropertiesCollapseFormProps> {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            loading: false
        };
    }
    handleEdit() {
        if (this.state.isEdit) {
            let submitData = this.props.form.getFieldsValue()
            if (this.props.editData) {
                this.setState({
                    loading: true
                })
                this.props.editData(submitData, () => {
                    this.setState({
                        loading: false,
                        isEdit: false
                    })
                })
            }
        } else {
            this.setState({
                isEdit: true
            })
        }
        
    }
    handleReset = () => {
        this.props.form.resetFields();
      }

    componentDidMount() {
    }
    renderForm(data) {
        let self = this
        let items = []
        const { getFieldDecorator } = this.props.form;
        data.map((item, index) => {
            items.push(
                <Col span={8} key={index}>
                <FormItem wrapperCol={{offset: 1}} label={item.key}>
                {getFieldDecorator(`${item.physicalTablefield}`, {initialValue: item.values})(
                    item.editable && this.state.isEdit ? <Input readOnly={!this.state.isEdit}  
                    name={item.attributeName} /> : (item.values.length > 25 ? <Tooltip placement="topLeft" title={item.values} arrowPointAtCenter>
                        <p>{item.values.slice(0, 24)}...</p>
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
                                {this.state.isEdit ?  <Button style={{ marginLeft: 8 }} onClick={this.handleReset.bind(this)} 
                                    type="primary">
                                        重置
                                    </Button> : null}
                        </Col>
                        </Row> : null }
                    </Form>
                </Spin>
            )
        }
    }
}

const DynamicPropertiesCollapseForm = Form.create()(SetDynamicPropertiesCollapseForm)
export default DynamicPropertiesCollapseForm 