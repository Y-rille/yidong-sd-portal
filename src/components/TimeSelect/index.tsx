import React from 'react';
import { LocaleProvider } from 'antd';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import emitter from '../../common/emitter'

import { DatePicker, Input, Select, Button } from 'antd';
const { RangePicker } = DatePicker;
const Option = Select.Option;

export interface TimeSelectProps {
    inquire?
    defaultValue?
    timeFilter?
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
            emitter.emit('message', 'warning', '结束日期不能大于当前日期，请重新选择！')
            return;
        }
        this.props.inquire(longTime, selectValue);
    }

    disabledDate(dateCurrent) {
        return dateCurrent && dateCurrent > moment().endOf('day');
    }

    render() {
        var dateformat = 'YYYY-MM-DD HH:mm:ss';
        const date = [moment(this.props.defaultValue[0]).format('YYYY-MM-DD HH:mm:ss'), moment(this.props.defaultValue[1]).format('YYYY-MM-DD HH:mm:ss')]
        const selectDate = this.props.defaultValue[2] == null ? '' : this.props.defaultValue[2].toString()
        const timeFilter = this.props.timeFilter;
        return (
            <div>
                <span>创建时间：</span>
                <LocaleProvider locale={zh_CN}>
                    <RangePicker
                        style={{ marginLeft: 10 }}
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={this.disabledDate}
                        defaultValue={[moment(date[0], dateformat), moment(date[1], dateformat)]}
                        showTime
                        placeholder={['开始时间', '结束时间']}
                        onChange={this.onRangePickerChange.bind(this)}
                    />
                </LocaleProvider>
                <Select defaultValue={selectDate} style={{ width: 180, marginLeft: 10, marginRight: 10 }} onChange={this.onSelectChange.bind(this)}>
                    <Option value="">无</Option>
                    {
                        timeFilter.map((item, index) => {
                            return (
                                <Option key={index} value={item.timeFilterId.toString()}>{item.timeFilterName}</Option>
                            )
                        })
                    }
                </Select>
                <Button type="primary" onClick={this.handleClick.bind(this)}>查询</Button>
            </div>
        )
    }
}