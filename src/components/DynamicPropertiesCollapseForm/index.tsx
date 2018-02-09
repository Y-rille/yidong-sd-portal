import * as React from 'react';
import * as _ from 'lodash';
import { Tooltip, Button, Form, Row, Col, Input } from 'antd';

const FormItem = Form.Item;

interface DynamicPropertiesCollapseFormProps {
    data: object;
}

class SetDynamicPropertiesCollapseForm extends React.PureComponent<DynamicPropertiesCollapseFormProps> {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        };
    }
    handleEdit() {
        if (this.state.isEdit) {
            let submitData = this.props.form.getFieldsValue()
            let editedData = this.props.data
            _.forOwn(submitData, (value, key) => {
                let _index = _.findIndex(this.props.data, item => (item.key === key))
                editedData[_index].values = value
            })
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
        data.map((item, index) => {
            items.push(
                <Col span={8} key={index}>
                <FormItem label={item.key} >
                {getFieldDecorator(`${item.key}`, {initialValue: item.values})(
                    item.ediable && this.state.isEdit ? <Input readOnly={!this.state.isEdit}  
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
            if (_.find(this.props.data, { ediable: 1 })) {
                isEditor = true;
            }
            return (
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
            )
        }
    }
}

const DynamicPropertiesCollapseForm = Form.create()(SetDynamicPropertiesCollapseForm)
export default DynamicPropertiesCollapseForm 