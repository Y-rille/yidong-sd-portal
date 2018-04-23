import React from 'react';
import { Table, Icon, Divider, Pagination } from 'antd';
import styles from './index.less';

import moment from '../../common/moment'

import * as _ from 'lodash';

export interface UserTableProps {
    goEdit?
    showModal?
    userList?
    page_num?
    page_size?
    goPage?
    goDelete?
}

export default class UserTable extends React.PureComponent<UserTableProps, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    goEdit(e) {
        let userId = e.currentTarget.id
        if (this.props.goEdit) {
            this.props.goEdit(userId)
        }
    }
    showModal(e) {
        let userId = e.currentTarget.id
        if (this.props.showModal) {
            this.props.showModal(userId)
        }
    }
    goDelete(e) {
        let userId = e.currentTarget.id
        let email = e.currentTarget.rel
        if (this.props.goDelete) {
            this.props.goDelete(userId, email)
        }
    }
    goPage(current) {
        if (this.props.goPage) {
            this.props.goPage(current)
        }
    }
    renderTable() {
        const columns = [{
            title: '用户名',
            dataIndex: 'email',
            key: 'email',
            // render: text => <a href="javascript:;">{text}</a>,
            width: '20%'
        }, {
            title: '真实姓名',
            dataIndex: 'name',
            key: 'name',
            width: '15%'
        }, {
            title: '角色',
            dataIndex: '_roles',
            key: '_roles',
            width: '25%'
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            key: 'create_time',
            width: '18%'
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={this.goEdit.bind(this)} id={record.id} href="javascript:;">编辑</a>
                    <Divider type="vertical" />
                    <a onClick={this.showModal.bind(this)} id={record.id} href="javascript:;">修改密码</a>
                    <Divider type="vertical" />
                    <a onClick={this.goDelete.bind(this)} rel={record.name} id={record.id} href="javascript:;" type="vertical">删除</a>
                </span>
            ),
        }];
        let { userList } = this.props
        let base_data = {
            admin: '系统管理员',
            resource: '资源运维人员',
            alarm: '告警运维人员',
            performance: '性能运维人员',
            log: '日志运维人员'
        }
        let userListFix = _.merge({}, userList)
        _.map(userListFix.rows, function (item, index) {
            let _roles = []
            let roles = item.roles.split(',')
            _.map(roles, (items) => {
                _roles.push(base_data[items])
            })
            item._roles = _roles.toString()
            item.create_time = moment.tz(item.create_time, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
            item.key = index + 1
        })
        return (
            <Table
                pagination={false}
                className={styles.table}
                columns={columns} dataSource={userListFix.rows} />
        )
    }
    render() {
        let { page_size, page_num, userList, goPage } = this.props
        return (
            <div className={styles.usertable}>
                {this.renderTable()}
                <Pagination className={styles.pagination} onChange={this.goPage.bind(this)} total={userList.count} current={parseInt(page_num, 10)} pageSize={page_size} showQuickJumper />
            </div>
        );
    }
}