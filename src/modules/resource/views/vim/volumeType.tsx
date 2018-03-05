import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import VolumeTypeInfo from '../../container/vim/volumeTypeInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Input } from 'antd';
const Option = Select.Option;
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'

import Selector from '../../../../components/Selector'
import { ResourceActions } from '../../actions/index'
export interface VolumeTypeProps {
    location?,
    history?,
    actions: ResourceActions,
    match,
    subDataProject?,
}

class VolumeType extends React.Component<VolumeTypeProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            volumeTypeInputValue: '',
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/volume_type/info`)
    }
    volumeTypeInputChange(value) {
        this.setState({
            volumeTypeInputValue: value
        })
    }
    handleClick() {
        const { volumeTypeInputValue } = this.state;
        // console.log(volumeTypeInputValue, volumeTypeSelectValue, 'ppp')
    }
    goPage() {

    }
    goLink(key, obj) {
        let { match } = this.props
        // if (key === 'id') {
        //     this.props.history.push(`${match.url}/info/${obj.id}`)
        // }
    }
    getData() {

    }
    render() {
        let { match } = this.props
        const { volumeTypeInputValue, volumeTypeSelectValue } = this.state;
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
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={VolumeTypeInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>卷类型管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>卷类型管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Selector type="Project" data={this.props.subDataProject} actions={this.props.actions} getData={this.getData.bind(this)} />
                                <Input
                                    placeholder="卷类型名称"
                                    value={volumeTypeInputValue} type="text"
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
export default VolumeType;