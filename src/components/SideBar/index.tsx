import React from 'react';
import * as _ from 'lodash';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import styles from './index.less';

export interface SideBarProps {
    onLinkHandleClick?
    current?
    data?: any
}

export default class SideBar extends React.PureComponent<SideBarProps, any> {
    constructor(props) {
        super(props)
    }

    public static defaultProps: SideBarProps = {
        data: {
            vim: [
                { id: 1, name: '资源结构组织1' },
                { id: 2, name: '资源结构组织2' }
            ],
            pim: [
                { id: 1, name: '物理部署组织1' },
                { id: 2, name: '物理部署组织2' }
            ]
        }
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
        let id = '1'
        return (
            <div className="sideBar">
                <Menu
                    onClick={this.handleClick}
                    style={{ height: window.innerHeight - 64 }}
                    defaultOpenKeys={['sub2']}
                    defaultSelectedKeys={[this.props.current]}
                    mode="inline"
                >
                    <Menu.Item key="dashboard">
                        <Icon type="inbox" />
                        <span>概览</span>
                    </Menu.Item >
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>资源结构组织</span></span>}>
                        <Menu.Item key="vim/1/host">主机管理</Menu.Item>
                        <Menu.Item key="vim/1/virtual">虚拟机管理</Menu.Item>
                        <Menu.Item key={`vim/${id}/az`}>AZ管理</Menu.Item>
                        <Menu.Item key="vim/1/ha">HA管理</Menu.Item>
                        <Menu.Item key="vim/1/flavor">Flavor管理</Menu.Item>
                        <Menu.Item key="vim/1/mirror">镜像管理</Menu.Item>
                        <Menu.Item key="vim/1/virtual_network">虚拟网络管理</Menu.Item>
                        <Menu.Item key="vim/1/storage_volume">存储卷管理</Menu.Item>
                        <Menu.Item key="vim/1/volume_type">卷类型管理</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>物理部署组织</span></span>}>
                        <Menu.Item key="pim/1/server">服务器管理</Menu.Item>
                        <Menu.Item key="pim/1/firewall">防火墙管理</Menu.Item>
                        <Menu.Item key="pim/1/switchboard">交换机管理</Menu.Item>
                        <Menu.Item key="pim/1/magnetic">磁阵管理</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}