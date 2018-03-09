import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import ServerInfo from '../../container/pim/serverInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Modal, Cascader } from 'antd';
import qs from 'querystringify'
import { stringify } from 'querystringify'
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
import Selector from '../../../../components/Selector'
import FilterServerForm from '../../../../components/FilterServerForm'

class Server extends React.Component<any, any> {
    formRef: any;
    constructor(props) {
        super(props);

        let { pageNo, vendor, datacenter } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/:type/:id'
        })
        this.state = {
            vendor: vendor ? vendor : '',   // 供应商
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            pim_id: mp_node.params.id,
            visible: false,
            filterData: null,
            datacenter: datacenter ? datacenter : ''    // 数据中心
        }
    }
    getData(data) {
        this.setState({
            filterData: data
        })
    }
    dataSelectChange(value) {
        this.setState({
            dataSelectValue: value
        })
    }
    // supplierSelectChange(value) {    // 数据中心 
    //     this.setState({
    //         supplierSelectValue: value
    //     })
    // }
    handleClick() { // 查询按钮
        this.setState({
            pageNo: 1
        }, () => {
            let { match } = this.props
            const { vendor, pageNo, datacenter } = this.state;
            let queryObj = { pageNo, vendor, datacenter }
            this.props.history.push(`${match.url}?${stringify(queryObj)}`)
            this.getTableData()
        });

    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            filterData: null,
        });
        this.formRef.resetForm()
    }
    addData = () => {
        this.setState({
            visible: false,
            filterData: null,
        });
        this.formRef.resetForm()
    }
    goPage = (num) => {
        let { match } = this.props
        let { vendor, datacenter } = this.state
        let pageNo = num
        this.setState({
            pageNo: num
        }, () => {
            this.getTableData()
            let queryObj = { pageNo, vendor, datacenter }
            this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        })
    }
    goLink(key, obj) {
        let { match } = this.props
        // if (key === 'id') {
        this.props.history.push(`${match.url}/info/${obj.id}`)
        // }
    }
    getVendorData(type, value) {  // 供应商条件切换
        let { vendor } = this.state
        this.setState({
            vendor: type === 'Vendor' ? value : vendor
        })
    }
    getTableData() {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { vendor, datacenter, pageSize, pim_id, pageNo } = this.state
        this.props.actions.queryList('imdsServer', { pageNo, pageSize, vendor, datacenter, pim_id }, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    componentDidMount() {
        this.getTableData()
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    goDelete(obj) {
        // console.log(obj, '---');
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
            'body': [{
                'id': '0',
                'ip': '10.4.152.2',
                'name': 'admin',
                'password': '123123',
                'brand': 'hp',
                'number': 'hhhh2',
                'status': '成功发现',
            }]
        }
        if (this.state.filterData) {
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
        let tdata = {
            'count': 17,
            'header': [{
                key: 'id',
                title: '序号',
                link: true,
            }, {
                key: 'name',
                title: '服务器A',
            }, {
                key: 'assets',
                title: '1083',
            }, {
                key: 'ip',
                title: '188.103.2.123'
            }, {
                key: 'cpu',
                title: 'HPProLlant DL380'
            }, {
                key: 'suppliert',
                title: '华为'
            }, {
                key: 'equipment',
                title: '机架式服务器'
            },
            {
                key: 'distribution',
                title: '待用',
            },
            {
                key: 'power',
                title: '开机',
            }],
            'body': [
                {
                    'id': 1,
                    'name': 'D19-COMP06',
                    'assets': '0000',
                    'ip': '188.103.21',
                    'cpu': 'HPProLlant DL380',
                    'suppliert': 'HPProLlant DL380',
                    'equipment': 'HPProLlant DL380',
                    'distribution': 'HPProLlant DL380',
                    'power': 'HPProLlant DL380',
                    'action': ' ',
                },
                {
                    'id': 2,
                    'name': 'D19-COMP06',
                    'assets': '0000',
                    'ip': '188.103.21',
                    'cpu': 'HPProLlant DL380',
                    'suppliert': 'HPProLlant DL380',
                    'equipment': 'HPProLlant DL380',
                    'distribution': 'HPProLlant DL380',
                    'power': 'HPProLlant DL380',
                    'action': ' ',
                },
                {
                    'id': 3,
                    'name': 'D19-COMP06',
                    'assets': '0000',
                    'ip': '188.103.21',
                    'cpu': 'HPProLlant DL380',
                    'suppliert': 'HPProLlant DL380',
                    'equipment': 'HPProLlant DL380',
                    'distribution': 'HPProLlant DL380',
                    'power': 'HPProLlant DL380',
                    'action': ' ',
                }, {
                    'id': 4,
                    'name': 'D19-COMP06',
                    'assets': '0000',
                    'ip': '188.103.21',
                    'cpu': 'HPProLlant DL380',
                    'suppliert': 'HPProLlant DL380',
                    'equipment': 'HPProLlant DL380',
                    'distribution': 'HPProLlant DL380',
                    'power': 'HPProLlant DL380',
                    'action': ' ',
                }
                , {
                    'id': 5,
                    'name': 'D19-COMP06',
                    'assets': '0000',
                    'ip': '188.103.21',
                    'cpu': 'HPProLlant DL380',
                    'suppliert': 'HPProLlant DL380',
                    'equipment': 'HPProLlant DL380',
                    'distribution': 'HPProLlant DL380',
                    'power': 'HPProLlant DL380',
                    'action': ' ',
                }
            ]
        }

        let { match, nodeInfo, subDataVendor, subDataCenter, list } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        const { vendor, pageSize, tableLoading, datacenter } = this.state;

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
        return (
            <Switch>
                <Route path={`${match.url}/info/:id`} component={ServerInfo} />
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>服务器管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                {
                                    labelPathArr.map((item, index) => {
                                        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                    })
                                }
                                <Breadcrumb.Item>服务器管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.queryBar}>
                                <Cascader
                                    value={datacenter}
                                    options={subDataCenter}
                                    onChange={this.dataSelectChange.bind(this)}
                                    placeholder="数据中心"
                                />
                                <Selector type="Vendor" data={subDataVendor} getData={this.getVendorData.bind(this)} value={vendor} />
                                <Button
                                    type="primary"
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                            </Button>
                                <Button type="primary" style={{ float: 'right' }} onClick={this.showModal}>发现</Button>
                                <Modal
                                    title="发现"
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    footer={null}
                                    width="70%"
                                >
                                    <FilterServerForm
                                        wrappedComponentRef={(node) => { this.formRef = node }}
                                        getData={this.getData.bind(this)}
                                    />
                                    {this.renderAddData()}
                                </Modal>
                            </div>
                            {
                                this.props.list ? (
                                    <CompactTable
                                        goPage={this.goPage.bind(this)} // 翻页
                                        goLink={this.goLink.bind(this)}
                                        goDelete={this.goDelete.bind(this)}
                                        data={list}
                                        loading={tableLoading}
                                        pageSize={pageSize}
                                        actionAuth={['delete']}
                                    />
                                ) : (
                                        <Spin />
                                    )
                            }
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Server;