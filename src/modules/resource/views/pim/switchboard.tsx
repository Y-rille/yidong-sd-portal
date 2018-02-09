import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SwitchboardInfo from '../../container/pim/switchboardInfo'
import CompactTable from '../../../../components/CompactTable'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Cascader, Input } from 'antd';
import styles from '../../style/index.less'

class Switchboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            dataValue: ['数据中心'],
            nameValue: ''
        };
    }
    goInfo = () => {
        this.props.history.push(`/resource/pim/1/switchboard/info`)
    }
    onDataChange(value) {
        this.setState({
            dataValue: value
        })
    }
    onNameChange(value) {
        this.setState({
            nameValue: value
        })
    }
    handleClick() {
        const { dataValue, nameValue } = this.state;
        // console.log(dataValue, nameValue)
    }
    goPage = () => {

    }
    goLink(url) {
        this.props.history.push(url)
    }
    render() {
        let tdata = {
            'count': 17,
            'header': [{
                key: 'id',
                title: '编号',
                fixed: true,
                link: '/resource/pim/3/switchboard/info',
            }, {
                key: 'name',
                title: '姓名',
                fixed: true,
            }, {
                key: 'mobile',
                title: '电话',
            }, {
                key: 'vm',
                title: 'VM值'
            },
            {
                key: 'email',
                title: '邮箱',
            }, {
                key: 'cpu',
                title: 'CPU'
            }, {
                key: 'memory',
                title: '内存'
            }, {
                key: 'role',
                title: '角色',
            }],
            'body': [
                {
                    'id': 100077,
                    'email': 'zhan21@hpe.com',
                    'name': '张三21',
                    'mobile': '15811001101',
                    'cpu': '1/10',
                    'memory': '50%',
                    'role': '管理员',
                    'vm': 20
                },
                {
                    'id': 100056,
                    'email': 'dandan',
                    'name': '用户1',
                    'mobile': '13211111111',
                    'cpu': '1/10',
                    'memory': '70%',
                    'role': '普通会员',
                    'vm': 25
                },
                {
                    'id': 100003,
                    'email': 'admin@cmp.com',
                    'name': '管理员',
                    'mobile': '13211117890',
                    'cpu': '1/10',
                    'memory': '40%',
                    'role': 'VIP',
                    'vm': 15
                },
                {
                    'id': 100005,
                    'email': 'admin@cmp.com',
                    'name': '会员6',
                    'mobile': '13211127890',
                    'cpu': '3/10',
                    'memory': '55%',
                    'role': '普通会员',
                    'vm': 13
                },
                {
                    'id': 100025,
                    'email': 'admin3@cmp.com',
                    'name': '会员1',
                    'mobile': '13311127890',
                    'cpu': '3/10',
                    'memory': '65%',
                    'role': '普通会员',
                    'vm': 13
                },
                {
                    'id': 100075,
                    'email': 'admin3@cmp.com',
                    'name': '会员8',
                    'mobile': '13911127890',
                    'cpu': '4/10',
                    'memory': '25%',
                    'role': '普通会员',
                    'vm': 21
                },
                {
                    'id': 100575,
                    'email': 'admin8@cmp.com',
                    'name': '会员10',
                    'mobile': '18811127890',
                    'cpu': '4/10',
                    'memory': '45%',
                    'role': '普通会员',
                    'vm': 22
                }
            ]
        }
        let { match } = this.props;
        const { dataValue, nameValue } = this.state;
        const DataCenter = [{
            value: '数据中心1',
            label: '数据中心1',
            children: [{
                value: '机房1',
                label: '机房1',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房2',
                label: '机房2',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房3',
                label: '机房3',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }],
        }, {
            value: '数据中心2',
            label: '数据中心2',
            children: [{
                value: '机房1',
                label: '机房1',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房2',
                label: '机房2',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房3',
                label: '机房3',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }],
        }];
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={SwitchboardInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>交换机管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>物理部署组织</Breadcrumb.Item>
                                <Breadcrumb.Item>交换机管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Cascader
                                    options={DataCenter}
                                    onChange={this.onDataChange.bind(this)}
                                    placeholder={dataValue}
                                />
                                <Input
                                    placeholder="名称，编号"
                                    value={nameValue} type="text"
                                    onChange={this.onNameChange.bind(this)}
                                />
                                <Button
                                    type="primary"
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                                </Button>
                            </div>
                            <CompactTable
                                goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                data={tdata}
                                pageAuth={true}
                                actionAuth={['delete']}
                            />
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Switchboard;