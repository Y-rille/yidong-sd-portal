import React from 'react';
import { Table, Icon, Divider, Pagination } from 'antd';
import styles from './index.less';
import * as _ from 'lodash';
import moment from '../../common/moment'

export interface LogTableProps {
    logList?
    page_num?
    page_size?
    goPage?
}

export default class LogTable extends React.PureComponent<LogTableProps, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    goPage(current) {
        if (this.props.goPage) {
            this.props.goPage(current)
        }
    }

    renderLogTable() {
        const columns = [
            {
                title: 'LOG.ID',
                dataIndex: 'id',
                key: 'id',
                width: '15%'
            }, {
                title: '用户名',
                dataIndex: 'email',
                key: 'email',
                width: '25%'
            }, {
                title: '真实姓名',
                dataIndex: 'name',
                key: 'name',
                width: '20%'
            }, {
                title: '事件',
                dataIndex: 'action',
                key: 'action',
                width: '20%'
            }, {
                title: '时间',
                dataIndex: 'create_time',
                key: 'create_time',
            }
        ];
        let data = this.props.logList.rows
        let obj = {}
        let arr = []
        data.map((item, index) => {
            let time = item.create_time
            let timeshow = moment.tz(time, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
            obj = {
                key: index,
                id: item.id,
                email: item.user.email,
                name: item.user.name,
                action: item.action,
                create_time: timeshow,
                id: item.id,
            }
            arr.push(obj)
        })
        return (
            <Table
                pagination={false}
                className={styles.logtable}
                columns={columns} dataSource={arr} />
        )
    }
    render() {
        let { page_size, page_num, logList, goPage } = this.props
        return (
            <div className={styles.logtable}>
                {this.renderLogTable()}
                <Pagination className={styles.pagination} onChange={this.goPage.bind(this)} total={logList.count} current={parseInt(page_num, 10)} pageSize={page_size} showQuickJumper />
            </div>
        );
    }
}