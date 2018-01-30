import React from 'react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import { DatePicker, Input, Select, Button } from 'antd';
const  {RangePicker} = DatePicker;
const Option = Select.Option;

export interface TimeSelectProps {
    inquire?
}

export default class TimeSelect extends React.PureComponent<TimeSelectProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            longTime: [],
            selectValue: '.com'
        };
    }

    onRangePickerChange(value, dateString) {
        const { longTime } = this.state;
        this.setState({
            longTime: [value[0]._d.getTime(), value[1]._d.getTime()],
        })
    }

    onSelectChange(value) {
        const { selectValue } = this.state;
        this.setState({
            selectValue: value
        })
    }

    handleClick() {
        const { longTime, selectValue } = this.state;
        this.props.inquire(longTime, selectValue);
    }

    render() {
        return (
            <div style={{marginTop: '-11px'}}>
                <span style={{ marginLeft: 5 }}>创建时间：</span>
                <LocaleProvider locale={zh_CN}>
                <RangePicker
                    style={{ marginLeft: 10 }}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder={['开始时间', '结束时间']}
                    onChange={this.onRangePickerChange.bind(this)}
                />
                </LocaleProvider>
                <Select defaultValue=".com" style={{ width: 180, marginLeft: 10, marginRight: 10 }} onChange={this.onSelectChange.bind(this)}>
                    <Option value=".com">上周同一时间</Option>
                    <Option value=".jp">上月同一时间</Option>
                </Select>
                <Button type="primary" onClick={this.handleClick.bind(this)}>查询</Button>
            </div>
        )
    }
}