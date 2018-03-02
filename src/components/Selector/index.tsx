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
    actions
    getData
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
    getOptions() {
        let { type, actions, data } = this.props
        if (!data) {
            this.props.actions.getSubDataByName(type)
        }
    }
    renderOptions() {
        let { data } = this.props
        return _.map(data, (item) => {
            return <Option value={item.value}>{item.text}</Option>
        })
    }
    render() {
        let { type } = this.props
        return (
            <Select onFocus={this.getOptions.bind(this)} onChange={this.changeHandle.bind(this)} placeholder={`请选择${type}`}>
                {this.renderOptions()}
            </Select >
        );
    }
}