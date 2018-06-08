import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Form, Input, Button, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import { FormComponentProps } from 'antd/lib/form/Form';
import styles from './index.less';

declare let global: any;

export interface PimEditProps extends FormComponentProps {
    data?
    dict?
    dictOptions?
}
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
class PimEditCls extends React.PureComponent<PimEditProps, any> {
    constructor(props) {
        super(props);
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
        return data
    }
    handleReset() {
        this.props.form.resetFields()
    }
    renderOptions(data) {
        return _.map(data, (item) => {
            return <Option value={item}>{item}</Option>
        })
    }
    renderFormItem() {
        let { data, dict, dictOptions } = this.props
        const { getFieldDecorator } = this.props.form;
        let dictOptions_fix = _.keyBy(dictOptions, 'dictName')
        return _.map(data, (item) => {

            return (
                <Row>
                    <Col>
                        <Form.Item
                            {...formItemLayout}
                            label={item.key}
                            hasFeedback
                        >
                            {getFieldDecorator(`${item.physicalTablefield}`, {
                                initialValue: '',
                                rules: [],
                            })(
                                dict.indexOf(item.physicalTablefield) > -1 && dictOptions_fix[item.physicalTablefield] ?
                                    <Select>{this.renderOptions(dictOptions_fix[item.physicalTablefield].dictItems)}</Select> :
                                    <Input placeholder="请输入" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            )

        })
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