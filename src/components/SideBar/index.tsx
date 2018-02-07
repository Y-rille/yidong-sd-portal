import React from 'react';
import * as _ from 'lodash';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export interface SidebarProps {

}

export default class Sidebar extends React.PureComponent<SidebarProps, any> {
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
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>概览</span></span>}>
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>资源结构组织</span></span>}>
                    <Menu.Item key="5">AZ管理</Menu.Item>
                    <Menu.Item key="6">HA管理</Menu.Item>
                    <Menu.Item key="7">主机管理</Menu.Item>
                    <Menu.Item key="8">虚拟机管理</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="setting" /><span>物理部署组织</span></span>}>
                    <Menu.Item key="9">服务器管理</Menu.Item>
                    <Menu.Item key="10">磁阵管理</Menu.Item>
                    <Menu.Item key="11">交换机管理</Menu.Item>
                    <Menu.Item key="12">服务器管理</Menu.Item>
                </SubMenu>
            </Menu>
        )

    }
}