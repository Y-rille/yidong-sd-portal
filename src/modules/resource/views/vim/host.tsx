import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import { Row, Col, Breadcrumb, Icon, Radio, Spin, Select, Button, Tabs } from 'antd';

import HostList from '../../container/vim/hostList'
import styles from '../../style/index.less'
const Option = Select.Option;
const TabPane = Tabs.TabPane;
import qs from 'querystringify'
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
    nodeInfo?
    list?,
}

class Host extends React.Component<HostProps, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pathname } = this.props.location
        let { pageNo, region, az, ha } = qs.parse(this.props.location.search)

        this.state = {
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/imdsController` }) != null && 'imdsController',
                matchPath(pathname, { path: `${match.url}/imdsHost` }) != null && 'imdsHost',
                matchPath(pathname, { path: `${match.url}/imdsStorage` }) != null && 'imdsStorage'
            ]).toString(),
            tableLoading: false,
            pageSize: 10,
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
        let queryObj = { pageNo, region, az, ha }
        this.props.history.push(`${match.url}/${key}?${qs.stringify(queryObj)}`)
        this.setState({
            activeKey: key,
            // pageNo
        })

        this.getTableData(queryObj, key)
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
        if (key === 'name') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    goPage = (num) => {
        let { match } = this.props
        let { region, az, ha, activeKey } = this.state
        let pageNo = num
        let queryObj = { pageNo, region, az, ha }
        this.props.history.push(`${match.url}/${activeKey}?${qs.stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    handleClick() { // 查询按钮
        let { match } = this.props
        let pageNo = 1
        let { region, az, ha, activeKey } = this.state
        let queryObj = { pageNo, region, az, ha }
        this.props.history.push(`${match.url}/${activeKey}?${qs.stringify(queryObj)}`)
        this.setState({
            // pageNo
        });
        this.getTableData(queryObj)
    }

    getTableData(queryObj, actKey = null) {
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        let vim_id = mp_node.params.id
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { region, az, ha, pageSize, activeKey } = this.state
        let act_Key = actKey || activeKey
        let params_obj = { pageNo, pageSize, region, az, ha, vim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList(act_Key, params_obj, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    componentWillMount() {

        let { pathname } = this.props.location

        if (this.state.activeKey.length > 0) {  // 刷新
            let { pageNo } = this.state
            let queryObj = {
                pageNo
            }
            this.getTableData(queryObj)
        }
    }
    componentWillReceiveProps(nextProps) {
        let { match } = nextProps
        let { pathname } = nextProps.location

        let actKey = _.compact([
            matchPath(pathname, { path: `${match.url}/imdsController` }) != null && 'imdsController',
            matchPath(pathname, { path: `${match.url}/imdsHost` }) != null && 'imdsHost',
            matchPath(pathname, { path: `${match.url}/imdsStorage` }) != null && 'imdsStorage'
        ]).toString()

        if (this.state.activeKey.length === 0 && actKey.length > 0) {    // 第一次进入;info返回；进入info

            let pageNo = qs.parse(nextProps.location.search).pageNo || 1
            let queryObj = {
                pageNo
            }
            this.getTableData(queryObj, actKey)
        }
        this.setState({
            activeKey: actKey
        })
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    render() {
        let { match, list, nodeInfo } = this.props;
        const { region, az, ha, activeKey, pageSize, tableLoading } = this.state;

        let imdsController_tdata = {
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
                }
            ]
        }
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>主机管理</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item>主机管理</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Selector type="Region" data={this.props.subDataRegion} getData={this.getData.bind(this)} value={region} />
                        <Selector type="AZ" data={this.props.subDataAZ} getData={this.getData.bind(this)} value={az} />
                        <Selector type="HA" data={this.props.subDataHA} getData={this.getData.bind(this)} value={ha} />
                        <Button
                            type="primary"
                            onClick={this.handleClick.bind(this)}
                        >
                            查询
                                </Button>
                    </div>
                    <Tabs onChange={this.onChange.bind(this)} type="card" activeKey={activeKey} animated={false}>
                        <TabPane tab="控制节点" key="imdsController"></TabPane>
                        <TabPane tab="计算节点" key="imdsHost"></TabPane>
                        <TabPane tab="存储节点" key="imdsStorage"></TabPane>
                    </Tabs>
                    <Switch>
                        <Redirect from={`${match.url}`} to={`${match.url}/imdsController`} exact />
                        <Route path={`${match.url}/imdsController`}
                            render={() => <HostList {...this.props} pageSize={pageSize} goPage={this.goPage.bind(this)} goLink={this.goLink.bind(this)} data={list} tableLoading={tableLoading} />}
                        />
                        <Route path={`${match.url}/imdsHost`}
                            render={() => <HostList {...this.props} pageSize={pageSize} goPage={this.goPage.bind(this)} goLink={this.goLink.bind(this)} data={list} tableLoading={tableLoading} />}
                        />
                        <Route path={`${match.url}/imdsStorage`}
                            render={() => <HostList {...this.props} pageSize={pageSize} goPage={this.goPage.bind(this)} goLink={this.goLink.bind(this)} data={list} tableLoading={tableLoading} />}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}
export default Host;