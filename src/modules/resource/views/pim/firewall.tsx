import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import FirewallInfo from '../../container/pim/firewallInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Cascader, Modal } from 'antd';
import styles from '../../style/index.less'

import FilterFireWallForm from '../../../../components/FilterFireWallForm'
import CompactTable from '../../../../components/CompactTable'
import Cascaderor from '../../../../components/Cascaderor'
import Selector from '../../../../components/Selector'

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
    formRef: any
    constructor(props) {
        super(props);
        this.state = {
            dataCenterValue: [],
            dataVendorValue: '',
            visible: false,
            filterDate: null
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/pim/1/firewall/info`)
    }
    getData(formData) {
        this.setState({
            filterDate: formData
        })
    }
    getCascaderData(type, value) {
        let { dataCenterValue, dataVendorValue } = this.state
        this.setState({
            dataCenterValue: type === 'DataCenter' ? value : dataCenterValue,
            dataVendorValue: type === 'DataVendor' ? value : dataVendorValue
        })
    }
    goLink(key, obj) {
        let { match } = this.props
        if (key === 'id') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            filterDate: null
        });
        this.formRef.handleReset()
    }
    addData = () => {
        this.setState({
            visible: false,
            filterDate: null
        });
        this.formRef.handleReset()
    }
    selectRow = () => { }
    renderAddData() {
        let filterDate = {
            'count': 17,
            'header': [{
                key: 'ip',
                title: '管理Ip',
            }, {
                key: 'name',
                title: '用户名',
            }, {
                key: 'password',
                title: '用户密码',
            }, {
                key: 'brand',
                title: '品牌',
            }, {
                key: 'number',
                title: '序列号'
            }, {
                key: 'status',
                title: '添加状态'
            }],
            'body': [
                {
                    'id': '1',
                    'ip': '10.4.152.1',
                    'name': 'admin',
                    'password': '123123',
                    'brand': 'hp',
                    'number': 'hhhh2',
                    'status': '成功发现',
                },
                {
                    'id': '2',
                    'ip': '10.4.152.2',
                    'name': 'admin',
                    'password': '111111',
                    'brand': 'hpe',
                    'number': 'hhhh2',
                    'status': '成功发现',
                },
                {
                    'id': '3',
                    'ip': '10.4.152.3',
                    'name': 'admin',
                    'password': '1123456',
                    'brand': 'hpe',
                    'number': 'hhhh2',
                    'status': '成功发现',
                }
            ]
        }
        if (this.state.filterDate) {
            return (
                <div style={{ padding: '20px 0 0 0', borderTop: '1px dashed #ddd', marginTop: '20px' }}>
                    <CompactTable
                        // goPage={this.goPage.bind(this)} // 翻页
                        data={filterDate}
                        actionAuth=""
                        selectAuth={true}
                        selectRow={this.selectRow.bind(this)}
                    />
                    <div className="btn" style={{ textAlign: 'right', marginTop: '20px' }}>
                        <Button type="primary" onClick={this.addData.bind(this)}>添加</Button>
                        <Button onClick={this.handleCancel} style={{ marginLeft: '10px' }}>取消</Button>
                    </div>
                </div >
            )
        } else {
            return <div />
        }

    }
    render() {
        let { match, nodeInfo } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        const { dataCenterValue, dataVendorValue } = this.state;
        const DataCenter = [{
            value: '数据中心11',
            label: '数据中心11',
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
        const DataVendor = [{
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
                                {
                                    labelPathArr.map((item, index) => {
                                        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                    })
                                }
                                <Breadcrumb.Item>防火墙管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Cascaderor type="DataCenter" data={this.props.subDataDatacenter} getCascaderData={this.getCascaderData.bind(this)} value={dataCenterValue} />
                                <Selector type="DataVendor" data={DataVendor} getData="" value="" />
                                <Button type="primary">查询</Button>
                                <Button type="primary" style={{ float: 'right' }} onClick={this.showModal}>发现</Button>
                                <Modal
                                    title="发现"
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    footer={null}
                                    width="70%"
                                >
                                    <FilterFireWallForm
                                        getData={this.getData.bind(this)}
                                        wrappedComponentRef={(node) => { this.formRef = node }}
                                    />
                                    {this.renderAddData()}
                                </Modal>
                            </div>
                            <CompactTable
                                // goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                actionAuth={['delete']}
                                // pageAuth={false}
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