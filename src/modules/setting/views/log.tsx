import * as React from 'react';
import styles from '../style/index.less'
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SplitPane from 'react-split-pane'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input, DatePicker, LocaleProvider } from 'antd';
const { RangePicker } = DatePicker;
const Search = Input.Search

import moment from '../../../common/moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

import LogTable from '../../../components/LogTable/'
declare let global: any;
var qs = require('querystringify')
import { stringify } from 'querystringify'
import { SettingActions } from '../actions/index'

export interface LogProps {
    location?,
    actions: SettingActions,
    logList,
    params?
    history?
}

class Log extends React.PureComponent<LogProps, any> {
    constructor(props) {
        super(props);
        let { page_num, query_key, start_time, end_time } = qs.parse(this.props.location.search)
        this.state = {
            visible: false,
            listLoading: false,
            page_size: 5,
            page_num: page_num ? page_num : 1,
            query_key: query_key ? query_key : '',
            start_time: '',
            end_time: ''
        };
    }
    goPage(current) {
        let page_num = current
        let { page_size, query_key, start_time, end_time } = this.state
        let queryObj = {
            page_num, page_size, query_key, start_time, end_time
        }
        this.props.history.push(`/setting/log?${stringify(queryObj)}`)
        this.setState({
            page_num: page_num
        });
        this.getDataFn(queryObj)
    }
    getDataFn(queryObj) {
        this.setState({
            listLoading: true
        });
        let self = this
        let { page_num, page_size, query_key, start_time, end_time } = queryObj
        this.props.actions.getLogList({ page_num, page_size, query_key, start_time, end_time }, () => {
            self.setState({
                listLoading: false
            });
        })
    }
    searchHandler(query_key) {
        let { page_num, page_size, start_time, end_time } = this.state
        page_num = 1
        let queryObj = { page_num, query_key, page_size, start_time, end_time }
        this.props.history.push(`/setting/log?${stringify(queryObj)}`)
        this.setState({
            page_num, query_key
        });
        this.getDataFn(queryObj)
    }
    componentWillReceiveProps(nextProps) {

    }
    onChange(value, dateString) {
        let { start_time, end_time } = this.state
        this.setState({
            start_time: dateString[0],
            end_time: dateString[1]
        });
    }
    componentWillMount() {
        let { page_num, page_size, query_key, start_time, end_time } = this.state
        let queryObj = {
            page_num, page_size, query_key, start_time, end_time
        }
        this.getDataFn(queryObj)
    }
    render() {
        let { page_num, page_size, query_key } = this.state
        let logList = this.props.logList
        let canRender = false
        if (logList) {
            canRender = true
        }
        if (!canRender) {
            return <div />
        }
        return (
            <Row className={styles.setting}>
                <div className={styles.header}>
                    <h1 className={styles.title}>日志管理</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>系统管理</Breadcrumb.Item>
                        <Breadcrumb.Item>日志管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={styles.tb}>
                    <div className={styles.filter}>
                        <LocaleProvider locale={zh_CN}>
                            <RangePicker
                                showTime={{ format: 'HH:mm:ss' }}
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder={['开始时间', '结束时间']}
                                onChange={this.onChange.bind(this)}
                            />
                        </LocaleProvider>
                        <Search
                            className={styles.search}
                            placeholder="请输入用户名或者真实姓名"
                            defaultValue={query_key}
                            enterButton="查询"
                            onSearch={value => this.searchHandler(value)}
                        />
                    </div>
                    <LogTable
                        goPage={this.goPage.bind(this)}
                        page_num={page_num}
                        page_size={page_size}
                        logList={logList}
                    />
                </div>
            </Row>
        );
    }
}

export default Log;