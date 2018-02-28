import React from 'react';
import { Form, Row, Col, Input, Button, Icon, Select } from 'antd';
import styles from './index.less'
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
            <div className={styles.MagneticTable}>
                <Form
                    onSubmit={this.handleSubmit.bind(this)}
                >
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem>
                                <label>*发现服务:</label>
                                <Select>
                                    <Option value="first">廊坊发电纳管</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                <label>*开始IP:</label>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                <label>*结束IP:</label>
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem>
                                <label>*用户名:</label>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                <label>*密码:</label>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                <label>*网关:</label>
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={8}>
                            <FormItem>
                                <label>*子网掩码:</label>
                                <Input />
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                <label>DNS:</label>
                                <Input />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}