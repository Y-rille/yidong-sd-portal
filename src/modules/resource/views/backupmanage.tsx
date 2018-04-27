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
        let { pageNo, cfbName, dbName, dibName } = qs.parse(this.props.location.search)
        this.state = {
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/clusterConfigBackup` }) != null && 'clusterConfigBackup',
                matchPath(pathname, { path: `${match.url}/databaseBackup` }) != null && 'databaseBackup',
                matchPath(pathname, { path: `${match.url}/databaseIncrementBackup` }) != null && 'databaseIncrementBackup',
            ]).toString(),
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            cfbName: cfbName ? cfbName : '',
            dbName: dbName ? dbName : '',
            dibName: dibName ? dibName : '',
            vim_id: mp_node.params.id
        }
    }
    handleFileManage() {
        let mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/dashboard/backupmanage/:vimId'
        })
        let vim_id = mp_node.params.vimId
        let { match } = this.props
        if (vim_id) {
            this.props.history.push(`/resource/dashboard/backup/${vim_id}/clusterConfig`)
        }
    }
    changecfbNameValue(value) {
        this.setState({
            cfbName: value
        })
    }
    changedbNameValue(value) {
        this.setState({
            dbName: value
        })
    }
    changedibNameValue(value) {
        this.setState({
            dibName: value
        })
    }
    getName(act_Key, vimId = false) {
        let queryObj = {}
        let { cfbName, dbName, dibName, pageSize, pageNo, vim_id } = this.state
        switch (act_Key) {
            case 'clusterConfigBackup':
                queryObj = vimId ? { pageNo, pageSize, cfbName, vim_id } : { pageNo, cfbName }
                break
            case 'databaseBackup':
                queryObj = vimId ? { pageNo, pageSize, cfbName, vim_id } : { pageNo, dbName }
                break
            default:
                queryObj = vimId ? { pageNo, pageSize, cfbName, vim_id } : { pageNo, dibName }
        }
        return queryObj
    }
    getTableData(queryObj, actKey = null) {
        let vim_id = this.state.vim_id
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { cfbName, dbName, dibName, pageSize, activeKey } = this.state
        let act_Key = actKey || activeKey
        let params_obj = this.getName(act_Key, true)
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
        let { cfbName, dbName, dibName, activeKey } = this.state
        let pageNo = num
        let queryObj = this.getName(activeKey)
        this.props.history.push(`${match.url}/${activeKey}?${qs.stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    handleClick() {
        let { match } = this.props
        let { cfbName, dbName, dibName, activeKey } = this.state
        let pageNo = 1
        let queryObj = this.getName(activeKey)
        this.props.history.push(`${match.url}/${activeKey}?${qs.stringify(queryObj)}`)
        this.setState({
            // pageNo
        });
        this.getTableData(queryObj)
    }
    onChange(key) {
        let { match } = this.props
        let { pathname } = this.props.location
        let { cfbName, dbName, dibName } = this.state
        let pageNo = 1
        let queryObj = this.getName(key)
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
        if (this.state.activeKey.length > 0) {  // 刷新
            let { pageNo } = this.state
            let queryObj = {
                pageNo
            }
            this.getTableData(queryObj)
        }
    }
    componentWillReceiveProps(nextProps) {
        let { match } = this.props
        let { pathname } = nextProps.location
        let actKey = _.compact([
            matchPath(pathname, { path: `${match.url}/clusterConfigBackup` }) != null && 'clusterConfigBackup',
            matchPath(pathname, { path: `${match.url}/databaseBackup` }) != null && 'databaseBackup',
            matchPath(pathname, { path: `${match.url}/databaseIncrementBackup` }) != null && 'databaseIncrementBackup',
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
    renderInput(activeKey) {
        let { cfbName, dbName, dibName } = this.state
        switch (activeKey) {
            case 'clusterConfigBackup':
                return (
                    <Input placeholder="集群配置备份名称"
                        value={cfbName} type="text"
                        onChange={e => this.changecfbNameValue(e.target.value)}
                    />
                )
            case 'databaseBackup':
                return (
                    <Input placeholder="数据库备份名称"
                        value={dbName} type="text"
                        onChange={e => this.changedbNameValue(e.target.value)} />
                )
            default:
                return (
                    <Input placeholder="数据库增量备份名称"
                        value={dibName} type="text"
                        onChange={e => this.changedibNameValue(e.target.value)} />
                )
        }
    }
    render() {
        let { match, nodeInfo, list } = this.props;

        let { activeKey, pageSize, tableLoading, cfbName, dbName, dibName } = this.state
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>备份管理</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item>备份管理</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                {/* <div className={styles.header}>
                    <h1 className={styles.title}>备份与恢复</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>物理资源</Breadcrumb.Item>
                        <Breadcrumb.Item>{name}</Breadcrumb.Item>
                        <Breadcrumb.Item>备份与恢复</Breadcrumb.Item>
                    </Breadcrumb>
                </div> */}
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        {this.renderInput(activeKey)}
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