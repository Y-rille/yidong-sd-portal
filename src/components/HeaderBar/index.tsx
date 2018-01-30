import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { matchPath } from 'react-router'
import styles from './index.less';

import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
import { login } from '../../modules/common/actions/user';
const { Header, Footer, Sider, Content } = Layout;

declare let global: any;

export interface HeaderBarProps {
    menu?
    navClickHandler?
    activeKey?
    exitHandler
    currentUser
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
                <Menu.Item key={item.route} className={styles.item}>
                    <span>{item.name}</span>
                </Menu.Item >
            )
        })
    }
    exit() {
        this.props.exitHandler();
    }
    render() {
        let { activeKey, currentUser } = this.props;
        const option = (
            <Menu>
                <Menu.Item><a onClick={this.exit.bind(this)}>退出</a></Menu.Item>
            </Menu>
        );
        return (
            <Header className={styles.header}>
                <div className={styles['nav-wrapper']}>
                    <div className={styles.title}>
                        <img alt="" src={require('../../img/logo.png')} />
                    </div>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={[activeKey]}
                        className={styles.nav}
                        onClick={this.handleClick.bind(this)}
                    >
                        {this.renderMenuItem()}
                    </Menu>
                    <div className={styles.right}>
                        <Avatar icon="user" size="small" style={{ backgroundColor: '#fff', color: '#00b388', marginRight: '8px' }} />
                        <Dropdown overlay={option}>
                            <a className="ant-dropdown-link">
                                <span style={{ color: '#fff', marginRight: '6px' }}>{currentUser.name}</span>
                                <Icon type="down" style={{ color: '#fff' }} />
                            </a>
                        </Dropdown>
                    </div>
                </div>
            </Header>
        );
    }

}
