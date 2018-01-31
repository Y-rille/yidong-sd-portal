import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import SplitPane from 'react-split-pane'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input } from 'antd';
const Search = Input.Search
import UserTable from '../../../components/UserTable/'
import UserEdit from '../../../components/UserEdit/'

declare let global: any;
import styles from '../style/index.less'
class User extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    componentWillReceiveProps(nextProps) {
    }
    showModal() {
        this.setState({
            visible: true
        })
    }
    handleOk() {
        this.setState({
            visible: false
        })
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    goEdit(id) {
        // 编辑
        this.setState({
            visible: true,
        });

    }

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
                    <h1 className={styles._title}>用户管理</h1>
                    <Button type="primary" onClick={this.showModal.bind(this)}>新建用户</Button>
                    <Search
                        className={styles.search}
                        placeholder="请输入关键字"
                    />
                    <UserTable
                        showModal={this.showModal.bind(this)}
                        goEdit={this.goEdit.bind(this)}
                    />
                </div>
                <UserEdit
                    visible={this.state.visible}
                    handleOk={this.handleOk.bind(this)}
                    handleCancel={this.handleCancel.bind(this)}
                />
            </Row>
        );
    }
}

export default User;