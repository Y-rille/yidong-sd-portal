import * as React from 'react';
import styles from '../style/index.less'
import { Icon, Breadcrumb, Tabs, Button, Spin, Input } from 'antd';
const TabPane = Tabs.TabPane;
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import * as _ from 'lodash';
import qs from 'querystringify'
import { stringify } from 'querystringify'
import CompactTable from '../../../components/CompactTable'
import BackupManageList from '../container/vim/backupManageList'

class BackUpManage extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/dashboard/backupmanage/:vimId'
        })
        let { match } = this.props
        let { pathname } = this.props.location
        let { pageNo, name } = qs.parse(this.props.location.search)
        this.state = {
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/clusterConfigBackup` }) != null && 'clusterConfigBackup',
                matchPath(pathname, { path: `${match.url}/databaseBackup` }) != null && 'databaseBackup',
                matchPath(pathname, { path: `${match.url}/databaseIncrementBackup` }) != null && 'databaseIncrementBackup',
            ]).toString(),
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            name: name ? name : '',
            vim_id: mp_node.params.vimId,
        }
    }
    handleFileManage() {
        let { vim_id } = this.state
        let { match } = this.props
        if (vim_id) {
            this.props.history.push(`/resource/dashboard/backup/${vim_id}/clusterConfig`)
        }
    }
    changeInputValue(value) {
        this.setState({
            name: value
        })
    }

    getTableData(queryObj, actKey = null) {
        let vim_id = this.state.vim_id
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { name, pageSize, activeKey } = this.state
        let act_Key = actKey || activeKey
        let params_obj = { pageNo, pageSize, name, vim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        let dsname = ''
        switch (act_Key) {
            case 'clusterConfigBackup':
                dsname = 'imdsClusterConfigBackup'
                break
            case 'databaseBackup':
                dsname = 'imdsDatabaseBackup'
                break
            default:
                dsname = 'imdsDatabaseIncrementBackup'
        }

        this.props.actions.queryList(dsname, params_obj, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    goPage = (num) => {
        let { match } = this.props
        let { name, activeKey } = this.state
        let pageNo = num
        let queryObj = { pageNo, name }
        this.props.history.push(`${match.url}/${activeKey}?${qs.stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    handleClick() {
        let { match } = this.props
        let { name, activeKey } = this.state
        let pageNo = 1
        let queryObj = { pageNo, name }
        this.props.history.push(`${match.url}/${activeKey}?${qs.stringify(queryObj)}`)
        this.setState({
            // pageNo
        });
        this.getTableData(queryObj)
    }
    onChange(key) {
        let { match } = this.props
        let { pathname } = this.props.location
        let { name } = this.state
        let pageNo = 1
        let queryObj = { pageNo, name }
        this.props.history.push(`${match.url}/${key}?${qs.stringify(queryObj)}`)
        this.setState({
            activeKey: key,
            // pageNo
        })
        this.props.actions.resetList()
        this.getTableData(queryObj, key)
    }

    componentWillMount() {
        let { pathname } = this.props.location
        let { vim_id } = this.state
        let { resourceTree } = this.props
        if (this.state.activeKey.length > 0) {  // 刷新
            let { pageNo } = this.state
            let queryObj = {
                pageNo
            }
            this.getTableData(queryObj)
        }
        if (resourceTree) {
            this.props.actions.getNodeData(vim_id, resourceTree)
        }
    }
    componentWillReceiveProps(nextProps) {
        let { match, resourceTree, nodeInfo } = nextProps
        let { pathname } = nextProps.location
        let actKey = _.compact([
            matchPath(pathname, { path: `${match.url}/clusterConfigBackup` }) != null && 'clusterConfigBackup',
            matchPath(pathname, { path: `${match.url}/databaseBackup` }) != null && 'databaseBackup',
            matchPath(pathname, { path: `${match.url}/databaseIncrementBackup` }) != null && 'databaseIncrementBackup',
        ]).toString()
        if (resourceTree && !nodeInfo) {
            this.props.actions.getNodeData(this.state.vim_id, resourceTree)
        }
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
        let { match, nodeInfo, list } = this.props;
        let { activeKey, pageSize, tableLoading, name } = this.state
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>备份管理</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {nodeInfo ? (
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        ) : ''}
                        < Breadcrumb.Item > 备份管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Input placeholder="名称"
                            value={name} type="text"
                            onChange={e => this.changeInputValue(e.target.value)} />
                        <Button
                            type="primary"
                            onClick={this.handleClick.bind(this)}
                        >
                            查询
                                </Button>
                        <Button style={{ float: 'right' }}
                            type="primary"
                            onClick={this.handleFileManage.bind(this)}
                        >
                            源文件管理
                            </Button>
                    </div>
                    <Tabs onChange={this.onChange.bind(this)} type="card" activeKey={activeKey} animated={false}>
                        <TabPane tab="集群配置备份" key="clusterConfigBackup"></TabPane>
                        <TabPane tab="数据库备份" key="databaseBackup"></TabPane>
                        <TabPane tab="数据库增量备份" key="databaseIncrementBackup"></TabPane>
                    </Tabs>
                    <Switch>
                        <Redirect from={`${match.url}`} to={`${match.url}/clusterConfigBackup`} exact />
                        <Route path={`${match.url}/:type`}
                            render={() => <BackupManageList {...this.props} pageSize={pageSize} goPage={this.goPage.bind(this)} data={list} tableLoading={tableLoading} />}
                        />
                    </Switch>
                </div>

            </div>
        )
    }
}

export default BackUpManage