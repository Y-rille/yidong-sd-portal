import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import styles from './index.less';

import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

declare let global: any;

export interface HeaderBarProps {

}

/**
 * 头部导航
 * 
 * @export
 * @class HeaderBar
 * @extends {React.PureComponent<HeaderBarProps, any>}
 */

export default class HeaderBar extends React.PureComponent<HeaderBarProps, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    static defaultProps = {
        menu: [
            {
                name: '首页',
                route: '',
            },
            {
                name: '系统管理',
                route: '',
            },
            {
                name: '资源管理',
                route: '',
            },
            {
                name: '告警监控',
                route: '',
            },
            {
                name: '性能监控',
                route: '',
            }
        ],
    };
    static propTypes = {
    };
    renderMenuItem() {
        const { menu } = this.props;
        return _.map(menu, (item) => {
            return (
                <Menu.Item key={item.route}>
                    <span>{item.name}</span>
                </Menu.Item>
            )
        })
    }
    render() {
        const option = (
            <Menu>
                <Menu.Item>设置</Menu.Item>
                <Menu.Item>退出</Menu.Item>
            </Menu>
        );
        return (
            <Header className={styles.header}>
                <span className={styles.title}>NFV</span>
                <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} className={styles.nav}>
                    {/* <Menu.Item key="1">首页</Menu.Item>
                    <Menu.Item key="2">系统管理</Menu.Item>
                    <Menu.Item key="3">资源管理</Menu.Item>
                    <Menu.Item key="4">告警监控</Menu.Item>
                    <Menu.Item key="5">性能监控</Menu.Item> */}
                    {this.renderMenuItem()}
                </Menu>

                <Dropdown overlay={option}>
                    <a className="ant-dropdown-link" style={{ marginLeft: '10px', float: 'right' }}><span style={{ color: '#fff' }}>HPEer</span><Icon type="down" style={{ color: '#fff' }} /></a>
                </Dropdown>
                <Avatar icon="user" size="small" style={{ backgroundColor: '#fff', color: '#1DA57A', float: 'right', marginTop: '18px' }} />
            </Header>
        );
    }

}
