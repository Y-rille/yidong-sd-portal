import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import MagneticInfo from '../../container/pim/magneticInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Cascader, Modal } from 'antd';
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
import MagneticTable from '../../../../components/MagneticTable/'

class Magnetic extends React.Component<any, any> {
    formRef: any
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            filterDate: null
        };
    }
    goInfo = () => {
        let { match } = this.props
        this.props.history.push(`${match}/info/1`)
    }
    getData(formData) {
        this.setState({
            filterDate: formData
        })
    }
    onChangeDataCenter(value) {
        // console.log(value, 'ppp')
    }
    onChangeSupplier(value) {
        // console.log(value, 'ooo')
    }
    goPage = () => {
        // this.props.history.push(`/resource/vim/1/host/info`)
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
        this.formRef.resetForm()
    }
    addData = () => {
        this.setState({
            visible: false,
            filterDate: null
        });
        this.formRef.resetForm()
    }
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
            'body': [{
                'id': '1',
                'ip': '10.4.152.2',
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
                'password': '123123',
                'brand': 'hp',
                'number': 'hhhh2',
                'status': '成功发现',
            }, {
                'id': '3',
                'ip': '10.4.152.2',
                'name': 'admin',
                'password': '123123',
                'brand': 'hp',
                'number': 'hhhh2',
                'status': '成功发现',
            }, {
                'id': '4',
                'ip': '10.4.152.2',
                'name': 'admin',
                'password': '123123',
                'brand': 'hp',
                'number': 'hhhh2',
                'status': '成功发现',
            }]
        }
        if (this.state.filterDate) {
            return (
                <div style={{ padding: '20px 0 0 0', borderTop: '1px dashed #ddd', marginTop: '20px' }}>
                    <CompactTable
                        // goPage={this.goPage.bind(this)} // 翻页
                        data={filterDate}
                        actionAuth=""
                        // pageAuth={false} 
                        selectAuth={true}
                    />
                    <div className="btn" style={{ textAlign: 'right', marginTop: '20px' }}>
                        <Button type="primary" onClick={this.addData.bind(this)}>添加</Button>
                        <Button onClick={this.handleCancel} style={{ marginLeft: '10px' }}>取消</Button>
                    </div>
                </div >
            )
        } else {
            return (
                <div></div>
            )
        }
    }
    render() {
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
        let { match } = this.props
        return (
            <Switch>
                <Route path={`${match.url}/info/:magneticId`} component={MagneticInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>磁阵管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                <Breadcrumb.Item>物理部署组织</Breadcrumb.Item>
                                <Breadcrumb.Item>磁阵管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px 20px 0px' }}>
                            <div className={styles.queryBar}>
                                <Cascader options={DataCenter} onChange={this.onChangeDataCenter.bind(this)} placeholder="数据中心" />
                                <Cascader options={Supplier} onChange={this.onChangeSupplier.bind(this)} placeholder="供应商" />
                                <Button type="primary">查询</Button>
                                <Button type="primary" style={{ float: 'right' }} onClick={this.showModal}>发现</Button>
                                <Modal
                                    title="发现"
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    footer={null}
                                    width="70%"
                                >
                                    <MagneticTable
                                        getData={this.getData.bind(this)}
                                        wrappedComponentRef={(node) => { this.formRef = node }}
                                    />
                                    {this.renderAddData()}
                                </Modal>
                            </div>
                        </div>
                        <div style={{ padding: '0px 20px 20px' }}>
                            <CompactTable
                                goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                data={{
                                    'count': 10,
                                    'header': [{
                                        key: 'id',
                                        title: '序号',

                                        link: true,
                                    }, {
                                        key: 'name',
                                        title: '磁阵名称',

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
                                        title: '序列号',
                                    }, {
                                        key: 'cpu',
                                        title: '型号'
                                    }, {
                                        key: 'memory',
                                        title: '供应商'
                                    }],
                                    'body': [
                                        {
                                            'id': 1,
                                            'name': 'D19-COMP06',
                                            'mobile': '0000',
                                            'vm': '188.103.21',
                                            'email': '123124124214214',
                                            'cpu': 'HPProLIant DL380',
                                            'memory': '上电',
                                        },
                                        {
                                            'id': 2,
                                            'name': 'ZJHZ-NFV3-SQ5-3F',
                                            'mobile': '0000',
                                            'vm': '188.103.21',
                                            'email': '123124124214214',
                                            'cpu': 'HPProLIant DL380',
                                            'memory': 'HPE',
                                        },
                                        {
                                            'id': 3,
                                            'name': 'ZJHZ-NFV3-SQ5-3F',
                                            'mobile': '0000',
                                            'vm': '188.103.21',
                                            'email': '123124124214214',
                                            'cpu': 'HPProLIant DL380',
                                            'memory': 'HPE',
                                        },
                                        {
                                            'id': 4,
                                            'name': 'ZJHZ-NFV3-SQ5-3F',
                                            'mobile': '0000',
                                            'vm': '188.103.21',
                                            'email': '123124124214214',
                                            'cpu': 'HPProLIant DL380',
                                            'memory': 'HPE',
                                        },
                                        {
                                            'id': 5,
                                            'name': 'ZJHZ-NFV3-SQ5-3F',
                                            'mobile': '0000',
                                            'vm': '188.103.21',
                                            'email': '123124124214214',
                                            'cpu': 'HPProLIant DL380',
                                            'memory': 'HPE',
                                        },
                                        {
                                            'id': 6,
                                            'name': 'ZJHZ-NFV3-SQ5-3F',
                                            'mobile': '0000',
                                            'vm': '188.103.21',
                                            'email': '123124124214214',
                                            'cpu': 'HPProLIant DL380',
                                            'memory': '华为',
                                        },
                                        {
                                            'id': 7,
                                            'name': 'ZJHZ-NFV3-SQ5-3F',
                                            'mobile': '0000',
                                            'vm': '188.103.21',
                                            'email': '123124124214214',
                                            'cpu': 'HPProLIant DL380',
                                            'memory': '华为',
                                        },
                                        {
                                            'id': 8,
                                            'name': 'ZJHZ-NFV3-SQ5-3F',
                                            'mobile': '0000',
                                            'vm': '188.103.21',
                                            'email': '123124124214214',
                                            'cpu': 'HPProLIant DL380',
                                            'memory': '华为',
                                        },
                                        {
                                            'id': 9,
                                            'name': 'ZJHZ-NFV3-SQ5-3F',
                                            'mobile': '0000',
                                            'vm': '188.103.21',
                                            'email': '123124124214214',
                                            'cpu': 'HPProLIant DL380',
                                            'memory': '华为',
                                        },
                                        {
                                            'id': 10,
                                            'name': 'ZJHZ-NFV3-SQ5-3F',
                                            'mobile': '0000',
                                            'vm': '188.103.21',
                                            'email': '123124124214214',
                                            'cpu': 'HPProLIant DL380',
                                            'memory': '华为',
                                        }
                                    ]
                                }}
                                actionAuth={['delete']}
                            />
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Magnetic;