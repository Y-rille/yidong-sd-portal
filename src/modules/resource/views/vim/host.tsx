import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import HostInfo from '../../container/vim/hostInfo'
import { Row, Col, Breadcrumb, Icon, Radio, Spin, Select, Button, Tabs } from 'antd';

import HostList from '../../container/vim/hostList'
import styles from '../../style/index.less'
const Option = Select.Option;
const TabPane = Tabs.TabPane;

import Selector from '../../../../components/Selector'
import { ResourceActions } from '../../actions/index'
export interface HostProps {
    location?,
    history?,
    actions: ResourceActions,
    match,
    subDataRegion?,
    subDataAZ?,
    subDataHA?
}

class Host extends React.Component<HostProps, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pathname } = this.props.location
        this.state = {
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/control` }) != null && 'control',
                matchPath(pathname, { path: `${match.url}/calculate` }) != null && 'calculate',
                matchPath(pathname, { path: `${match.url}/storage` }) != null && 'storage'
            ]).toString()
        }
    }
    handleClick() {

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
    getData() {

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
        let control_tdata = {
            'count': 17,
            'header': [{
                key: 'name',
                title: '主机名称',
                link: true,
            }, {
                key: 'roles',
                title: '角色',
            }, {
                key: 'cpu',
                title: 'CPU(使用/全部)',
            }, {
                key: 'memory',
                title: '内存(使用/全部)'
            },
            {
                key: 'az',
                title: '所属AZ',
            }, {
                key: 'ha',
                title: '所属HA'
            }, {
                key: 'up',
                title: '上下电状态'
            }, {
                key: 'maintain',
                title: '维护状态'
            }, {
                key: 'run',
                title: '运行时长'
            }, {
                key: 'vm',
                title: 'VM数'
            }],
            'dataList': [
                {
                    'id': 1,
                    'name': '10.255.242.215',
                    'roles': '主',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }, {
                    'id': 2,
                    'name': '10.255.242.215',
                    'roles': '主',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }, {
                    'id': 3,
                    'name': '10.255.242.215',
                    'roles': '主',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }, {
                    'id': 4,
                    'name': '10.255.242.215',
                    'roles': '主',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }, {
                    'id': 5,
                    'name': '10.255.242.215',
                    'roles': '主',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }, {
                    'id': 6,
                    'name': '10.255.242.215',
                    'roles': '主',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }, {
                    'id': 7,
                    'name': '10.255.242.215',
                    'roles': '主',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }
            ]
        }

        let calculate_tdata = {
            'count': 17,
            'header': [{
                key: 'name',
                title: '主机名称',
                link: true,
            }, {
                key: 'cpu',
                title: 'CPU(使用/全部)',
            }, {
                key: 'memory',
                title: '内存(使用/全部)'
            },
            {
                key: 'az',
                title: '所属AZ',
            }, {
                key: 'ha',
                title: '所属HA'
            }, {
                key: 'up',
                title: '上下电状态'
            }, {
                key: 'maintain',
                title: '维护状态'
            }, {
                key: 'run',
                title: '运行时长'
            }, {
                key: 'vm',
                title: 'VM数'
            }],
            'dataList': [
                {
                    'id': 1,
                    'name': '10.255.242.215',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }, {
                    'id': 2,
                    'name': '10.255.242.215',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }, {
                    'id': 3,
                    'name': '10.255.242.215',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }, {
                    'id': 4,
                    'name': '10.255.242.215',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }, {
                    'id': 5,
                    'name': '10.255.242.215',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }, {
                    'id': 6,
                    'name': '10.255.242.215',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }, {
                    'id': 7,
                    'name': '10.255.242.215',
                    'cpu': '6/13',
                    'memory': '1/1',
                    'az': 'xasa,AAAAS',
                    'ha': 'xasa',
                    'up': '上电',
                    'maintain': 'running',
                    'run': '14天24小时',
                    'vm': '15'
                }
            ]
        }
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
                                <Selector type="Region" data={this.props.subDataRegion} actions={this.props.actions} getData={this.getData.bind(this)} />
                                <Selector type="AZ" data={this.props.subDataAZ} actions={this.props.actions} getData={this.getData.bind(this)} />
                                <Selector type="HA" data={this.props.subDataHA} actions={this.props.actions} getData={this.getData.bind(this)} />
                                <Button
                                    type="primary"
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                                </Button>
                            </div>
                            <Tabs onChange={this.onChange.bind(this)} type="card" activeKey={activeKey} animated={false}>
                                <TabPane tab="控制节点" key="control"></TabPane>
                                <TabPane tab="计算节点" key="calculate"></TabPane>
                                <TabPane tab="存储节点" key="storage"></TabPane>
                            </Tabs>
                            <Switch>
                                <Redirect from={`${match.url}`} to={`${match.url}/control`} exact />
                                <Route path={`${match.url}/control`} render={() => <HostList {...this.props} data={control_tdata} />} />
                                <Route path={`${match.url}/calculate`} render={() => <HostList {...this.props} data={calculate_tdata} />} />
                                <Route path={`${match.url}/storage`} render={() => <HostList {...this.props} data={calculate_tdata} />} />
                            </Switch>
                        </div>
                    </div>
                )} />
            </Switch>

        );
    }
}
export default Host;