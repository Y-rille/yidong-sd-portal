import React from 'react';
import { Table, Icon, Divider, Pagination } from 'antd';
import styles from './index.less';

const columns = [
    {
        title: '系统日志',
        dataIndex: 'systemlog',
        key: 'systemlog',
        render: text => <a href="javascript:;">{text}</a>,
    }, {
        title: '操作日志',
        dataIndex: 'handlelog',
        key: 'handlelog',
    }, {
        title: '安全日志',
        dataIndex: 'safelog',
        key: 'safelog',
    }
];

const data = [
    {
        key: '1',
        systemlog: 'ddddddddd',
        handlelog: '操作',
        safelog: '安全',
    }, {
        key: '2',
        systemlog: 'ddddddddd',
        handlelog: '操作',
        safelog: '安全',
    }, {
        key: '3',
        systemlog: 'ddddddddd',
        handlelog: '操作',
        safelog: '安全',
    }, {
        key: '4',
        systemlog: 'ddddddddd',
        handlelog: '操作',
        safelog: '安全',
    }, {
        key: '5',
        systemlog: 'ddddddddd',
        handlelog: '操作',
        safelog: '安全',
    }, {
        key: '6',
        systemlog: 'ddddddddd',
        handlelog: '操作',
        safelog: '安全',
    }, {
        key: '7',
        systemlog: 'ddddddddd',
        handlelog: '操作',
        safelog: '安全',
    }, {
        key: '8',
        systemlog: 'ddddddddd',
        handlelog: '操作',
        safelog: '安全',
    }, {
        key: '9',
        systemlog: 'ddddddddd',
        handlelog: '操作',
        safelog: '安全',
    }, {
        key: '10',
        systemlog: 'ddddddddd',
        handlelog: '操作',
        safelog: '安全',
    }
];

export interface LogTableProps {
    data?
}

export default class LogTable extends React.PureComponent<LogTableProps, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className={styles.logtable}>
                <Table pagination={false} className={styles.table} columns={columns} dataSource={data} />
                <Pagination className={styles.pagination} total={50} pageSize={10} showSizeChanger showQuickJumper />
            </div>
        );
    }
}