import React from 'react';
import { Table, Icon, Divider, Pagination } from 'antd';
import styles from './index.less';
import moment from '../../common/moment'
import * as _ from 'lodash';

export interface CompactTableProps {
    goEdit?
    // showModal?
    data?
    page_num?
    page_size?
    goPage?
    goLink?
    goDelete?
    actionAuth?
    pageAuth?
    footInfoAuth?
    outStyle?
}

export default class CompacteTable extends React.PureComponent<CompactTableProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            page_num: 1,
            page_size: 10,
        };
    }
    static defaultProps = {
        data: {
            'count': 17,
            'header': [{
                key: 'id',
                title: '编号',
                fixed: true,
                link: true,
            }, {
                key: 'name',
                title: '姓名',
                fixed: true,
                link: true,
            }, {
                key: 'mobile',
                title: '电话',
            }, {
                key: 'vm',
                title: 'VM值'
            },
            {
                key: 'email',
                title: '邮箱',
            }, {
                key: 'cpu',
                title: 'CPU'
            }, {
                key: 'memory',
                title: '内存'
            }, {
                key: 'role',
                title: '角色',
            }],
            'body': [
                {
                    'id': 100077,
                    'email': 'zhan21@hpe.com',
                    'name': '张三21',
                    'mobile': '15811001101',
                    'cpu': '1/10',
                    'memory': '50%',
                    'role': '管理员',
                    'vm': 20
                },
                {
                    'id': 100056,
                    'email': 'dandan',
                    'name': '用户1',
                    'mobile': '13211111111',
                    'cpu': '1/10',
                    'memory': '70%',
                    'role': '普通会员',
                    'vm': 25
                },
                {
                    'id': 100003,
                    'email': 'admin@cmp.com',
                    'name': '管理员',
                    'mobile': '13211117890',
                    'cpu': '1/10',
                    'memory': '40%',
                    'role': 'VIP',
                    'vm': 15
                },
                {
                    'id': 100005,
                    'email': 'admin@cmp.com',
                    'name': '会员6',
                    'mobile': '13211127890',
                    'cpu': '3/10',
                    'memory': '55%',
                    'role': '普通会员',
                    'vm': 13
                },
                {
                    'id': 100025,
                    'email': 'admin3@cmp.com',
                    'name': '会员1',
                    'mobile': '13311127890',
                    'cpu': '3/10',
                    'memory': '65%',
                    'role': '普通会员',
                    'vm': 13
                },
                {
                    'id': 100075,
                    'email': 'admin3@cmp.com',
                    'name': '会员8',
                    'mobile': '13911127890',
                    'cpu': '4/10',
                    'memory': '25%',
                    'role': '普通会员',
                    'vm': 21
                },
                {
                    'id': 100575,
                    'email': 'admin8@cmp.com',
                    'name': '会员10',
                    'mobile': '18811127890',
                    'cpu': '4/10',
                    'memory': '45%',
                    'role': '普通会员',
                    'vm': 22
                }
            ]
        }
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
    goLink(key, obj) {
        this.props.goLink(key, obj)
    }
    renderTable() {
        let { actionAuth, data } = this.props
        let header = data.header
        let dataList = data.body
        let columns = []
        for (let i = 0; i < header.length; i++) {
            let obj: any = {
                title: header[i].title,
                dataIndex: header[i].key,
                key: header[i].key,
                fixed: header[i].fixed ? 'left' : null,
                width: header[i].fixed ? 100 : null,
                // sorter: header[i].sorter ? (a, b) => a[header[i].key] - b[header[i].key] : null,
            }
            if (header[i].link) {
                obj.render = (text, record) => <a href="javascript:;" onClick={this.goLink.bind(this, header[i].key, record)}>{text}</a>
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
        // const columns = [{
        //     title: '用户名',
        //     dataIndex: 'email',
        //     key: 'email',
        //     render: text => <a href="javascript:;">{text}</a>,
        //     width: '20%'
        // }];

        _.map(dataList, function (item: any, index) {

            // item._roles = _roles.toString()
            // item.create_time = moment.tz(item.create_time, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
            item.key = item.id
        })

        let area: any = {}
        switch (true) {
            case header.length > 6 && header.length <= 10:
                area = { x: 1100 }
                break;
            case header.length > 10:
                area = { x: 1800 }
                break;
            default:
                break;
        }

        return (
            <Table size="small" scroll={area}
                pagination={false}
                className={styles.smalltable}
                columns={columns}
                dataSource={dataList} />
        )
    }
    render() {
        let { data, goPage, pageAuth, footInfoAuth, outStyle } = this.props
        let { page_size, page_num } = this.state
        let count = data.count
        return (
            <div className={styles.compactTable} style={outStyle}>
                {this.renderTable()}
                <div className={styles.tfooter}>
                    {footInfoAuth ? (<div>* 底部信息</div>) : ''}
                    {(pageAuth && count > page_size) ? (
                        <div>
                            <Pagination size="small"
                                className={styles.pagination}
                                onChange={this.goPage.bind(this)}
                                total={count}
                                current={parseInt(page_num, 10)}
                                pageSize={page_size}
                                showQuickJumper />
                        </div>
                    ) : ''}
                </div>

            </div>
        );
    }
}