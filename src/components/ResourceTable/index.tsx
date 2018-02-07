import React from 'react';
import { Table, Icon, Divider, Pagination } from 'antd';
import styles from './index.less';

import moment from '../../common/moment'

import * as _ from 'lodash';

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
                        {actionAuth.indexOf('edit') > -1 ? (<Divider type="vertical" />) : ''}
                        {actionAuth.indexOf('delete') > -1 ? (
                            <a onClick={this.goDelete.bind(this)} rel={record.name} id={record.id} href="javascript:;" type="vertical">删除</a>
                        ) : ''}

                    </span>
                )
            })
        }
        // const columns = [{
        //     title: '用户名',
        //     dataIndex: 'email',
        //     key: 'email',
        //     render: text => <a href="javascript:;">{text}</a>,
        //     width: '20%'
        // }];
        let dataList = data.body

        _.map(dataList, function (item, index) {

            // item._roles = _roles.toString()
            // item.create_time = moment.tz(item.create_time, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
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
        let { page_size, page_num, data, goPage } = this.props
        return (
            <div className={styles.resourceTable}>
                {this.renderTable()}
                <Pagination className={styles.pagination} onChange={this.goPage.bind(this)} total={data.count} current={parseInt(page_num, 10)} pageSize={page_size} showQuickJumper />
            </div>
        );
    }
}