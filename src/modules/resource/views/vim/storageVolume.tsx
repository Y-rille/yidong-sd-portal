import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import StorageVolumeInfo from '../../container/vim/storageVolumeInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Input } from 'antd';
const Option = Select.Option;
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
class StorageVolume extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            storageVolumeInputValue: '',
            storageVolumeSelectValue: 'project'
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/storage_volume/info`)
    }
    storageVolumeSelectChange(value) {
        this.setState({
            storageVolume: value
        })
    }
    storageVolumeInputChange(value) {
        this.setState({
            storageVolumeInputValue: value
        })
    }
    handleClick() {
        const { storageVolumeInputValue, storageVolumeSelectValue } = this.state;
        // console.log(storageVolumeInputValue, storageVolumeSelectValue, 'ppp')
    }
    goPage() {

    }
    goLink(key, obj) {
        let { match } = this.props
        // if (key === 'id') {
        //     this.props.history.push(`${match.url}/info/${obj.id}`)
        // }
    }
    render() {
        let { match } = this.props;
        const { storageVolumeInputValue, storageVolumeSelectValue } = this.state;
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
        return (

            <Switch>
                <Route path={`${match.url}/info/:id`} component={StorageVolumeInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>存储卷管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>存储卷管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Select
                                    value={storageVolumeSelectValue}
                                    onChange={this.storageVolumeSelectChange.bind(this)}
                                >
                                    <Option value="project">project</Option>
                                </Select>
                                <Input
                                    placeholder="存储卷名称"
                                    value={storageVolumeInputValue} type="text"
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
                            <CompactTable
                                goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                data={tdata}
                                pageAuth={true}
                                actionAuth={[]}
                            />
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default StorageVolume;