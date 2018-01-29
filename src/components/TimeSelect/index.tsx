import React from 'react';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export interface TimeSelectProps {

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

    getTimeForMs() {
        const { longTime } = this.state;
        return longTime;
    }

    onOk(value) {
        // console.log('onOk: ', value);
    }

    render() {
        return (
            <div>
                <RangePicker
                    showTime={{ format: 'YYYY-MM-DD HH:mm' }}
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder={['Start Time', 'End Time']}
                    onChange={this.onChange}
                    onOk={this.onOk}
                />
            </div>
        )
    }
}