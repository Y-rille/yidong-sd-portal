import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import ResourceTable from '../../../../components/ResourceTable/'
import HostInfo from '../../container/vim/hostInfo'
import { Row, Col, Breadcrumb, Icon, Radio, Spin, Select, Button, Tabs } from 'antd';

import HostList from '../../container/vim/hostList'
import styles from '../../style/index.less'
const Option = Select.Option;
const TabPane = Tabs.TabPane;

class Host extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pathname } = this.props.location
        this.state = {
            menuValue: 'region',
            secondMenuValue: 'az',
            thiredMenuValue: 'ha',
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/control` }) != null && 'control',
                matchPath(pathname, { path: `${match.url}/calculate` }) != null && 'calculate',
                matchPath(pathname, { path: `${match.url}/storage` }) != null && 'storage'
            ]).toString()
        }
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
    onChange(key) {
        let { match } = this.props
        let { pathname } = this.props.location
        this.setState({
            activeKey: _.compact([
                matchPath(pathname, { path: '/control' }) != null && 'control',
                matchPath(pathname, { path: '/calculate' }) != null && 'calculate',
                matchPath(pathname, { path: '/storage' }) != null && 'storage'
            ]).toString()
        })
        this.props.history.push(`${match.url}/${key}`)
    }
    componentWillReceiveProps(nextProps) {
        let { match } = nextProps
        let { pathname } = nextProps.location
        this.setState({
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/control` }) != null && 'control',
                matchPath(pathname, { path: `${match.url}/calculate` }) != null && 'calculate',
                matchPath(pathname, { path: `${match.url}/storage` }) != null && 'storage'
            ]).toString()
        })
    }
    render() {
        let { match } = this.props;
        const { menuValue, secondMenuValue, thiredMenuValue, activeKey } = this.state;
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={HostInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>主机管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>主机管理</Breadcrumb.Item>
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

                                <Button
                                    type="primary"
                                    style={{ marginLeft: 10 }}
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                                </Button>
                            </div>
                            <Tabs onChange={this.onChange.bind(this)} type="card" activeKey={activeKey}>
                                <TabPane tab="控制节点" key="control"></TabPane>
                                <TabPane tab="计算节点" key="calculate"></TabPane>
                                <TabPane tab="存储节点" key="storage"></TabPane>
                            </Tabs>
                            <Switch>
                                <Redirect from={`${match.url}`} to={`${match.url}/control`} exact />
                                <Route path={`${match.url}/control`} component={HostList} />
                                <Route path={`${match.url}/calculate`} component={HostList} />
                                <Route path={`${match.url}/storage`} component={HostList} />
                            </Switch>
                        </div>

                    </div>
                )} />
            </Switch>

        );
    }
}
export default Host;