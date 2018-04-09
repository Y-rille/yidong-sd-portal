import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
// import ServerInfo from '../../container/pim/serverInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Modal, Cascader } from 'antd';
import qs from 'querystringify'
import { stringify } from 'querystringify'
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
import Selector from '../../../../components/Selector'
import FilterServerForm from '../../../../components/FilterServerForm'
import Cascaderor from '../../../../components/Cascaderor'

import emitter from '../../../../common/emitter'

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
            datacenter: datacenter ? datacenter.split(',') : '',    // 数据中心
            selected: []
        }
    }
    getData(data) {
        if (data) {
            this.props.actions.autoDiscovery('server', data)
        }
    }
    getCascaderData(type, value) {
        let { datacenter, vendor } = this.state
        this.setState({
            datacenter: type === 'DataCenter' ? value : datacenter,
            vendor: type === 'DataVendor' ? value : vendor
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
            let queryObj = { pageNo, datacenter, vendor }
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
        });
        this.formRef.resetForm()
    }
    handleManage() { }
    addData = () => {
        let { selected } = this.state
        this.props.actions.findConfirm('server', { data: { dataList: selected } }, (data, err) => {
            if (data.code === 1) {
                emitter.emit('message', 'success', '添加成功！')
                this.setState({
                    pageNo: 1
                }, () => {
                    this.getTableData()
                })
            }
            if (err || data.code !== 1) {
                emitter.emit('message', 'error', '添加失败！')
            }
            this.setState({
                visible: false,
            });
            this.props.actions.resetfindData()
            this.formRef.resetForm()
        })

    }
    updateAll() { }
    deleteAll() {
        let { selected } = this.state
        let self = this
        Modal.confirm({
            title: '确定要批量删除所选服务器吗?',
            onOk() {
                emitter.emit('message', 'success', '批量删除成功！')
            },
            okText: '确认',
            cancelText: '取消',
        });
    }
    goDelete(obj) {
        let moTypeKey = 'server'
        let moInstId = obj.id
        let self = this
        Modal.confirm({
            title: '确定要删除该实例吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                self.props.actions.deleteInstance(moTypeKey, moInstId, (data, err) => {
                    if (data.code === 1) {
                        emitter.emit('message', 'success', '删除成功！')
                    }
                    if (err || (data && data.code !== 1)) {
                        let msg = err && err.message ? err.message : '删除失败！'
                        emitter.emit('message', 'error', msg)
                    }
                })
            },
            onCancel() { },
        });
    }
    selectRow(data) {
        this.setState({
            selected: data
        })
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
        let params_obj = { pageNo, pageSize, vendor, datacenter, pim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsServer', params_obj, () => {
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
    renderAddData() {
        let { selected } = this.state
        let { findData } = this.props
        if (findData) {
            let data_fixed = _.merge({}, findData)
            _.map(data_fixed.header, (item) => {
                item.width = '23%'
            })
            return (
                <div style={{ padding: '20px 0 0 0', borderTop: '1px dashed #ddd', marginTop: '20px' }}>
                    <CompactTable
                        data={data_fixed}
                        selectAuth={true}
                        selectRow={this.selectRow.bind(this)}
                        size={{ y: 113 }}
                        pageSize={999}
                    />
                    <div className="btn" style={{ textAlign: 'right', marginTop: '20px' }}>
                        <Button type="primary" onClick={this.addData.bind(this)} disabled={selected.length ? false : true}>添加</Button>
                        <Button onClick={this.handleCancel} style={{ marginLeft: '10px' }}>取消</Button>
                    </div>
                </div >
            )
        } else {
            return <div />
        }
    }
    render() {
        let { match, nodeInfo, subDataVendor, subDataCenter, list, subDataPIM } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        const { vendor, pageSize, tableLoading, datacenter, selected } = this.state;
        return (
            <Switch>
                {/* <Route path={`${match.url}/info/:id`} component={ServerInfo} /> */}
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
                                <Cascaderor type="DataCenter" style={{ width: '220px' }} data={this.props.subDataCenter} getCascaderData={this.getCascaderData.bind(this)} value={datacenter} />
                                <Selector type="Vendor" data={subDataVendor} getData={this.getVendorData.bind(this)} value={vendor} />
                                <Button
                                    type="primary"
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                            </Button>
                                <div style={{ float: 'right' }}>
                                    <Button type="primary" onClick={this.showModal}>发现</Button>
                                    <Button type="primary" onClick={this.handleManage.bind(this)}>管理</Button>
                                    <Button type="primary" onClick={this.updateAll.bind(this)} disabled={selected.length ? false : true}>批量更新</Button>
                                    <Button type="danger" onClick={this.deleteAll.bind(this)} disabled={selected.length ? false : true}>批量删除</Button>
                                </div>
                                <Modal
                                    title="发现"
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    footer={null}
                                    width="70%"
                                    style={{ top: '8%' }}
                                >
                                    <FilterServerForm
                                        wrappedComponentRef={(node) => { this.formRef = node }}
                                        getData={this.getData.bind(this)} data={subDataPIM}
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
                                        selectAuth={true}
                                        selectRow={this.selectRow.bind(this)}
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