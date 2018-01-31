import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SplitPane from 'react-split-pane'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input } from 'antd';
const Search = Input.Search

import LogTable from '../../../components/LogTable/'

declare let global: any;
import styles from '../style/index.less'
class Log extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
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
    }
    render() {
        let { match, tree } = this.props
        let { activeKey } = this.state
        // if (!tree) {
        //     return <div>loading</div>
        // }
        return (
            <Row className={styles.setting}>
                <div className={styles.header}>
                    <Breadcrumb>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
                        <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
                    </Breadcrumb>
                    <h1 className={styles._title}>日志管理</h1>
                    <Search
                        className={styles.search}
                        placeholder="请输入关键字"
                    />
                    <LogTable />
                </div>
            </Row>
        );
    }
}

export default Log;