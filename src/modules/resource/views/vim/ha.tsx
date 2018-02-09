import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
// import HaInfo from '../../container/vim/haInfo'
import AzInfo from '../../container/vim/azInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Select, Input } from 'antd';
import styles from '../../style/index.less';
import Headline from '../../../../components/Headline/';
import Summaries from '../../../../components/Summaries/';
import CompactTable from '../../../../components/CompactTable/'
const Option = Select.Option;
class Ha extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            HAInputValue: '',
            HASelectValue: 'region'
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/ha/info`)
    }
    HASelectChange(value) {
        this.setState({
            HASelectValue: value
        })
    }
    HAInputChange(value) {
        this.setState({
            HAInputValue: value
        })
    }
    handleClick() {
        const { HAInputValue, HASelectValue } = this.state;
        // console.log(HAInputValue, HASelectValue)
    }
    goPage() {

    }
    goLink(url) {
        this.props.history.push(url)
    }
    render() {
        let { match } = this.props;
        const { HAInputValue, HASelectValue } = this.state;
        let tdata = {
            'count': 17,
            'header': [{
                key: 'id',
                title: '编号',
                fixed: true,
                link: '/resource/vim/1/ha/info',
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
        return (
            <Switch>
                <Route path={`${match.url}/info/:haId`} component={AzInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>HA管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>HA管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <Headline title="基本信息" />
                            <Summaries colNum={5} />
                            <Headline title="主机" />
                            <div className={styles.queryBar}>
                                <Select
                                    value={HASelectValue}
                                    onChange={this.HASelectChange.bind(this)}
                                >
                                    <Option value="region">Region</Option>
                                </Select>
                                <Input
                                    placeholder="HA名称"
                                    value={HAInputValue} type="text"
                                    onChange={e => this.HAInputChange(e.target.value)}
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
                                pageAuth={false}
                                actionAuth={[]}
                            />
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Ha;