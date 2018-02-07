import React from 'react';
import * as _ from 'lodash';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import styles from './index.less';

export interface SideBarProps {

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
        // console.log('click ', e);
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
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>概览</span></span>}></SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>资源结构组织</span></span>}>
                    <Menu.Item key="5" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>AZ管理</Menu.Item>
                    <Menu.Item key="6" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>HA管理</Menu.Item>
                    <Menu.Item key="7" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>主机管理</Menu.Item>
                    <Menu.Item key="8" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>虚拟机管理</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="setting" /><span>物理部署组织</span></span>}>
                    <Menu.Item key="9" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>服务器管理</Menu.Item>
                    <Menu.Item key="10" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>磁阵管理</Menu.Item>
                    <Menu.Item key="11" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>交换机管理</Menu.Item>
                    <Menu.Item key="12" style={{ color: 'rgba(0, 0, 0, 0.45)' }}>服务器管理</Menu.Item>
                </SubMenu>
            </Menu>
        )

    }
}