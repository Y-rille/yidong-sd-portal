import React from 'react';
import { LocaleProvider } from 'antd';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import { DatePicker, Input, Select, Button } from 'antd';
const { RangePicker } = DatePicker;
const Option = Select.Option;

export interface TimeSelectProps {
    inquire?
}

export default class TimeSelect extends React.PureComponent<TimeSelectProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            longTime: [],
            selectValue: '',
        };
    }

    onRangePickerChange(value, dateString) {
        const { longTime } = this.state;
        this.setState({
            longTime: [value[0]._d.getTime(), value[1]._d.getTime()],
            values: value
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
        if (longTime[1] > Number(moment().format('X')) * 1000) {
            alert('结束时间不能大于当前时间，请重新选择时间！');
            return;
        }
        this.props.inquire(longTime, selectValue);
    }

    disabledDate(dateCurrent) {
        return dateCurrent && dateCurrent > moment().endOf('day');
    }

    render() {
        return (
            <div style={{ marginTop: '-11px' }}>
                <span style={{ marginLeft: 5 }}>创建时间：</span>
                <LocaleProvider locale={zh_CN}>
                    <RangePicker
                        style={{ marginLeft: 10 }}
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={this.disabledDate}
                        showTime
                        placeholder={['开始时间', '结束时间']}
                        onChange={this.onRangePickerChange.bind(this)}
                    />
                </LocaleProvider>
                <Select defaultValue="" style={{ width: 180, marginLeft: 10, marginRight: 10 }} onChange={this.onSelectChange.bind(this)}>
                    <Option value="">无</Option>
                    <Option value="sameWeek">上周同一时间</Option>
                    <Option value="sameMonth">上月同一时间</Option>
                </Select>
                <Button type="primary" onClick={this.handleClick.bind(this)}>查询</Button>
            </div>
        )
    }
}