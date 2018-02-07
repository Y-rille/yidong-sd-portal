import React from 'react';
import * as _ from 'lodash';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import styles from './index.less';

export interface SideBarProps {
    onLinkHandleClick
}

export default class SideBar extends React.PureComponent<SideBarProps, any> {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }
    componentDidMount() {

    }
    handleClick = (e) => {
        if (e) {
            this.props.onLinkHandleClick(e.key)
        }
    }

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                style={{ color: '#525459', height: window.innerHeight - 64 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="dashboard" title={<span><Icon type="mail" /><span>概览</span></span>}></SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>资源结构组织</span></span>}>
                    <Menu.Item key="vim/1/az" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>AZ管理</Menu.Item>
                    <Menu.Item key="vim/1/ha" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>HA管理</Menu.Item>
                    <Menu.Item key="vim/1/host" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>主机管理</Menu.Item>
                    <Menu.Item key="vim/1/virtual" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>虚拟机管理</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="setting" /><span>物理部署组织</span></span>}>
                    <Menu.Item key="pim/1/server" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>服务器管理</Menu.Item>
                    <Menu.Item key="pim/1/firewall" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>防火墙管理</Menu.Item>
                    <Menu.Item key="pim/1/switchboard" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>交换机管理</Menu.Item>
                    <Menu.Item key="pim/1/magnetic" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>磁阵管理</Menu.Item>
                </SubMenu>
            </Menu>
        )

    }
}