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
    config?
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
        let params_obj = { pageNo, pageSize, project, name, vim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsStorageVolum', params_obj, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    handleManage() {
        let { config } = this.props
        window.location.href = config.manage_link.storage_volume
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
    render() {
        let { match, list, nodeInfo } = this.props;
        const { pageNo, project, name, pageSize, tableLoading } = this.state;
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
                        <Button type="primary" style={{ float: 'right' }} onClick={this.handleManage.bind(this)}>管理</Button>
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