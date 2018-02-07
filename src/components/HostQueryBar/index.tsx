import React from 'react';
import { Select, Button } from 'antd';
const Option = Select.Option;

export interface HostQueryBarProps {

}

export default class HostQueryBar extends React.PureComponent<HostQueryBarProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            menuValue: '1',
            secondMenuValue: '1',
            thiredMenuValue: '1'
        };
    }

    menuChange(value) {
        const { menuValue } = this.state;
        this.setState({
            menuValue: value
        })
    }

    secondMenuChange(value) {
        const { secondMenuValue } = this.state;
        this.setState({
            secondMenuValue: value
        })
    }

    thiredMenuChange(value) {
        const { thiredMenuValue } = this.state;
        this.setState({
            thiredMenuValue: value
        })
    }

    handleClick() {
        const { menuValue, secondMenuValue, thiredMenuValue } = this.state;
        // console.log("selectValue:", menuValue, secondMenuValue, thiredMenuValue)
    }

    render() {
        const { menuValue, secondMenuValue, thiredMenuValue } = this.state;
        return (
            <div style={{ marginBottom: 20 }}>
                <Select
                    value={menuValue}
                    onChange={this.menuChange.bind(this)}
                    style={{ width: 120 }}>
                    <Option value="1">H1</Option>
                    <Option value="2">H2</Option>
                    <Option value="3">H3</Option>
                </Select>

                <Select
                    value={secondMenuValue}
                    onChange={this.secondMenuChange.bind(this)}
                    style={{ width: 120, marginLeft: 10 }}>
                    <Option value="1">K1</Option>
                    <Option value="2">K2</Option>
                    <Option value="3">K3</Option>
                </Select>

                <Select
                    value={thiredMenuValue}
                    onChange={this.thiredMenuChange.bind(this)}
                    style={{ width: 120, marginLeft: 10 }}>
                    <Option value="1">Z1</Option>
                    <Option value="2">Z2</Option>
                    <Option value="3">Z3</Option>
                </Select>

                <Button
                    type="primary"
                    style={{ marginLeft: 10 }}
                    onClick={this.handleClick.bind(this)}
                >
                    查询
                </Button>
            </div>
        )
    }
}