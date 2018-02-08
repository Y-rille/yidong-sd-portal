import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import ResourceTable from '../../../../components/ResourceTable/'
import HostInfo from '../../container/vim/hostInfo'
import { Row, Col, Breadcrumb, Icon, Radio, Spin, Select, Button, Tabs } from 'antd';
import styles from '../../style/index.less'
// import HostQueryBar from '../../../../components/HostQueryBar/'
const Option = Select.Option;
const TabPane = Tabs.TabPane;

var tData = {
    'count': 8,
    'header': [{
        key: 'name',
        title: '姓名',
        link: '/resource/vim/1/host/info'
    }, {
        key: 'mobile',
        title: '电话',
    }, {
        key: 'email',
        title: '邮箱',
    }],
    'body': [
        { 'id': 10000077, 'email': 'zhan21@hpe.com', 'roles': 'admin,alarm', 'name': '张三21', 'mobile': '15811001101', 'remark': '新建功能，试一试~', 'create_time': '2018-02-07 13:38:50' },
        { 'id': 10000056, 'email': 'dandan', 'roles': 'admin', 'name': 'admin', 'mobile': '13211111111', 'remark': 'some remark', 'create_time': '2018-02-06 18:24:59' },
        { 'id': 10000003, 'email': 'admin@cmp.com', 'roles': 'admin', 'name': '管理员', 'mobile': '13211111111', 'remark': 'some remark', 'create_time': '2018-02-03 10:47:07' }
    ]
}

class Host extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            menuValue: 'region',
            secondMenuValue: 'az',
            thiredMenuValue: 'ha'
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
        this.props.history.push(`/resource/vim/1/host/info`)
    }
    goLink(url) {
        this.props.history.push(url)
    }
    goDelete = () => { }
    goEdit = () => { }
    onChange() {

    }
    render() {
        let { match } = this.props;
        const { menuValue, secondMenuValue, thiredMenuValue } = this.state;
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={HostInfo} />
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
                                    <Option value="region">Region</Option>
                                </Select>

                                <Select
                                    value={secondMenuValue}
                                    onChange={this.secondMenuChange.bind(this)}
                                    style={{ width: 120, marginLeft: 10 }}>
                                    <Option value="az">AZ</Option>
                                </Select>

                                <Select
                                    value={thiredMenuValue}
                                    onChange={this.thiredMenuChange.bind(this)}
                                    style={{ width: 120, marginLeft: 10 }}>
                                    <Option value="ha">HA</Option>
                                </Select>

                                <Button
                                    type="primary"
                                    style={{ marginLeft: 10 }}
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                                </Button>
                            </div>
                            <Tabs onChange={this.onChange.bind(this)} type="card">
                                <TabPane tab="控制节点" key="1">
                                    <ResourceTable
                                        goDelete={this.goDelete.bind(this)}
                                        goEdit={this.goEdit.bind(this)}
                                        goPage={this.goPage.bind(this)} // 翻页
                                        goLink={this.goLink.bind(this)}
                                        page_num={1}
                                        page_size={10}
                                        data={tData}
                                        showAuth={['id', 'mobile', 'name', 'email']}
                                        actionAuth={[]}
                                    />
                                </TabPane>
                                <TabPane tab="计算节点" key="2">计算节点</TabPane>
                                <TabPane tab="存储节点" key="3">存储节点</TabPane>
                            </Tabs>
                            <div>

                            </div>
                        </div>

                    </div>
                )} />
            </Switch>

        );
    }
}
export default Host;