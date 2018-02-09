import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
// import VirtualInfo from '../../container/vim/virtualInfo'
import AzInfo from '../../container/vim/azInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select } from 'antd';
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
const Option = Select.Option;
class Virtual extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            menuValue: 'region',
            secondMenuValue: 'az',
            thiredMenuValue: 'ha',
            fourthMenuValue: 'host'
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/virtual/info`)
    }
    menuChange(value) {
        this.setState({
            menuValue: value
        })
    }

    secondMenuChange(value) {
        this.setState({
            secondMenuValue: value
        })
    }

    thiredMenuChange(value) {
        this.setState({
            thiredMenuValue: value
        })
    }

    fourthMenuChange(value) {
        this.setState({
            fourthMenuValue: value
        })
    }
    handleClick() {
        const { menuValue, secondMenuValue, thiredMenuValue, fourthMenuValue } = this.state;
        // console.log("selectValue:", menuValue, secondMenuValue, thiredMenuValue)
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
            'header': [{
                key: 'id',
                title: '编号',
                fixed: true,
                link: true,
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
        const { menuValue, secondMenuValue, thiredMenuValue, fourthMenuValue } = this.state;
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={AzInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>虚拟机管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>虚拟机管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Select
                                    value={menuValue}
                                    onChange={this.menuChange.bind(this)}
                                >
                                    <Option value="region">Region</Option>
                                </Select>

                                <Select
                                    value={secondMenuValue}
                                    onChange={this.secondMenuChange.bind(this)}
                                >
                                    <Option value="az">AZ</Option>
                                </Select>

                                <Select
                                    value={thiredMenuValue}
                                    onChange={this.thiredMenuChange.bind(this)}
                                >
                                    <Option value="ha">HA</Option>
                                </Select>

                                <Select
                                    value={fourthMenuValue}
                                    onChange={this.fourthMenuChange.bind(this)}
                                >
                                    <Option value="host">Host</Option>
                                </Select>

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
export default Virtual;