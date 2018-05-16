import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Select } from 'antd';
const Option = Select.Option;
import styles from './index.less';

declare let global: any;

export interface SelectorProps {
    type
    data
    getData
    value?
}

export default class Selector extends React.PureComponent<SelectorProps, any> {
    constructor(props) {
        super(props);
    }
    changeHandle(value) {
        let { type, getData } = this.props
        if (getData) {
            getData(type, value)
        }
    }
    renderOptions() {
        let { type, data } = this.props
        return _.map(data, (item) => {
            return <Option value={type === 'Project' ? item.text : item.value}>{item.text}</Option>
        })
    }
    render() {
        let { type, value } = this.props
        type = type === 'Project' ? '租户' : type
        return (
            <Select defaultValue={value} onChange={this.changeHandle.bind(this)}>
                <Option value="">{`请选择${type}`}</Option>
                {this.renderOptions()}
            </Select >
        );
    }
}