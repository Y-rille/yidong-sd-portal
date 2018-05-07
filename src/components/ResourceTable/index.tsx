import React from 'react';
import { Table, Icon, Divider, Pagination } from 'antd';
import styles from './index.less';

import moment from '../../common/moment'

import * as _ from 'lodash';
// var tData = {
//     'count': 38,
//     'header': [{
//         key: 'id',
//         title: '编号',
//     }, {
//         key: 'name',
//         title: '姓名',
//         link: '/resource/vim/1/host/info'
//     }, {
//         key: 'mobile',
//         title: '电话',
//     }, {
//         key: 'email',
//         title: '邮箱',
//     }, {
//         key: 'cpu',
//         title: 'CPU',
//     }, {
//         key: 'memory',
//         title: '内存',
//     }, {
//         key: 'role',
//         title: '角色',
//     }],
//     'body': [
//         {
//             'id': 100077,
//             'email': 'zhan21@hpe.com',
//             'name': '张三21',
//             'mobile': '15811001101',
//             'cpu': '1/10',
//             'memory': '50%',
//             'role': '管理员',
//             'vm': 20
//         },
//         {
//             'id': 100056,
//             'email': 'dandan',
//             'name': 'admin',
//             'mobile': '13211111111',
//             'cpu': '1/10',
//             'memory': '70%',
//             'role': '普通会员',
//             'vm': 25
//         },
//         {
//             'id': 100003,
//             'email': 'admin@cmp.com',
//             'name': '管理员',
//             'mobile': '13211117890',
//             'cpu': '1/10',
//             'memory': '40%',
//             'role': 'VIP',
//             'vm': 15
//         }
//     ]
// }
export interface UserTableProps {
    goEdit?
    // showModal?
    data?
    page_num?
    page_size?
    goPage?
    goLink?
    goDelete?
    actionAuth?
}

export default class ResourceTable extends React.PureComponent<UserTableProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            page_num: 1,
            page_size: 10,
        };
    }
    goEdit(e) {
        let Id = e.currentTarget.id
        if (this.props.goEdit) {
            this.props.goEdit(Id)
        }
    }
    // showModal(e) {
    //     let userId = e.currentTarget.id
    //     if (this.props.showModal) {
    //         this.props.showModal(userId)
    //     }
    // }
    goDelete(e) {
        let Id = e.currentTarget.id

        if (this.props.goDelete) {
            this.props.goDelete(Id)
        }
    }
    goPage(current) {
        this.setState({ page_num: current })
        if (this.props.goPage) {
            this.props.goPage(current)
        }
    }
    goLink(link, id) {
        this.props.goLink(`${link}/${id}`)
    }
    renderTable() {
        let { actionAuth, data } = this.props
        let header = data.header
        let columns = []
        for (let i = 0; i < header.length; i++) {
            let obj: any = {
                title: header[i].title,
                dataIndex: header[i].key,
                key: header[i].key,
            }
            if (header[i].link) {
                obj.render = (text, record) => <a href="javascript:;" onClick={this.goLink.bind(this, header[i].link, record.id)}>{text}</a>
            }
            columns.push(obj)
        }
        if (actionAuth.length > 0) {
            columns.push({
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        {actionAuth.indexOf('edit') > -1 ? (
                            <a onClick={this.goEdit.bind(this)} id={record.id} href="javascript:;">编辑</a>
                        ) : ''}
                        {actionAuth.length > 1 ? (<Divider type="vertical" />) : ''}
                        {actionAuth.indexOf('delete') > -1 ? (
                            <a onClick={this.goDelete.bind(this)} rel={record.name} id={record.id} href="javascript:;" type="vertical">删除</a>
                        ) : ''}

                    </span>
                )
            })
        }
        let dataList = data.body
        _.map(dataList, function (item: any, index) {
            item.key = item.id
        })
        return (
            <Table
                pagination={false}
                className={styles.table}
                columns={columns} dataSource={dataList} />
        )
    }
    render() {
        let { data, goPage } = this.props
        let { page_size, page_num } = this.state
        return (
            <div className={styles.resourceTable}>
                {this.renderTable()}
                <Pagination className={styles.pagination} onChange={this.goPage.bind(this)} total={data.count} current={parseInt(page_num, 10)} pageSize={page_size} showQuickJumper />
            </div>
        );
    }
}