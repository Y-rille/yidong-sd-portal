import * as React from 'react';
import * as _ from 'lodash';
import { Button, Form, Row, Col, Input } from 'antd';

const FormItem = Form.Item;

interface DynamicPropertiesCollapseFormProps {
    data: object;
}

class SetDynamicPropertiesCollapseForm extends React.PureComponent<DynamicPropertiesCollapseFormProps> {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            isEdit: false
        };
    }
    handleEdit() {
        if (this.state.isEdit) {
            let dataaaaa = this.props.form.getFieldsValue()
            // console.log(dataaaaa, '==========>dataaaaaaaaa')
        }
        this.setState({
            isEdit: !this.state.isEdit
        })
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
        // console.log(data, '============>data')
        data.map((item, index) => {
            items.push(
                <Col span={8} key={index}>
                <FormItem label={item.key} >
                {getFieldDecorator(`${item.key}`, {initialValue: item.values})(
                    item.ediable && this.state.isEdit ? <Input readOnly={!this.state.isEdit} name={item.attributeName} /> : <p>{item.values}</p>
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
            return (
                <Form className="ant-advanced-search-form">
                    <Row gutter={24}>
                        {this.renderForm(this.props.data)}    
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'left' }}>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleEdit.bind(this)} type="primary">
                                {this.state.isEdit ? '保存' : '修改'}
                            </Button>
                            {this.state.isEdit ?  <Button style={{ marginLeft: 8 }} onClick={this.handleReset.bind(this)} 
                                type="primary">
                                    重置
                                </Button> : null}
                      </Col>
                    </Row>
                </Form>
            )
        }
    }
}

const DynamicPropertiesCollapseForm = Form.create()(SetDynamicPropertiesCollapseForm)
export default DynamicPropertiesCollapseForm 