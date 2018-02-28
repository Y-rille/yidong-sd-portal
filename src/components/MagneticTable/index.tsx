import React from 'react';
import { Form, Row, Col, Input, Button, Icon, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
export interface MagneticTableProps {

}

export default class MagneticTable extends React.PureComponent<MagneticTableProps, any> {
    constructor(props) {
        super(props);
    }

    handleSubmit() {

    }
    render() {
        return (
            <div>
                <Form
                    onSubmit={this.handleSubmit.bind(this)}
                >
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem>
                                <label>*发现服务</label>
                                <Select>
                                    <Option value="first">廊坊发电纳管</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}