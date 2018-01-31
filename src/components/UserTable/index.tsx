import React from 'react';
import { Table, Icon, Divider, Pagination } from 'antd';
import styles from './index.less';

// const { showModal } = this.props

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '3',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '4',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '5',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '6',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '7',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '8',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '9',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '10',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    }
];

export interface UserTableProps {
    data?
    showModal
    goEdit
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
    render() {
        const columns = [{
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '真实姓名',
            dataIndex: 'age',
            key: 'age',
        }, {
            title: '角色',
            dataIndex: 'address',
            key: 'address',
        }, {
        }, {
            title: '创建时间',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={this.goEdit.bind(this)} href="javascript:;">编辑</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">重置密码</a>
                    <Divider type="vertical" />
                    <a href="javascript:;" type="vertical">删除</a>
                </span>
            ),
        }];
        return (
            <div>
                <Table pagination={false} className={styles.table} columns={columns} dataSource={data} />
                <Pagination className={styles.pagination} total={50} pageSize={10} showSizeChanger showQuickJumper />
            </div>
        );
    }
}