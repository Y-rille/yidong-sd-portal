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
var qs = require('querystringify')
import { stringify } from 'querystringify'
import Selector from '../../../../components/Selector'
import { ResourceActions } from '../../actions/index'
export interface HostProps {
    location?,
    history?,
    actions: ResourceActions,
    match,
    subDataRegion?,
    subDataAZ?,
    subDataHA?,
    hostList?,
}

class Host extends React.Component<HostProps, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pathname } = this.props.location
        let { pageNo, region, az, ha } = qs.parse(this.props.location.search)

        this.state = {
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/control` }) != null && 'control',
                matchPath(pathname, { path: `${match.url}/calculate` }) != null && 'calculate',
                matchPath(pathname, { path: `${match.url}/storage` }) != null && 'storage'
            ]).toString(),
            tableLoading: false,
            pageSize: 1,
            pageNo: pageNo ? pageNo : 1,
            region: region ? region : '',
            az: az ? az : '',
            ha: ha ? ha : '',
        }
    }

    onChange(key) { // tab切换

        let { match } = this.props
        let { pathname } = this.props.location
        let { region, az, ha } = this.state
        let pageNo = 1
        this.setState({
            activeKey: _.compact([
                matchPath(pathname, { path: '/control' }) != null && 'control',
                matchPath(pathname, { path: '/calculate' }) != null && 'calculate',
                matchPath(pathname, { path: '/storage' }) != null && 'storage'
            ]).toString(),
            pageNo
        })
        let queryObj = { pageNo, region, az, ha }
        this.props.history.push(`${match.url}/${key}?${stringify(queryObj)}`)

        this.setState({
            pageNo
        });
        this.getTableData(queryObj)
    }
    getData(type, value) {  // 查询条件切换
        let { region, az, ha } = this.state
        this.setState({
            region: type === 'Region' ? value : region,
            az: type === 'AZ' ? value : az,
            ha: type === 'HA' ? value : ha
        })
    }
    goLink(key, obj) {
        let { match } = this.props
        this.props.history.push(`${match.url}/info/1`)
    }
    goPage = (num) => {
        let { match } = this.props
        let { region, az, ha, activeKey } = this.state
        let pageNo = num
        let queryObj = { pageNo, region, az, ha }
        this.props.history.push(`${match.url}/${activeKey}?${stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    handleClick() { // 查询按钮
        let { match } = this.props
        let pageNo = 1
        let { region, az, ha, activeKey } = this.state
        let queryObj = { pageNo, region, az, ha }
        this.props.history.push(`${match.url}/${activeKey}?${stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData(queryObj)
    }

    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { region, az, ha, pageSize } = this.state
        this.props.actions.queryList(this.state.activeKey, { pageNo, pageSize, region, az, ha }, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    componentWillMount() {
        let { pageNo } = this.state
        let queryObj = {
            pageNo
        }
        this.getTableData(queryObj)
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
        let { match, hostList } = this.props;
        const { menuValue, secondMenuValue, thiredMenuValue, activeKey, pageSize, tableLoading } = this.state;
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
                                <Route path={`${match.url}/control`}
                                    render={() => <HostList {...this.props} pageSize={pageSize} goPage={this.goPage.bind(this)} goLink={this.goLink.bind(this)} data={hostList} tableLoading={tableLoading} />}
                                />
                                <Route path={`${match.url}/calculate`}
                                    render={() => <HostList {...this.props} pageSize={pageSize} goPage={this.goPage.bind(this)} goLink={this.goLink.bind(this)} data={hostList} tableLoading={tableLoading} />}
                                />
                                <Route path={`${match.url}/storage`}
                                    render={() => <HostList {...this.props} pageSize={pageSize} goPage={this.goPage.bind(this)} goLink={this.goLink.bind(this)} data={hostList} tableLoading={tableLoading} />}
                                />
                            </Switch>
                        </div>
                    </div>
                )} />
            </Switch>

        );
    }
}
export default Host;