import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
// import MirrorInfo from '../../container/vim/mirrorInfo'
import AzInfo from '../../container/vim/azInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Select, Input, Spin } from 'antd';
const Option = Select.Option;
import CompactTable from '../../../../components/CompactTable/'
import styles from '../../style/index.less'
class Mirror extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            menuValue: 'project'
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/mirror/info`)
    }
    menuChange(value) {
        this.setState({
            menuValue: value
        })
    }
    handleClick() {
        const { menuValue } = this.state;
        // console.log("selectValue:", menuValue)
    }
    goPage() {
    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'id') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    render() {
        let tData = {
            'count': 17,
            'header': [
                // {
                //     key: 'id',
                //     title: '虚拟机名称',
                //     link: true,
                //     fixed: true,
                // },
                {
                    key: 'mobile',
                    title: '项目',
                }, {
                    key: 'name',
                    title: '名称',
                }, {
                    key: 'type',
                    title: '类型'
                }, {
                    key: 'memory',
                    title: '状态'
                },
                {
                    key: 'cache',
                    title: 'RAW cache',
                }, {
                    key: 'public',
                    title: '是否公开'
                }, {
                    key: 'proteted',
                    title: '是否proteted ',
                },
                {
                    key: 'format',
                    title: '格式',
                }, {
                    key: 'size',
                    title: '大小（MB)'
                }],
            'body': [
                {
                    'mobile': 'xiaojindian4',
                    'name': 'cirros',
                    'type': '镜像',
                    'memory': '运行',
                    'cache': '不可用',
                    'public': 'Yes',
                    'proteted': 'Yes',
                    'format': 'QCOW2',
                    'size': '18'
                },
                {
                    'mobile': '213cluster',
                    'name': 'cirros',
                    'type': '镜像',
                    'memory': '运行',
                    'cache': '不可用',
                    'public': 'Yes',
                    'proteted': 'Yes',
                    'format': 'QCOW2',
                    'size': '18'
                },
                {
                    'mobile': 'xiaojindian4',
                    'name': 'cirros',
                    'type': '镜像',
                    'memory': '运行',
                    'cache': '不可用',
                    'public': 'Yes',
                    'proteted': 'Yes',
                    'format': 'QCOW2',
                    'size': '18'
                },
                {
                    'mobile': '213cluster',
                    'name': 'cirros',
                    'type': '镜像',
                    'memory': '运行',
                    'cache': '不可用',
                    'public': 'Yes',
                    'proteted': 'Yes',
                    'format': 'QCOW2',
                    'size': '18'
                },
                {
                    'mobile': 'xiaojindian4',
                    'name': 'cirros',
                    'type': '镜像',
                    'memory': '运行',
                    'cache': '不可用',
                    'public': 'Yes',
                    'proteted': 'Yes',
                    'format': 'QCOW2',
                    'size': '18'
                },
                {
                    'mobile': '213cluster',
                    'name': 'cirros',
                    'type': '镜像',
                    'memory': '运行',
                    'cache': '不可用',
                    'public': 'Yes',
                    'proteted': 'Yes',
                    'format': 'QCOW2',
                    'size': '18'
                },
                {
                    'mobile': 'xiaojindian4',
                    'name': 'cirros',
                    'type': '镜像',
                    'memory': '运行',
                    'cache': '不可用',
                    'public': 'Yes',
                    'proteted': 'Yes',
                    'format': 'QCOW2',
                    'size': '18'
                },
                {
                    'mobile': '213cluster',
                    'name': 'cirros',
                    'type': '镜像',
                    'memory': '运行',
                    'cache': '不可用',
                    'public': 'Yes',
                    'proteted': 'Yes',
                    'format': 'QCOW2',
                    'size': '18'
                },
            ]
        }
        let { match } = this.props
        const { menuValue } = this.state;
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={AzInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>镜像管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>镜像管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Select
                                    value={menuValue}
                                    onChange={this.menuChange.bind(this)}
                                >
                                    <Option value="project">project</Option>
                                </Select>
                                <Input placeholder="镜像名称" />
                                <Button
                                    type="primary"
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                                </Button>
                                <Button style={{ float: 'right' }}
                                    type="primary"
                                >
                                    管理
                            </Button>
                            </div>
                            <CompactTable
                                outStyle={{ marginTop: '20px' }}
                                goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                data={tData}
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
export default Mirror;