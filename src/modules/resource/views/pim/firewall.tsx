import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import FirewallInfo from '../../container/pim/firewallInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Cascader } from 'antd';
import styles from '../../style/index.less'

import CompactTable from '../../../../components/CompactTable'

const data = {
    'count': 17,
    'header': [{
        key: 'id',
        title: '序号',
        fixed: true,
        link: true,
    }, {
        key: 'name',
        title: '名称',
        fixed: true,
        link: true,
    }, {
        key: 'mobile',
        title: '资产编号',
    }, {
        key: 'vm',
        title: '管理IP'
    },
    {
        key: 'email',
        title: '型号',
    }, {
        key: 'cpu',
        title: '供应商'
    }, {
        key: 'memory',
        title: '软件版本'
    }, {
        key: 'role',
        title: '序列号',
    }],
    'body': [
        {
            'id': 1,
            'name': '防火墙A',
            'mobile': '1083',
            'vm': '188.103.2.123',
            'email': 'HPProLlant DL380',
            'cpu': '华为',
            'memory': 'v1.2.3',
            'role': 1231233465
        },
        {
            'id': 2,
            'name': '防火墙B',
            'mobile': '1083',
            'vm': '188.103.2.123',
            'email': 'HPProLlant DL380',
            'cpu': 'HPE',
            'memory': 'v1.2.3',
            'role': 1231233465
        },
        {
            'id': 3,
            'name': '防火墙C',
            'mobile': '1083',
            'vm': '188.103.2.123',
            'email': 'HPProLlant DL380',
            'cpu': '华为',
            'memory': 'v1.2.3',
            'role': 1231233465
        },
        {
            'id': 4,
            'name': '防火墙A',
            'mobile': '1083',
            'vm': '188.103.2.123',
            'email': 'HPProLlant DL380',
            'cpu': 'HPE',
            'memory': 'v1.2.3',
            'role': 1231233465
        },
        {
            'id': 5,
            'name': '防火墙A',
            'mobile': '1083',
            'vm': '188.103.2.123',
            'email': 'HPProLlant DL380',
            'cpu': '华为',
            'memory': 'v1.2.3',
            'role': 1231233465
        },
        {
            'id': 6,
            'name': '防火墙A',
            'mobile': '1083',
            'vm': '188.103.2.123',
            'email': 'HPProLlant DL380',
            'cpu': 'HPE',
            'memory': 'v1.2.3',
            'role': 1231233465
        },
        {
            'id': 7,
            'name': '防火墙A',
            'mobile': '1083',
            'vm': '188.103.2.123',
            'email': 'HPProLlant DL380',
            'cpu': '华为',
            'memory': 'v1.2.3',
            'role': 1231233465
        },
        {
            'id': 8,
            'name': '防火墙A',
            'mobile': '1083',
            'vm': '188.103.2.123',
            'email': 'HPProLlant DL380',
            'cpu': 'HPE',
            'memory': 'v1.2.3',
            'role': 1231233465
        },
        {
            'id': 9,
            'name': '防火墙A',
            'mobile': '1083',
            'vm': '188.103.2.123',
            'email': 'HPProLlant DL380',
            'cpu': '华为',
            'memory': 'v1.2.3',
            'role': 1231233465
        },
        {
            'id': 10,
            'name': '防火墙A',
            'mobile': '1083',
            'vm': '188.103.2.123',
            'email': 'HPProLlant DL380',
            'cpu': 'HPE',
            'memory': 'v1.2.3',
            'role': 1231233465
        }
    ]
}

class Firewall extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            dataCenterValue: '',
            supplierValue: ''
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/pim/1/firewall/info`)
    }
    onChangeDataCenter(value) {
        this.setState({
            dataCenterValue: value
        })
    }
    onChangeSupplier(value) {
        this.setState({
            supplierValue: value
        })
    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'id') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    render() {
        let { match } = this.props;
        const { dataCenterValue, supplierValue } = this.state;
        const DataCenter = [{
            value: '数据中心1',
            label: '数据中心1',
            children: [{
                value: '机房1',
                label: '机房1',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房2',
                label: '机房2',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房3',
                label: '机房3',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }],
        }, {
            value: '数据中心2',
            label: '数据中心2',
            children: [{
                value: '机房1',
                label: '机房1',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房2',
                label: '机房2',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }, {
                value: '机房3',
                label: '机房3',
                children: [{
                    value: '机柜1',
                    label: '机柜1',
                }, {
                    value: '机柜2',
                    label: '机柜2',
                }],
            }],
        }];
        const Supplier = [{
            value: '供应商1',
            label: '供应商1'
        }, {
            value: '供应商2',
            label: '供应商2'
        }]
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={FirewallInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>防火墙管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>物理部署组织</Breadcrumb.Item>
                                <Breadcrumb.Item>防火墙管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Cascader
                                    value={dataCenterValue}
                                    options={DataCenter}
                                    onChange={this.onChangeDataCenter.bind(this)}
                                    placeholder="数据中心"
                                />
                                <Cascader
                                    value={supplierValue}
                                    options={Supplier}
                                    onChange={this.onChangeSupplier.bind(this)}
                                    placeholder="供应商"
                                />
                                <Button type="primary">查询</Button>
                            </div>
                            <CompactTable
                                // goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                actionAuth={['delete']}
                                pageAuth={false}
                                outStyle={{ 'marginTop': '20px' }}
                                data={data}
                            />
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Firewall;