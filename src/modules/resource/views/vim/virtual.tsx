import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import VirtualInfo from '../../container/vim/virtualInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select } from 'antd';
import styles from '../../style/index.less'
const Option = Select.Option;
class Virtual extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            menuValue: 'region',
            secondMenuValue: 'az',
            thiredMenuValue: 'ha',
            fourthMenuValue: 'host'
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/virtual/info`)
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

    fourthMenuChange(value) {
        const { fourthMenuValue } = this.state;
        this.setState({
            fourthMenuValue: value
        })
    }
    handleClick() {
        const { menuValue, secondMenuValue, thiredMenuValue, fourthMenuValue } = this.state;
        // console.log("selectValue:", menuValue, secondMenuValue, thiredMenuValue)
    }
    render() {
        let { match } = this.props;
        const { menuValue, secondMenuValue, thiredMenuValue, fourthMenuValue } = this.state;
        return (
            <Switch>
                <Route path={`${match.url}/info`} component={VirtualInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>虚拟机列表</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>虚拟机列表</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Select
                                    value={menuValue}
                                    onChange={this.menuChange.bind(this)}
                                    style={{ width: 120 }}>
                                    <Option value="region">Region</Option>
                                </Select>

                                <Select
                                    value={secondMenuValue}
                                    onChange={this.secondMenuChange.bind(this)}
                                    style={{ width: 120, marginLeft: 10 }}>
                                    <Option value="az">AZ</Option>
                                </Select>

                                <Select
                                    value={thiredMenuValue}
                                    onChange={this.thiredMenuChange.bind(this)}
                                    style={{ width: 120, marginLeft: 10 }}>
                                    <Option value="ha">HA</Option>
                                </Select>

                                <Select
                                    value={fourthMenuValue}
                                    onChange={this.fourthMenuChange.bind(this)}
                                    style={{ width: 120, marginLeft: 10 }}>
                                    <Option value="host">Host</Option>
                                </Select>

                                <Button
                                    type="primary"
                                    style={{ marginLeft: 10 }}
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                            </Button>
                            </div>
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Virtual;