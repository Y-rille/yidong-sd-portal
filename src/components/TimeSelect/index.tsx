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
            selectValue: 'nothing',
            values: moment()
        };
    }

    onRangePickerChange(value, dateString) {
        const { longTime, values } = this.state;
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
        this.props.inquire(longTime, selectValue);
    }

    disabledDate(dateCurrent) {
        return dateCurrent && dateCurrent > moment().endOf('day');
    }

    range(start, end) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledTime(currentHour, currentMinute, currentSecond) {
        const { values } = this.state;
        currentHour = Number(moment().format('hh')) + 12 + 1;
        currentMinute = Number(moment().format('mm')) + 1;
        currentSecond = Number(moment().format('ss')) + 1;

        return {
            disabledHours: () => this.range(currentHour, 24),
            disabledMinutes: () => this.range(currentMinute, 60),
            disabledSeconds: () => this.range(currentSecond, 60)
        }
    }

    render() {
        return (
            <div style={{ marginTop: '-11px' }}>
                <span style={{ marginLeft: 5 }}>创建时间：</span>
                <LocaleProvider locale={zh_CN}>
                    <RangePicker
                        style={{ marginLeft: 10 }}
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={this.disabledDate.bind(this)}
                        disabledTime={this.disabledTime.bind(this)}
                        showTime={{
                            hideDisabledOptions: true,
                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                        }}
                        placeholder={['开始时间', '结束时间']}
                        onChange={this.onRangePickerChange.bind(this)}
                    />
                </LocaleProvider>
                <Select defaultValue="nothing" style={{ width: 180, marginLeft: 10, marginRight: 10 }} onChange={this.onSelectChange.bind(this)}>
                    <Option value="nothing">无</Option>
                    <Option value="sameWeek">上周同一时间</Option>
                    <Option value="sameMonth">上月同一时间</Option>
                </Select>
                <Button type="primary" onClick={this.handleClick.bind(this)}>查询</Button>
            </div>
        )
    }
}