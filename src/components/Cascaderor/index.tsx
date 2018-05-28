import * as React from 'react';
import * as _ from 'lodash';
import { Cascader } from 'antd';
export interface CascaderProps {
    data?,
    getCascaderData?,
    type?,
    style?,
    value?,
}
export default class Cascaderor extends React.PureComponent<CascaderProps, any> {
    constructor(props) {
        super(props);
    }
    onChangeDataCenter(value) {
        let { type, getCascaderData } = this.props
        if (getCascaderData) {
            getCascaderData(type, value)
        }
    }
    render() {
        let { value, style, data } = this.props
        return (
            <Cascader
                value={value}
                style={style}
                options={data}
                onChange={this.onChangeDataCenter.bind(this)}
                placeholder={this.props.type === 'DataCenter' ? '数据中心' : '供应商'}
            />
        )
    }
}
