import React from 'react';
import { Table, Icon, Divider, Pagination } from 'antd';
import styles from './index.less';
import moment from '../../common/moment'
import * as _ from 'lodash';

export interface CompactTableProps {
    goEdit?
    // showModal?
    data?
    // page_num?
    // page_size?
    goPage?
    goLink?
    goDelete?
    actionAuth? // 操作权限
    actionWidth?// 操作宽度
    // pageAuth?
    footInfoAuth? // 页脚信息
    outStyle?
    selectAuth? // 选择权限
    selectRow?
    pageSize?
    loading?
    size?   // {y:185},传size，需在header里添加width
}

export default class CompactTable extends React.PureComponent<CompactTableProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            page_num: 1,
            page_size: this.props.pageSize ? this.props.pageSize : 10,
        };
    }
    // static defaultProps = {
    //     data: {
    //         header: [{
    //             key: 'name',
    //             title: '主机名称',
    //             link: false
    //         }, {
    //             key: 'role',
    //             title: '角色',
    //             link: false
    //         }, {
    //             key: 'az',
    //             title: '所属AZ',
    //             link: false
    //         }, {
    //             key: 'ha',
    //             title: '所属HA',
    //             link: false
    //         }],
    //         dataList: [
    //             {
    //                 id: 1,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'

    //             },
    //             {
    //                 id: 2,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'

    //             },
    //             {
    //                 id: 3,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'

    //             },
    //             {
    //                 id: 4,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'

    //             },
    //             {
    //                 id: 5,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'
    //             },
    //             {
    //                 id: 6,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'

    //             },
    //             {
    //                 id: 7,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'
    //             },
    //             {
    //                 id: 8,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'

    //             },
    //             {
    //                 id: 9,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'

    //             },
    //             {
    //                 id: 10,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'
    //             },
    //             {
    //                 id: 11,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'

    //             },
    //             {
    //                 id: 12,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'

    //             },
    //             {
    //                 id: 13,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'
    //             },
    //             {
    //                 id: 14,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'

    //             },
    //             {
    //                 id: 15,
    //                 az: 'xasa AAAAS',
    //                 name: '10.255.242.215',
    //                 ha: 'xasa',
    //                 role: '主'

    //             },

    //         ],
    //         pageNo: 1,
    //         pageSize: 10,
    //         totalCount: 2
    //     }
    // }

    goEdit(record) {
        if (this.props.goEdit) {
            this.props.goEdit(record)
        }
    }
    // showModal(e) {
    //     let userId = e.currentTarget.id
    //     if (this.props.showModal) {
    //         this.props.showModal(userId)
    //     }
    // }
    goDelete(record) {
        if (this.props.goDelete) {
            this.props.goDelete(record)
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
        let { actionAuth, data, selectAuth, selectRow, loading, size } = this.props
        let header = data.header || []
        let dataList: any = _.merge([], data.dataList)
        let columns = []
        for (let i = 0; i < header.length; i++) {
            let obj: any = {
                title: header[i].title,
                dataIndex: header[i].key,
                key: header[i].key,
                fixed: header[i].fixed ? 'left' : null,
                width: header[i].width ? header[i].width : null,
                // sorter: header[i].sorter ? (a, b) => a[header[i].key] - b[header[i].key] : null,
            }
            if (header[i].link) {
                obj.render = (text, record) => <a href="javascript:;" onClick={this.goLink.bind(this, header[i].key, record)}>{text}</a>
            }
            columns.push(obj)
        }
        if (actionAuth && actionAuth.length > 0) {
            columns.push({
                title: '操作',
                key: 'action',
                width: this.props.actionWidth ? this.props.actionWidth : 150,
                render: (text, record) => (
                    <span>
                        {actionAuth.indexOf('edit') > -1 ? (
                            <a onClick={this.goEdit.bind(this, record)} id={record.id} href="javascript:;">编辑</a>
                        ) : ''}
                        {actionAuth.length > 1 ? (<Divider type="vertical" />) : ''}
                        {actionAuth.indexOf('delete') > -1 ? (
                            <a onClick={this.goDelete.bind(this, record)} rel={record.name} id={record.id} href="javascript:;" type="vertical">删除</a>
                        ) : ''}

                    </span>
                )
            })
        }
        let { page_num, page_size } = this.state

        _.map(dataList, function (item: any, index) {
            // item._roles = _roles.toString()
            // item.create_time = moment.tz(item.create_time, 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss')
            item.key = page_num * page_size + index
        })

        let area: any = { x: '100%' }
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
        if (size && size.y) {
            area.y = size.y
        }
        let rowSelection = null
        if (selectAuth) {
            rowSelection = {
                onChange: (selectedRowKeys, selectedRows) => {
                    if (selectRow) {
                        selectRow(selectedRows)
                    }
                },
                getCheckboxProps: record => ({
                    disabled: record.hasChecked, // Column configuration not to be checked
                }),
            }
        }

        return (
            <Table size="small" scroll={area} rowSelection={rowSelection}
                pagination={false}
                className={styles.smalltable}
                columns={columns}
                dataSource={dataList}
                loading={loading} />
        )
    }
    render() {
        let { data, goPage, footInfoAuth, outStyle, loading } = this.props
        if (!data) {
            return (
                <div />
            )
        }
        let { page_size, page_num } = this.state
        let count = data ? data.totalCount : 0
        return (
            <div className={styles.compactTable} style={outStyle}>
                {this.renderTable()}
                <div className={styles.tfooter}>
                    {footInfoAuth ? (<div>{footInfoAuth}</div>) : ''}
                    {(count > page_size) ? (
                        <div>
                            <Pagination size="small"
                                className={styles.pagination}
                                onChange={this.goPage.bind(this)}
                                total={count}
                                current={parseInt(data.pageNo, 10)}
                                pageSize={page_size}
                                showQuickJumper />
                        </div>
                    ) : ''}
                </div>

            </div>
        );
    }
}