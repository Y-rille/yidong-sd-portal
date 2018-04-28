import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Input, Button, Spin } from 'antd';
import { matchPath } from 'react-router'
import CompactTable from '../../../../components/CompactTable/'
import qs from 'querystringify'
import { stringify } from 'querystringify'
class StorageSnapshot extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/vim/:id'
        })
        let { pageNo, svname, ssname } = qs.parse(this.props.location.search)
        this.state = {
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            svname: svname ? svname : '',
            ssname: ssname ? ssname : '',
            vim_id: mp_node.params.id
        }
    }
    storageVolumeInput(value) {
        this.setState({
            svname: value
        })
    }
    SnapshotInput(value) {
        this.setState({
            ssname: value
        })
    }
    handleManage() {
        let { config } = this.props
        // window.open(config.manage_link.flavor)
    }
    getTableData() {
        this.setState({
            tableLoading: true
        });
        let { pageSize, pageNo, vim_id, svname, ssname } = this.state
        let params_obj = { pageNo, pageSize, vim_id, svname, ssname }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsStorageVolumSnapshot', params_obj, () => {
            this.setState({
                tableLoading: false
            });
        })
    }
    goPage(num) {
        this.setState({
            pageNo: num
        }, () => {
            let { match } = this.props
            let { svname, ssname } = this.state
            let pageNo = num
            let queryObj = { pageNo, svname, ssname }
            this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
            this.getTableData()
        })
    }
    handleClick() {
        let { match } = this.props
        let { svname, ssname } = this.state
        let pageNo = 1
        let queryObj = { pageNo, svname, ssname }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData()
    }
    componentWillMount() {
        this.getTableData()
    }
    componentWillUnMount() {
        this.props.actions.resetList()
    }
    render() {
        let { match, nodeInfo, config, list } = this.props
        let { pageSize, tableLoading, svname, ssname } = this.state
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>存储卷快照管理</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item>存储卷快照管理</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Input placeholder="快照名称"
                            value={ssname} type="text"
                            onChange={e => this.SnapshotInput(e.target.value)} />
                        <Input placeholder="存储卷名称"
                            value={svname} type="text"
                            onChange={e => this.storageVolumeInput(e.target.value)} />
                        <Button
                            type="primary"
                            onClick={this.handleClick.bind(this)}
                        >
                            查询
                                </Button>
                        <Button style={{ float: 'right' }}
                            type="primary"
                            onClick={this.handleManage.bind(this)}
                        >
                            管理
                            </Button>
                    </div>
                    {
                        list ? (
                            <CompactTable
                                outStyle={{ marginTop: '20px' }}
                                goPage={this.goPage.bind(this)}
                                data={list}
                                pageSize={pageSize}
                                loading={tableLoading}
                                actionAuth={[]}
                                size={{ y: list.totalCount > pageSize ? window.innerHeight - 386 : window.innerHeight - 333 }}
                            />
                        ) : (
                                <Spin />
                            )
                    }
                </div>
            </div>
        );
    }
}
export default StorageSnapshot;