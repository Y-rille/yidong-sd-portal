import * as React from 'react';
import * as _ from 'lodash';
import { matchPath } from 'react-router'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Input } from 'antd';
const Option = Select.Option;
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'

import Selector from '../../../../components/Selector'
import { ResourceActions } from '../../actions/index'

var qs = require('querystringify')

export interface VolumeTypeProps {
    location?,
    history?,
    actions: ResourceActions,
    match,
    subDataProject?,
    nodeInfo?,
    list?,
}

class VolumeType extends React.Component<VolumeTypeProps, any> {
    constructor(props) {
        super(props);
        let { match } = this.props
        let { pageNo, project, vim_id, name } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        this.state = {
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            project: project ? project : '',
            vim_id: mp_node ? mp_node.params.id : '',
            name: name ? name : '',
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/volume_type/info`)
    }
    volumeTypeInputChange(value) {
        this.setState({
            name: value
        })
    }
    handleClick() { // 查询按钮
        let { match } = this.props
        let pageNo = 1
        let { project, name } = this.state
        let queryObj = { pageNo, project, name }
        this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData(queryObj)
    }
    goPage = (num) => {
        let { match } = this.props
        let { project, vim_id, name } = this.state
        let pageNo = num
        this.setState({
            pageNo: pageNo
        });
        let queryObj = { pageNo, project, name }
        this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    goLink(key, obj) {
        let { match } = this.props
    }
    getData(type, value) {  // 查询条件切换
        let { project } = this.state
        this.setState({
            project: type === 'Project' ? value : project
        })
    }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let { project, vim_id, name, pageSize } = this.state
        let { pageNo } = queryObj
        let dsname = 'imdsVolumType'
        this.props.actions.queryList(dsname, { pageNo, pageSize, project, vim_id, name }, () => {
            this.setState({
                tableLoading: false
            });
        })
    }
    componentWillMount() {
        let { pathname } = this.props.location
        let { pageNo } = this.state
        let queryObj = {
            pageNo
        }
        this.getTableData(queryObj)
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    render() {
        let { match, list } = this.props
        const { name, volumeTypeSelectValue, pageSize, project, tableLoading } = this.state;
        let tdata = {
            'count': 17,
            'header': [{
                key: 'id',
                title: '名称',
                // fixed: true,
                // link: true,
            }, {
                key: 'description',
                title: '描述',
                // fixed: true,
            }, {
                key: 'Qos',
                title: '相关QoS Spec',
            }, {
                key: 'isEncrypt',
                title: '是否加密'
            }
            ],
            'dataList': [
                {
                    'id': 'xiaojindian4',
                    'description': '1',
                    'Qos': 'sub-text-vlan24.10.34.24.0',
                    'isEncrypt': '是',
                },
                {
                    'id': '213cluster',
                    'description': '10',
                    'Qos': 'sub-text-vlan24.10.34.24.0',
                    'isEncrypt': '是',
                }, {
                    'id': '213cluster-123',
                    'description': '13',
                    'Qos': 'sub-text-vlan24.10.34.24.0',
                    'isEncrypt': '是',
                }, {
                    'id': 'lijianguo',
                    'description': '13',
                    'Qos': 'sub-text-vlan24.10.34.24.0',
                    'isEncrypt': '是',
                }, {
                    'id': 'zhangjianjun',
                    'description': '13',
                    'Qos': 'sub-text-vlan24.10.34.24.0',
                    'isEncrypt': '是',
                }, {
                    'id': 'xiaojindian4',
                    'description': '13',
                    'Qos': 'sub-text-vlan24.10.34.24.0',
                    'isEncrypt': '是',
                }, {
                    'id': '213cluster-123',
                    'description': '13',
                    'Qos': 'sub-text-vlan24.10.34.24.0',
                    'isEncrypt': '是',
                }, {
                    'id': '213cluster-123',
                    'description': '13',
                    'Qos': 'sub-text-vlan24.10.34.24.0',
                    'isEncrypt': '是',
                },
                {
                    'id': '213cluster-123',
                    'description': '13',
                    'Qos': 'sub-text-vlan24.10.34.24.0',
                    'isEncrypt': '是',
                },
                {
                    'id': '213cluster-123',
                    'description': '13',
                    'Qos': 'sub-text-vlan24.10.34.24.0',
                    'isEncrypt': '是',
                }
            ]
        }
        let { nodeInfo } = this.props
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>卷类型管理</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item>卷类型管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    <div className={styles.queryBar}>
                        <Selector type="Project" data={this.props.subDataProject} value={project} getData={this.getData.bind(this)} />
                        <Input
                            placeholder="卷类型名称"
                            value={name} type="text"
                            onChange={e => this.volumeTypeInputChange(e.target.value)}
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
export default VolumeType;