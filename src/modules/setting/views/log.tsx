import * as React from 'react';
import styles from '../style/index.less'
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SplitPane from 'react-split-pane'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input } from 'antd';
const Search = Input.Search

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
        let { page_num, query_key } = qs.parse(this.props.location.search)
        this.state = {
            visible: false,
            listLoading: false,
            page_size: 5,
            page_num: page_num ? page_num : 1,
            query_key: query_key ? query_key : '',
        };
    }
    goPage(current) {
        let page_num = current
        let { page_size, query_key } = this.state
        let queryObj = {
            page_num, page_size, query_key
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
        let { page_num, page_size, query_key } = queryObj
        this.props.actions.getLogList({ page_num, page_size, query_key }, () => {
            self.setState({
                listLoading: false
            });
        })
    }
    searchHandler(query_key) {
        let { page_num, page_size } = this.state
        page_num = 0
        let queryObj = { page_num, query_key, page_size }
        this.props.history.push(`/setting/log?${stringify(queryObj)}`)
        this.setState({
            page_num, query_key
        });
        this.getDataFn(queryObj)
    }
    componentWillReceiveProps(nextProps) {
    }
    // showModal() {
    //     this.setState({
    //         visible: true
    //     })
    // }
    // handleOk() {
    //     this.setState({
    //         visible: false
    //     })
    // }
    // handleCancel() {
    //     this.setState({
    //         visible: false
    //     })
    // }
    componentWillMount() {
        let { page_num, page_size, query_key } = this.state
        let queryObj = {
            page_num, page_size, query_key
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

        // let { match, tree } = this.props
        // let { activeKey } = this.state
        // if (!tree) {
        //     return <div>loading</div>
        // }
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
                        <Search
                            className={styles.search}
                            placeholder="请输入用户名"
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