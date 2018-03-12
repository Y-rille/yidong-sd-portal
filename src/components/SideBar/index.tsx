import React from 'react';
import * as _ from 'lodash';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import styles from './index.less';
import { matchPath } from 'react-router'
export interface SideBarProps {
    onLinkHandleClick?
    resourceTree?
    pathname?
    match?

}

export default class SideBar extends React.PureComponent<SideBarProps, any> {
    constructor(props) {
        super(props)
    }

    public static defaultProps: SideBarProps = {

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
        let { pathname, match } = this.props
        let datas = this.props.resourceTree
        let data = _.groupBy(datas, 'nodeLabel')
        let keys = ['/resource/dashboard']
        data['虚拟资源'].map((_item, _key) => {
            _item.children.map((item, key) => {
                keys.push(`/resource/vim/${item.nodeId}`)
                keys.push(`/resource/vim/${item.nodeId}/host`)
                keys.push(`/resource/vim/${item.nodeId}/virtual`)
                keys.push(`/resource/vim/${item.nodeId}/az`)
                keys.push(`/resource/vim/${item.nodeId}/ha`)
                keys.push(`/resource/vim/${item.nodeId}/flavor`)
                keys.push(`/resource/vim/${item.nodeId}/mirror`)
                keys.push(`/resource/vim/${item.nodeId}/virtual_network`)
                keys.push(`/resource/vim/${item.nodeId}/storage_volume`)
                keys.push(`/resource/vim/${item.nodeId}/volume_type`)
            })
        })
        data['物理资源'].map((_item, _key) => {
            _item.children.map((item, key) => {
                keys.push(`/resource/pim/${item.nodeId}`)
                keys.push(`/resource/pim/${item.nodeId}/server`)
                keys.push(`/resource/pim/${item.nodeId}/firewall`)
                keys.push(`/resource/pim/${item.nodeId}/switchboard`)
                keys.push(`/resource/pim/${item.nodeId}/magnetic`)
            })
        })
        let selectedKeys = []
        keys.map(function (key) {
            const mp_node: any = matchPath(pathname, {
                path: key
            })
            if (mp_node) {
                selectedKeys.push(key)
            }
            // const node: any = matchPath(pathname, {
            //     path: `${match.url}/:nodeId`
            // })
            // if (node) {
            //     console.log(node, 'kkkkk');
            // }
        })
        return (
            <div className="sideBar">
                <Menu
                    onClick={this.handleClick}
                    style={{ height: window.innerHeight - 64 }}
                    defaultOpenKeys={selectedKeys}
                    selectedKeys={selectedKeys}
                    mode="inline"
                >
                    <Menu.Item key="/resource/dashboard">
                        <Icon type="inbox" />
                        <span>概览</span>
                    </Menu.Item >
                    {data['虚拟资源'].map((item, i) => {
                        return item.children.map((_item, _i) => {
                            let id = _item.nodeId
                            return (
                                <SubMenu key={`/resource/vim/${id}`} title={<span><Icon type="dropbox" /><span>{_item.nodeLabel}</span></span>}>
                                    <Menu.Item key={`/resource/vim/${id}/host`} >主机管理</Menu.Item>
                                    <Menu.Item key={`/resource/vim/${id}/virtual`} >虚拟机管理</Menu.Item>
                                    <Menu.Item key={`/resource/vim/${id}/az`} >AZ管理</Menu.Item>
                                    <Menu.Item key={`/resource/vim/${id}/ha`} >HA管理</Menu.Item>
                                    <Menu.Item key={`/resource/vim/${id}/flavor`} >Flavor管理</Menu.Item>
                                    <Menu.Item key={`/resource/vim/${id}/mirror`} >镜像管理</Menu.Item>
                                    <Menu.Item key={`/resource/vim/${id}/virtual_network`} >虚拟网络管理</Menu.Item>
                                    <Menu.Item key={`/resource/vim/${id}/storage_volume`} >存储卷管理</Menu.Item>
                                    <Menu.Item key={`/resource/vim/${id}/volume_type`} >卷类型管理</Menu.Item>
                                </SubMenu>
                            )
                        })
                    })
                    }{
                        data['物理资源'].map((item, i) => {
                            return item.children.map((_item, _i) => {
                                let id = _item.nodeId
                                return (
                                    <SubMenu key={`/resource/pim/${id}`} title={<span><Icon type="api" /><span>{_item.nodeLabel}</span></span>}>
                                        <Menu.Item key={`/resource/pim/${id}/server`} >服务器管理</Menu.Item>
                                        <Menu.Item key={`/resource/pim/${id}/firewall`} >防火墙管理</Menu.Item>
                                        <Menu.Item key={`/resource/pim/${id}/switchboard`} >交换机管理</Menu.Item>
                                        <Menu.Item key={`/resource/pim/${id}/magnetic`} >磁阵管理</Menu.Item>
                                    </SubMenu>
                                )

                            })
                        })
                    }

                </Menu>
            </div >
        )
    }

}