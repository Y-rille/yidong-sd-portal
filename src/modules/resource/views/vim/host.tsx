import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import ResourceTable from '../../../../components/ResourceTable/'
import CompactTable from '../../../../components/CompactTable/'
import HostInfo from '../../container/vim/hostInfo'
import { Row, Col, Breadcrumb, Icon, Radio, Spin, Select, Button } from 'antd';
import styles from '../../style/index.less'
// import HostQueryBar from '../../../../components/HostQueryBar/'
const Option = Select.Option;

var tData = {
    'count': 38,
    'header': [{
        key: 'id',
        title: '编号',
    }, {
        key: 'name',
        title: '姓名',
        link: '/resource/vim/1/host/info'
    }, {
        key: 'mobile',
        title: '电话',
    }, {
        key: 'email',
        title: '邮箱',
    }, {
        key: 'cpu',
        title: 'CPU',
    }, {
        key: 'memory',
        title: '内存',
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
            'name': 'admin',
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
        }
    ]
}

class Host extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            menuValue: '1',
            secondMenuValue: '1',
            thiredMenuValue: '1'
        }
    }
    menuChange(value) {
        const { menuValue } = this.state;
        this.setState({
            menuValue: value
        })
    }

    secondMenuChange(value) {
        const { secondMenuValue } = this.state;
        this.setState({
            secondMenuValue: value
        })
    }

    thiredMenuChange(value) {
        const { thiredMenuValue } = this.state;
        this.setState({
            thiredMenuValue: value
        })
    }

    handleClick() {
        const { menuValue, secondMenuValue, thiredMenuValue } = this.state;
        // console.log("selectValue:", menuValue, secondMenuValue, thiredMenuValue)
    }
    goPage = () => {
        // this.props.history.push(`/resource/vim/1/host/info`)
    }
    goLink(url) {
        this.props.history.push(url)
    }
    goDelete = () => { }
    goEdit = () => { }
    onChange = () => { }
    render() {
        let { match } = this.props;
        const { menuValue, secondMenuValue, thiredMenuValue } = this.state;
        return (
            <Switch>
                <Route path={`${match.url}/info`} component={HostInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>主机列表</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>主机列表</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Select
                                    value={menuValue}
                                    onChange={this.menuChange.bind(this)}
                                    style={{ width: 120 }}>
                                    <Option value="1">H1</Option>
                                    <Option value="2">H2</Option>
                                    <Option value="3">H3</Option>
                                </Select>

                                <Select
                                    value={secondMenuValue}
                                    onChange={this.secondMenuChange.bind(this)}
                                    style={{ width: 120, marginLeft: 10 }}>
                                    <Option value="1">K1</Option>
                                    <Option value="2">K2</Option>
                                    <Option value="3">K3</Option>
                                </Select>

                                <Select
                                    value={thiredMenuValue}
                                    onChange={this.thiredMenuChange.bind(this)}
                                    style={{ width: 120, marginLeft: 10 }}>
                                    <Option value="1">Z1</Option>
                                    <Option value="2">Z2</Option>
                                    <Option value="3">Z3</Option>
                                </Select>

                                <Button
                                    type="primary"
                                    style={{ marginLeft: 10 }}
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                                </Button>
                            </div>
                            <Radio.Group onChange={this.onChange.bind(this)} style={{ marginBottom: 16 }}>
                                <Radio.Button value="small">控制节点</Radio.Button>
                                <Radio.Button value="default">计算节点</Radio.Button>
                                <Radio.Button value="large">存储节点</Radio.Button>
                            </Radio.Group>
                            <div>
                                <ResourceTable
                                    goDelete={this.goDelete.bind(this)}
                                    goEdit={this.goEdit.bind(this)}
                                    goPage={this.goPage.bind(this)} // 翻页
                                    goLink={this.goLink.bind(this)}
                                    page_num={1}
                                    page_size={10}
                                    data={tData}
                                    actionAuth={['edit', 'delete']}
                                />
                                <br />
                                <CompactTable
                                    goPage={this.goPage.bind(this)} // 翻页
                                    goLink={this.goLink.bind(this)}
                                    page_num={1}
                                    page_size={10}
                                    data={null}
                                    actionAuth={[]}
                                />
                            </div>
                        </div>

                    </div>
                )} />
            </Switch>

        );
    }
}
export default Host;