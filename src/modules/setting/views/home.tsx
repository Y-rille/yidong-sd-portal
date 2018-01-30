import * as React from 'react';
import * as _ from 'lodash';
import * as classNames from 'classnames';
import { Switch, Route, Redirect } from 'react-router-dom'
import SplitPane from 'react-split-pane'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input } from 'antd';
const Search = Input.Search

import UserTable from '../../../components/UserTable/'

declare let global: any;

import styles from '../style/index.less'

class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    triggerResize() {
        let e: Event = document.createEvent('Event');
        e.initEvent('resize', true, true);
        window.dispatchEvent(e);
    }
    componentWillReceiveProps(nextProps) {

    }
    componentWillMount() {
    }
    render() {
        return (
            <Row className={styles.performance}>
                <SplitPane
                    split="vertical"
                    minSize={100}
                    maxSize={300}
                    defaultSize={200}
                    onChange={this.triggerResize} >
                    <div>菜单树</div>
                    <div className={styles.main}>
                        <div className={styles.header}>
                            <Breadcrumb>
                                <Breadcrumb.Item>首页</Breadcrumb.Item>
                                <Breadcrumb.Item>二级菜单</Breadcrumb.Item>
                                <Breadcrumb.Item>三级菜单</Breadcrumb.Item>
                            </Breadcrumb>
                            <h1 className={styles._title}>用户管理</h1>
                            <Button type="primary">新建用户</Button>
                            <Search
                                className={styles.search}
                                placeholder="请输入关键字"
                            />
                            <UserTable />
                        </div>
                    </div>
                </SplitPane>

            </Row>
        );
    }
}

export default Home;