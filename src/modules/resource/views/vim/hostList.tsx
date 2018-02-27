import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
// import ResourceTable from '../../../../components/ResourceTable/'
import CompactTable from '../../../../components/CompactTable/'
import HostInfo from '../../container/vim/hostInfo'
import { Row, Col, Breadcrumb, Icon, Radio, Spin, Select, Button, Tabs } from 'antd';
import styles from '../../style/index.less'
// import HostQueryBar from '../../../../components/HostQueryBar/'
const Option = Select.Option;
const TabPane = Tabs.TabPane;

// var tData = {
//     'count': 8,
//     'header': [{
//         key: 'name',
//         title: '姓名',
//         link: '/resource/vim/1/host/info'
//     }, {
//         key: 'mobile',
//         title: '电话',
//     }, {
//         key: 'email',
//         title: '邮箱',
//     }],
//     'body': [
//         { 'id': 10000077, 'email': 'zhan21@hpe.com', 'roles': 'admin,alarm', 'name': '张三21', 'mobile': '15811001101', 'remark': '新建功能，试一试~', 'create_time': '2018-02-07 13:38:50' },
//         { 'id': 10000056, 'email': 'dandan', 'roles': 'admin', 'name': 'admin', 'mobile': '13211111111', 'remark': 'some remark', 'create_time': '2018-02-06 18:24:59' },
//         { 'id': 10000003, 'email': 'admin@cmp.com', 'roles': 'admin', 'name': '管理员', 'mobile': '13211111111', 'remark': 'some remark', 'create_time': '2018-02-03 10:47:07' }
//     ]
// }

class Host extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    goPage = () => {
        // this.props.history.push(`/resource/vim/1/host/info`)
    }
    goLink(key, obj) {
        let { pathname } = this.props.location
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/vim/:id'
        })
        if (key === 'name') {
            this.props.history.replace(`/resource/vim/${mp_node.params.id}/host/info/${obj.name}`)
        }
    }
    goDelete = () => { }
    goEdit = () => { }
    render() {
        let { match, data } = this.props;
        const { menuValue, secondMenuValue, thiredMenuValue } = this.state;
        return (
            <div>
                {/* <ResourceTable
                    goDelete={this.goDelete.bind(this)}
                    goEdit={this.goEdit.bind(this)}
                    goPage={this.goPage.bind(this)} // 翻页
                    goLink={this.goLink.bind(this)}
                    data={tData}
                    showAuth={['id', 'mobile', 'name', 'email']}
                    actionAuth={[]}
                />
                <br /> */}
                <CompactTable
                    goPage={this.goPage.bind(this)} // 翻页
                    goLink={this.goLink.bind(this)}
                    data={data}
                    actionAuth={[]}
                    pageAuth={true}
                    outStyle={{ 'marginTop': '20px' }}
                />
            </div>

        );
    }
}
export default Host;