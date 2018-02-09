import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import AzInfo from '../../container/vim/azInfo'
import CompactTable from '../../../../components/CompactTable'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Input } from 'antd';
import styles from '../../style/index.less'
const Option = Select.Option;
class Az extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            AZInputValue: '',
            AZSelectValue: 'region'
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/az/info`)
    }
    AZSelectChange(value) {
        this.setState({
            AZSelectValue: value
        })
    }
    AZInputChange(value) {
        this.setState({
            AZInputValue: value
        })
    }
    handleClick() {
        const { AZInputValue, AZSelectValue } = this.state;
        // console.log(AZInputValue, AZSelectValue)
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
                link: '/resource/vim/2/az/info',
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
        const { AZInputValue, AZSelectValue } = this.state;
        return (
            <div>
                <Switch>
                    <Route path={`${match.url}/info/:azId`} component={AzInfo} />
                    <Route render={() => (
                        <div>
                            <div className={styles.header}>
                                <h1 className={styles.title}>AZ管理</h1>
                                <Breadcrumb>
                                    <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                    <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                    <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                    <Breadcrumb.Item>AZ管理</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div style={{ padding: '20px' }}>
                                <div className={styles.queryBar}>
                                    <Select
                                        value={AZSelectValue}
                                        onChange={this.AZSelectChange.bind(this)}
                                    >
                                        <Option value="region">Region</Option>
                                    </Select>
                                    <Input
                                        placeholder="AZ名称"
                                        value={AZInputValue} type="text"
                                        onChange={e => this.AZInputChange(e.target.value)}
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
            </div>
        );
    }
}
export default Az;