import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, Input, Button, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
import { FormComponentProps } from 'antd/lib/form/Form';
import styles from './index.less';

declare let global: any;

export interface PimEditProps extends FormComponentProps {
    data?
}
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
class PimEditCls extends React.PureComponent<PimEditProps, any> {
    constructor(props) {
        super(props);
    }
    renderFormItem() {
        let { data } = this.props
        const { getFieldDecorator } = this.props.form;
        return (
            <Row>
                <Col>
                    <Form.Item
                        {...formItemLayout}
                        label={data.key}
                        hasFeedback
                        required
                    >
                        {getFieldDecorator(`${data.physicalTablefield}`, {
                            initialValue: '',
                            rules: [{

                            }],
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </Form.Item>
                </Col>
            </Row>
        )
    }
    render() {
        let { data } = this.props
        return (
            <Form className={styles.pimEdit}>
                {this.renderFormItem()}
            </Form>
        );
    }
}

const PimEdit = Form.create<any>()(PimEditCls);

export default PimEdit;