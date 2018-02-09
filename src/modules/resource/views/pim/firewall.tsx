import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import FirewallInfo from '../../container/pim/firewallInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Cascader } from 'antd';
import styles from '../../style/index.less'

import CompactTable from '../../../../components/CompactTable'

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
                <Route path={`${match.url}/info`} component={FirewallInfo} />
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
                        </div>
                        <div style={{ padding: '20px' }}>
                            <CompactTable
                                // goPage={this.goPage.bind(this)} // 翻页
                                // goLink={this.goLink.bind(this)}
                                // data={null}
                                actionAuth={['delete']}
                                pageAuth={false}
                            />
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Firewall;