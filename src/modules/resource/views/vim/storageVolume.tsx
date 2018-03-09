import * as React from 'react';
import * as _ from 'lodash';
import { matchPath } from 'react-router'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Input } from 'antd';
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
import { ResourceActions } from '../../actions/index'
import Selector from '../../../../components/Selector'
import { stringify } from 'querystringify'
var qs = require('querystringify')
export interface StorageVolumeProps {
    location?,
    history?,
    actions: ResourceActions,
    match,
    subDataProject?,
    nodeInfo?,
    list?
}
class StorageVolume extends React.Component<StorageVolumeProps, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pathname } = this.props.location
        let { pageNo, project, name } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        this.state = {
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            project: project ? project : '',
            name: name ? name : '',
            vim_id: mp_node.params.id
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/storage_volume/info`)
    }
    storageVolumeInputChange(value) {
        this.setState({
            name: value
        })
    }
    handleClick() {
        let { match } = this.props
        let pageNo = 1
        let { project, name } = this.state
        let queryObj = { pageNo, project, name }
        this.props.history.push(`${match.url}/storage_volume?${stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData(queryObj)
        // console.log(storageVolumeInputValue, storageVolumeSelectValue, 'ppp')
    }
    goPage = (num) => {
        let { match } = this.props
        let { project, name } = this.state
        let pageNo = num
        let queryObj = { pageNo, project, name }
        this.props.history.push(`${match.url}/storage_volume?${stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    getData(type, value) {
        let { project } = this.state
        this.setState({
            project: type === 'Project' ? value : project
        })
    }
    goLink(key, obj) {
        let { match } = this.props
        // this.props.history.push(`${match.url}/info/1`)
    }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { project, name, pageSize, vim_id } = this.state
        this.props.actions.queryList('imdsStorageVolum', { pageNo, pageSize, project, name, vim_id }, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    componentWillMount() {
        let { pathname } = this.props.location

        // if (this.state.activeKey.length > 0) {  // 刷新
        let { pageNo } = this.state
        let queryObj = {
            pageNo
        }
        this.getTableData(queryObj)
        // }
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    // componentWillReceiveProps(nextProps) {
    //     let { match } = nextProps
    //     let { pathname } = nextProps.location

    //     let pageNo = qs.parse(nextProps.location.search).pageNo || 1
    //     let queryObj = {
    //         pageNo
    //     }
    //     this.getTableData(queryObj)

    // }
    render() {
        let { match, list } = this.props;
        const { pageNo, project, name, pageSize, tableLoading } = this.state;

        let tdata = {
            'count': 17,
            'header': [{
                key: 'id',
                title: '项目',
                // fixed: true,
                // link: true,
            }, {
                key: 'main',
                title: '主机',
                // fixed: true,
            }, {
                key: 'name',
                title: '名称',
            }, {
                key: 'num',
                title: '大小(GiB)'
            }, {
                key: 'state',
                title: '状态'
            }, {
                key: 'type',
                title: '类型'
            }, {
                key: 'at',
                title: 'attached to'
            }, {
                key: 'isStart',
                title: '是否引导启动'
            }, {
                key: 'isEncrypt',
                title: '是否加密'
            }
            ],
            'dataList': [
                {
                    'id': 'xiaojindian4',
                    'main': '1',
                    'name': 'sub-text-vlan24.10.34.24.0',
                    'num': '10',
                    'state': '是',
                    'type': 'OMB',
                    'at': '运行',
                    'isStart': 'Yes',
                    'isEncrypt': 'Yes',
                },
                {
                    'id': '213cluster',
                    'main': '10',
                    'name': 'sub-text-vlan24.10.34.24.0',
                    'num': '10',
                    'state': '是',
                    'type': 'OMB',
                    'at': '运行',
                    'isStart': 'Yes',
                    'isEncrypt': 'Yes',
                }, {
                    'id': '213cluster-123',
                    'main': '13',
                    'name': 'sub-text-vlan24.10.34.24.0',
                    'num': '3',
                    'state': '是',
                    'type': 'OMB',
                    'at': '运行',
                    'isStart': 'Yes',
                    'isEncrypt': 'Yes',
                }, {
                    'id': 'lijianguo',
                    'main': '13',
                    'name': 'sub-text-vlan24.10.34.24.0',
                    'num': '4',
                    'state': '是',
                    'type': 'OMB',
                    'at': '运行',
                    'isStart': 'Yes',
                    'isEncrypt': 'Yes',
                }, {
                    'id': 'zhangjianjun',
                    'main': '13',
                    'name': 'sub-text-vlan24.10.34.24.0',
                    'num': '5',
                    'state': '是',
                    'type': 'OMB',
                    'at': '运行',
                    'isStart': 'Yes',
                    'isEncrypt': 'Yes',
                }, {
                    'id': 'xiaojindian4',
                    'main': '13',
                    'name': 'sub-text-vlan24.10.34.24.0',
                    'num': '6',
                    'state': '是',
                    'type': 'OMB',
                    'at': '运行',
                    'isStart': 'Yes',
                    'isEncrypt': 'Yes',
                }, {
                    'id': '213cluster-123',
                    'main': '13',
                    'name': 'sub-text-vlan24.10.34.24.0',
                    'num': '7',
                    'state': '是',
                    'type': 'OMB',
                    'at': '运行',
                    'isStart': 'Yes',
                    'isEncrypt': 'Yes',
                }, {
                    'id': '213cluster-123',
                    'main': '1',
                    'name': 'sub-text-vlan24.10.34.24.0',
                    'num': '10',
                    'state': '是',
                    'type': 'OMB',
                    'at': '运行',
                    'isStart': 'Yes',
                    'isEncrypt': 'Yes',
                }, {
                    'id': '213cluster-123',
                    'main': '2',
                    'name': 'sub-text-vlan24.10.34.24.0',
                    'num': '10',
                    'state': '是',
                    'type': 'OMB',
                    'at': '运行',
                    'isStart': 'Yes',
                    'isEncrypt': 'Yes',
                }, {
                    'id': '213cluster-123',
                    'main': '1',
                    'name': 'sub-text-vlan24.10.34.24.0',
                    'num': '10',
                    'state': '是',
                    'type': 'OMB',
                    'at': '运行',
                    'isStart': 'Yes',
                    'isEncrypt': 'Yes',
                }
            ]
        }
        let { nodeInfo } = this.props
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>存储卷管理</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item>存储卷管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Selector type="Project" value={project} data={this.props.subDataProject} getData={this.getData.bind(this)} />
                        <Input
                            placeholder="存储卷名称"
                            value={name} type="text"
                            onChange={e => this.storageVolumeInputChange(e.target.value)}
                        />
                        <Button
                            type="primary"
                            onClick={this.handleClick.bind(this)}
                        >
                            查询
                            </Button>
                        <Button type="primary" style={{ float: 'right' }}>管理</Button>
                    </div>
                    {list ? (
                        <CompactTable
                            goPage={this.goPage.bind(this)} // 翻页
                            goLink={this.goLink.bind(this)}
                            pageSize={pageSize}
                            data={list}
                            loading={tableLoading}
                            actionAuth={[]}
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
export default StorageVolume;