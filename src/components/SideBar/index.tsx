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
                {
                    id: 1,
                    name: '资源结构组织',
                    list: [{ pageName: '主机管理', page: 'host' },
                    { pageName: '虚拟机管理', page: 'virtual' },
                    { pageName: 'AZ管理', page: 'az' },
                    { pageName: 'HA管理', page: 'ha' },
                    { pageName: 'Flavor管理', page: 'flavor' },
                    { pageName: '镜像管理', page: 'mirror' },
                    { pageName: '虚拟网络管理', page: 'virtual_network' },
                    { pageName: '存储卷管理', page: 'storage_volume' },
                    { pageName: '卷类型管理', page: 'volume_type' }]
                },
                {
                    id: 2,
                    name: '资源结构组织2',
                    list: [{ pageName: '主机管理', page: 'host' },
                    { pageName: '虚拟机管理', page: 'virtual' },
                    { pageName: 'AZ管理', page: 'az' },
                    { pageName: 'HA管理', page: 'ha' },
                    { pageName: 'Flavor管理', page: 'flavor' },
                    { pageName: '镜像管理', page: 'mirror' },
                    { pageName: '虚拟网络管理', page: 'virtual_network' },
                    { pageName: '存储卷管理', page: 'storage_volume' },
                    { pageName: '卷类型管理', page: 'volume_type' }]
                },
            ],
            pim: [
                {
                    id: 3,
                    name: '物理部署组织',
                    list: [
                        { pageName: '服务器管理', page: 'server' },
                        { pageName: '防火墙管理', page: 'firewall' },
                        { pageName: '交换机管理', page: 'switchboard' },
                        { pageName: '磁阵管理', page: 'magnetic' },
                    ]
                },
                {
                    id: 4,
                    name: '物理部署组织2',
                    list: [
                        { pageName: '服务器管理', page: 'server' },
                        { pageName: '防火墙管理', page: 'firewall' },
                        { pageName: '交换机管理', page: 'switchboard' },
                        { pageName: '磁阵管理', page: 'magnetic' },
                    ]
                },
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
        let data = this.props.data || ''
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
                    {data.vim.map((item, i) => {
                        let id = item.id
                        return (<SubMenu key={i} title={<span><Icon type="dropbox" /><span>{item.name}</span></span>}>
                            {item.list.map((subitem, index) => {
                                return (
                                    <Menu.Item key={index} key={`vim/${id}/${subitem.page}`} > {subitem.pageName}</Menu.Item>
                                )
                            })}
                        </SubMenu>)
                    })}
                    {data.pim.map((item, i) => {
                        let id = item.id
                        return (<SubMenu key={i} title={<span><Icon type="api" /><span>{item.name}</span></span>}>
                            {item.list.map((subitem, index) => {
                                return (
                                    <Menu.Item key={index} key={`pim/${id}/${subitem.page}`} > {subitem.pageName}</Menu.Item>
                                )
                            })}
                        </SubMenu>)
                    })}
                </Menu>
            </div >
        )
    }

}