import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
// import MirrorInfo from '../../container/vim/mirrorInfo'
import AzInfo from '../../container/vim/azInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Select, Input, Spin } from 'antd';
const Option = Select.Option;
import CompactTable from '../../../../components/CompactTable/'
import Selector from '../../../../components/Selector'
import styles from '../../style/index.less'
class Mirror extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/mirror/info`)
    }
    getData(value) {
    }
    handleClick() {
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
                {
                    key: 'id',
                    title: '项目',
                    // link: true,
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
            'dataList': [
                {
                    'id': 'xiaojindian4',
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
                    'id': '213cluster',
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
                    'id': '213cluster-123',
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
                    'id': 'lijianguo',
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
                    'id': 'zhangjianjun',
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
                    'id': '213cluster',
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
                    'id': 'xiaojindian4',
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
                    'id': '213cluster',
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
        let { match, nodeInfo } = this.props
        const { menuValue, secondMenuValue, thiredMenuValue, fourthMenuValue } = this.state;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
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
                                {
                                    labelPathArr.map((item, index) => {
                                        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                    })
                                }
                                <Breadcrumb.Item>镜像管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Selector type="Project" data={this.props.subDataProject} actions={this.props.actions} getData={this.getData.bind(this)} />
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