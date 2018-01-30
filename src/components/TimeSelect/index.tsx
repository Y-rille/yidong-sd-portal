import React from 'react';
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
            longTime: []
        };
    }

    onChange(value, dateString) {
        const { longTime } = this.state;
        this.setState({
            longTime: [value[0]._d.getTime(), value[1]._d.getTime()]
        })
    }

    handleClick() {
        const { longTime } = this.state;
        this.props.inquire(longTime);
    }

    render() {
        return (
            <div>
                <form>
                    <span>创建时间：</span>
                    <RangePicker
                        showTime={{ format: 'YYYY-MM-DD HH:mm' }}
                        format="YYYY-MM-DD HH:mm:ss"
                        placeholder={['开始时间', '结束时间']}
                        onChange={this.onChange.bind(this)}
                    />
                    &nbsp;&nbsp;
                 <Select defaultValue=".com" style={{ width: 180 }}>
                        <Option value=".com">上周同一时间</Option>
                        <Option value=".jp">.jp</Option>
                        <Option value=".cn">.cn</Option>
                        <Option value=".org">.org</Option>
                    </Select>
                    &nbsp;&nbsp;
                    <Button type="primary" onClick={this.handleClick.bind(this)}>查询</Button>
                </form>
            </div>
        )
    }
}