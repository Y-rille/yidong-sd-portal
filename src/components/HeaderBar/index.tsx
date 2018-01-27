import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import styles from './index.less';

import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

declare let global: any;

export interface HeaderBarProps {
    menu?
    navClickHandler?
    isActive?
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
                route: 'dashboard',
            },
            {
                name: '系统管理',
                route: 'setting',
            },
            {
                name: '资源管理',
                route: 'resource',
            },
            {
                name: '告警监控',
                route: 'alarm',
            },
            {
                name: '性能监控',
                route: 'performance',
            }
        ],
    };
    static propTypes = {
    };
    handleClick(e) {
        let { navClickHandler } = this.props
        if (navClickHandler) {
            navClickHandler(e.key)
        }
    }
    renderMenuItem() {
        const { menu } = this.props;
        return _.map(menu, (item) => {
            return (
                <Menu.Item key={item.route}>
                    <span>{item.name}</span>
                </Menu.Item >
            )
        })
    }
    render() {
        let { isActive } = this.props;
        const option = (
            <Menu>
                <Menu.Item>设置</Menu.Item>
                <Menu.Item>退出</Menu.Item>
            </Menu>
        );
        return (
            <Header className={styles.header}>
                <div className={styles['nav-wrapper']}>
                    <div className={styles.title}>
                        NFV
                    </div>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={[isActive]}
                        className={styles.nav}
                        onClick={this.handleClick.bind(this)}
                    >
                        {this.renderMenuItem()}
                    </Menu>
                    <div className={styles.right}>
                        <Avatar icon="user" size="small" style={{ backgroundColor: '#fff', color: '#1DA57A' }} />
                        <Dropdown overlay={option}>
                            <a className="ant-dropdown-link">
                                <span style={{ color: '#fff' }}>HPEer</span>
                                <Icon type="down" style={{ color: '#fff' }} />
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </Header>
        );
    }

}
