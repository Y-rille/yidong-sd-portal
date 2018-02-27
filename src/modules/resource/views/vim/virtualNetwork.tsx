import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import VirtualNetworkInfo from '../../container/vim/virtualNetworkInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Select, Input, Spin } from 'antd';
const Option = Select.Option;
import CompactTable from '../../../../components/CompactTable/'
import styles from '../../style/index.less'
class VirtualNetwork extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            menuValue: 'project'
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/vim/1/virtual_network/info`)
    }
    menuChange(value) {
        this.setState({
            menuValue: value
        })
    }
    handleClick() {
        const { menuValue } = this.state;
        // console.log("selectValue:", menuValue)
    }
    goPage() {
    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'id') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    render() {
        let tData = {
            'count': 17,
            'header': [
                // {
                //     key: 'id',
                //     title: '虚拟机名称',
                //     link: true,
                //     fixed: true,
                // },
                {
                    key: 'mobile',
                    title: '项目',
                }, {
                    key: 'name',
                    title: '网络名称 ',
                }, {
                    key: 'subnet',
                    title: '子网'
                }, {
                    key: 'DHCP',
                    title: 'DHCP代理'
                }, {
                    key: 'public',
                    title: '是否共享'
                }, {
                    key: 'exter',
                    title: 'external'
                }, {
                    key: 'memory',
                    title: '状态'
                }, {
                    key: 'magstute',
                    title: '管理状态'
                }],
            'body': [
                {
                    'mobile': 'xiaojindian4',
                    'name': '13',
                    'subnet': 'sub-text-vlan24.10.34.24.0',
                    'DHCP': '5',
                    'public': 'Yes',
                    'exter': 'OMB',
                    'memory': '运行',
                    'magstute': 'up'
                },
                {
                    'mobile': '213cluster',
                    'name': '13',
                    'subnet': 'sub-text-vlan24.10.34.24.0',
                    'DHCP': '5',
                    'public': 'Yes',
                    'exter': 'OMB',
                    'memory': '运行',
                    'magstute': 'up'
                },
                {
                    'mobile': 'xiaojindian4',
                    'name': '13',
                    'subnet': 'sub-text-vlan24.10.34.24.0',
                    'DHCP': '5',
                    'public': 'Yes',
                    'exter': 'OMB',
                    'memory': '运行',
                    'magstute': 'up'
                },
                {
                    'mobile': '213cluster',
                    'name': '13',
                    'subnet': 'sub-text-vlan24.10.34.24.0',
                    'DHCP': '5',
                    'public': 'Yes',
                    'exter': 'OMB',
                    'memory': '运行',
                    'magstute': 'up'
                },
                {
                    'mobile': 'xiaojindian4',
                    'name': '13',
                    'subnet': 'sub-text-vlan24.10.34.24.0',
                    'DHCP': '5',
                    'public': 'Yes',
                    'exter': 'OMB',
                    'memory': '运行',
                    'magstute': 'up'
                },
                {
                    'mobile': '213cluster',
                    'name': '13',
                    'subnet': 'sub-text-vlan24.10.34.24.0',
                    'DHCP': '5',
                    'public': 'Yes',
                    'exter': 'OMB',
                    'memory': '运行',
                    'magstute': 'up'
                },
                {
                    'mobile': 'xiaojindian4',
                    'name': '13',
                    'subnet': 'sub-text-vlan24.10.34.24.0',
                    'DHCP': '5',
                    'public': 'Yes',
                    'exter': 'OMB',
                    'memory': '运行',
                    'magstute': 'up'
                },
                {
                    'mobile': '213cluster',
                    'name': '13',
                    'subnet': 'sub-text-vlan24.10.34.24.0',
                    'DHCP': '5',
                    'public': 'Yes',
                    'exter': 'OMB',
                    'memory': '运行',
                    'magstute': 'up'
                },
            ]
        }
        let { match } = this.props
        const { menuValue } = this.state;
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={VirtualNetworkInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>虚拟网络管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>资源组织机构</Breadcrumb.Item>
                                <Breadcrumb.Item>虚拟网络管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Select
                                    value={menuValue}
                                    onChange={this.menuChange.bind(this)}
                                >
                                    <Option value="project">project</Option>
                                </Select>
                                <Input placeholder="虚拟网络名称" />
                                <Button
                                    type="primary"
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                                </Button>
                                <Button style={{ float: 'right' }}
                                    type="primary"
                                >
                                    管理
                            </Button>
                            </div>
                            <CompactTable
                                outStyle={{ marginTop: '20px' }}
                                goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                data={tData}
                                pageAuth={true}
                                actionAuth={[]}
                            />
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default VirtualNetwork;