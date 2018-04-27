import * as React from 'react';
import { matchPath } from 'react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import * as _ from 'lodash';
import qs from 'querystringify'
import { Icon, Breadcrumb, Tabs, Button, Spin, Input } from 'antd';
const TabPane = Tabs.TabPane;
import styles from '../style/index.less'
import { stringify } from 'querystringify'
import CompactTable from '../../../components/CompactTable'
import BackupList from '../container/vim/backuplist'

class Backup extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { vim_id } = this.props.match.params
        let { pageNo, name } = qs.parse(this.props.location.search)
        let { pathname } = this.props.location
        this.state = {
            activeKey: _.compact([
                matchPath(pathname, { path: `${match.url}/clusterConfig` }) != null && 'clusterConfig',
                matchPath(pathname, { path: `${match.url}/database` }) != null && 'database',
                matchPath(pathname, { path: `${match.url}/databaseIncrement` }) != null && 'databaseIncrement',
            ]).toString(),
            name: name ? name : '',
            vim_id: vim_id,
            tableLoading: false,
            pageNo: pageNo ? pageNo : 1,
            pageSize: 10,
        }
    }
    backupInput(value) {
        this.setState({
            name: value
        })
    }
    handleClick() {
        let { match } = this.props
        let pageNo = 1
        let { name } = this.state
        let queryObj = { pageNo, name }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData(queryObj)
    }
    onChange(key) {
        let { match } = this.props
        let { pathname } = this.props.location
        let pageNo = 1
        let queryObj = { pageNo }
        this.props.history.push(`${match.url}/${key}?${qs.stringify(queryObj)}`)
        this.setState({
            activeKey: key,
        })
        this.props.actions.resetList()
        this.getTableData(queryObj, key)
    }
    getTableData(queryObj, actKey = null) {
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/dashboard/backup/:vimId'
        })
        let vim_id = mp_node.params.id
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { pageSize, activeKey } = this.state
        let act_Key = actKey || activeKey
        let params_obj = { pageNo, pageSize, vim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        let dsname = ''
        switch (act_Key) {
            case 'clusterConfig':
                dsname = 'imdsClusterConfig'
                break
            case 'database':
                dsname = 'imdsDatabase'
                break
            default:
                dsname = 'imdsDatabaseIncrement'
        }

        this.props.actions.queryList(dsname, params_obj, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    componentWillMount() {
        let { pathname } = this.props.location
        if (this.state.activeKey.length > 0) {
            let { pageNo } = this.state
            let queryObj = {
                pageNo
            }
            this.getTableData(queryObj, 'imdsClusterConfig')
        }
    }
    componentWillReceiveProps(nextProps) {
        let { match } = nextProps
        let { pathname } = nextProps.location
        let actKey = _.compact([
            matchPath(pathname, { path: `${match.url}/clusterConfig` }) != null && 'clusterConfig',
            matchPath(pathname, { path: `${match.url}/database` }) != null && 'database',
            matchPath(pathname, { path: `${match.url}/databaseIncrement` }) != null && 'databaseIncrement',
        ]).toString()

        if (this.state.activeKey.length === 0 && actKey.length > 0) {
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
        let { match, nodeInfo, list, location } = this.props;
        const { name, tableLoading, pageSize, activeKey } = this.state;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>备份与恢复</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>物理资源</Breadcrumb.Item>
                        <Breadcrumb.Item>{name}</Breadcrumb.Item>
                        <Breadcrumb.Item>备份与恢复</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Input placeholder="名称"
                            type="text"
                            onChange={e => this.backupInput(e.target.value)} />
                        <Button
                            type="primary"
                            onClick={this.handleClick.bind(this)}
                        >
                            查询
                                </Button>
                        <div style={{ float: 'right' }}>
                            <Button type="primary">备份管理</Button>
                        </div>

                    </div>
                    <div>
                        <Tabs onChange={this.onChange.bind(this)} type="card" activeKey={activeKey} animated={false}>
                            <TabPane tab="集群配置" key="clusterConfig"></TabPane>
                            <TabPane tab="数据库" key="database"></TabPane>
                            <TabPane tab="数据库增量" key="databaseIncrement"></TabPane>
                        </Tabs>
                        <Switch>
                            <Redirect from={`${match.url}`} to={`${match.url}/clusterConfig${location.search}`} exact />
                            <Route component={BackupList} path={`${match.url}/:type`} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default Backup;