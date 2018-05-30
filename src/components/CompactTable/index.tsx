import React from 'react';
import { Table, Icon, Divider, Pagination } from 'antd';
import styles from './index.less';
import moment from '../../common/moment'
import * as _ from 'lodash';

export interface CompactTableProps {
    // pageAuth?
    // page_num?
    // page_size?
    data?
    goPage?
    goLink?
    goEdit?
    goDelete?
    goBackup?       // 备份
    goRecover?      // 恢复
    goRemove?         // 移出
    actionAuth?     // [ 'edit','delete','backup','recover','remove '] -- 操作权限
    actionWidth?    // 操作宽度
    footInfoAuth?   // 页脚信息
    outStyle?
    selectAuth?     // 选择权限
    sortAuth?       // 排序权限
    selectRow?
    pageSize?
    loading?
    size?           // {y:185},传size，需在header里添加width
    goView?         // 操作
    viewList?       // 查看
}

export default class CompactTable extends React.PureComponent<CompactTableProps, any> {
    constructor(props) {
        super(props);
        this.state = {
            page_num: 1,
            page_size: this.props.pageSize ? this.props.pageSize : 10,
        };
    }
    static defaultProps = {
        data: {
            header: [{
                key: 'name',
                title: '主机名称',
                link: true
            }, {
                key: 'role',
                title: '角色',
                link: false
            }, {
                key: 'az',
                title: '所属AZ',
                link: false
            }, {
                key: 'ha',
                title: '所属HA',
                link: false
            }],
            dataList: [
                {
                    id: 1,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'

                },
                {
                    id: 2,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'

                },
                {
                    id: 3,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'

                },
                {
                    id: 4,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'

                },
                {
                    id: 5,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'
                },
                {
                    id: 6,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'

                },
                {
                    id: 7,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'
                },
                {
                    id: 8,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'

                },
                {
                    id: 9,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'

                },
                {
                    id: 10,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'
                },
                {
                    id: 11,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'

                },
                {
                    id: 12,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'

                },
                {
                    id: 13,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'
                },
                {
                    id: 14,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'

                },
                {
                    id: 15,
                    az: 'xasa AAAAS',
                    name: '10.255.242.215',
                    ha: 'xasa',
                    role: '主'

                },

            ],
            pageNo: 1,
            pageSize: 10,
            totalCount: 2
        }
    }

    goEdit(record) {
        if (this.props.goEdit) {
            this.props.goEdit(record)
        }
    }
    goDelete(record) {
        if (this.props.goDelete) {
            this.props.goDelete(record)
        }
    }
    goBackup(record) {
        if (this.props.goBackup) {
            this.props.goBackup(record)
        }
    }
    goView(key, record) {
        if (this.props.goView) {
            this.props.goView(key, record)
        }
    }
    goRecover(record) {
        if (this.props.goRecover) {
            this.props.goRecover(record)
        }
    }
    goRemove(record) {
        if (this.props.goRemove) {
            this.props.goRemove(record)
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
        let { actionAuth, data, selectAuth, selectRow, loading, size, sortAuth, viewList, actionWidth } = this.props
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
                sorter: sortAuth ? (a, b) => {

                    let aV = a[header[i].key]
                    let bV = b[header[i].key]
                    if (isNaN(aV)) {
                        return aV.charCodeAt(0) - bV.charCodeAt(0)
                    } else {
                        return aV - bV
                    }
                } : null,
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
                width: actionWidth ? actionWidth : 150,
                render: (text, record) => {
                    let actionArr = []
                    for (let i = 0; i < actionAuth.length; i++) {
                        switch (actionAuth[i]) {
                            case 'edit':
                                actionArr.push(<a onClick={this.goEdit.bind(this, record)} id={record.id} href="javascript:;" type="vertical">编辑</a>)
                                break
                            case 'delete':
                                actionArr.push(<a onClick={this.goDelete.bind(this, record)} id={record.id} href="javascript:;" type="vertical">删除</a>)
                                break
                            case 'backup':
                                actionArr.push(<a onClick={this.goBackup.bind(this, record)} id={record.id} href="javascript:;" type="vertical">备份</a>)
                                break
                            case 'recover':
                                actionArr.push(<a onClick={this.goRecover.bind(this, record)} id={record.id} href="javascript:;" type="vertical">恢复</a>)
                                break
                            case 'remove':
                                actionArr.push(<a onClick={this.goRemove.bind(this, record)} id={record.id} href="javascript:;" type="vertical">移出</a>)
                                break
                            case 'view':
                                _.map(viewList, (item) => {
                                    actionArr.push(<a onClick={this.goView.bind(this, item.key, record)} id={record.id} data-key={item.key} href="javascript:;" type="vertical">{item.value}</a>)
                                })
                                break
                            default:
                                break
                        }
                        if (i < actionAuth.length - 1) {
                            actionArr.push(<Divider type="vertical" />)
                        }
                    }
                    return (
                        <span>{actionArr}</span>
                    )
                }
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
                    {footInfoAuth ? (<div style={{ marginTop: '10px' }}>{footInfoAuth}</div>) : ''}
                    {(count > page_size) ? (
                        <div style={{ marginTop: '10px' }}>
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