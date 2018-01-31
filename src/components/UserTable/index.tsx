import React from 'react';
import { Table, Icon, Divider, Pagination } from 'antd';
import styles from './index.less';

// const { showModal } = this.props
import * as _ from 'lodash';

const columns = [{
    title: '用户名',
    dataIndex: 'email',
    key: 'email',
    render: text => <a href="javascript:;">{text}</a>,
}, {
    title: '真实姓名',
    dataIndex: 'name',
    key: 'name',
}, {
    title: '角色',
    dataIndex: '_roles',
    key: '_roles',
}, {
}, {
    title: '创建时间',
    dataIndex: 'create_time',
    key: 'create_time',
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="javascript:;">编辑</a>
            <Divider type="vertical" />
            <a href="javascript:;">重置密码</a>
            <Divider type="vertical" />
            <a href="javascript:;" type="vertical">删除</a>
        </span>
    ),
}];

export interface UserTableProps {
    showModal
    goEdit
    userList?
    page_num?
    page_size?
    goPage?
}

export default class UserTable extends React.PureComponent<UserTableProps, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    goEdit() {
        this.props.goEdit();
    }
    goPage(current) {

        if (this.props.goPage) {
            this.props.goPage(current)
        }
    }
    renderTable() {
        let { userList } = this.props
        let base_data = {
            admin: '系统运维',
            resource: '资源运维',
            alarm: '告警运维',
            performance: '性能运维'
        }
        _.map(userList.rows, function (item, index) {
            let key = index + 1
            item._roles = item.roles
            item.key = key
        })
        return (
            <Table
                pagination={false}
                className={styles.table}
                columns={columns} dataSource={userList.rows} />
        )
    }
    render() {
        let { page_size, page_num, userList, goPage } = this.props
        return (
            <div>
                {this.renderTable()}
                <Pagination className={styles.pagination} onChange={this.goPage.bind(this)} total={userList.count} current={page_num} pageSize={page_size} showQuickJumper />
            </div>
        );
    }
}