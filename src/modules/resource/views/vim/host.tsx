import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin } from 'antd';
import HostInfo from './hostInfo'
import ResourceTable from '../../../../components/ResourceTable/'
import styles from '../../style/index.less'
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
    }
    goPage = () => {
        this.props.history.push(`/resource/vim/1/host/info`)
    }
    goLink(url) {
        this.props.history.push(url)
    }
    goDelete = () => { }
    goEdit = () => { }
    render() {
        let { match } = this.props
        return (
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
                <div className={styles.queryBar}>
                    queryBar
                </div>
                <Switch>
                    <Route path={`${match.url}/info`} component={HostInfo} />
                    <Route render={() => (
                        <div>
                            <div onClick={this.goInfo}>详情</div>
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
                        </div>

                    )} />
                </Switch>
            </div>
        );
    }
}
export default Host;