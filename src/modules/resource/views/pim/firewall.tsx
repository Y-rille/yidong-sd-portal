import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
// import FirewallInfo from '../../container/pim/firewallInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Cascader, Modal } from 'antd';
import Selector from '../../../../components/Selector'
import styles from '../../style/index.less'

import FilterFireWallForm from '../../../../components/FilterFireWallForm'
import CompactTable from '../../../../components/CompactTable'
import Cascaderor from '../../../../components/Cascaderor'
import { ResourceActions } from '../../actions/index'
import qs from 'querystringify'
import { stringify } from 'querystringify'
import emitter from '../../../../common/emitter'
const confirm = Modal.confirm
export interface FirewallProps {
    location?
    history?
    actions: ResourceActions
    match
    subDataCenter?
    subDataVendor?
    nodeInfo?
    list?
    subDataPIM?
    findData?
    resetfindData?
}
class Firewall extends React.Component<FirewallProps, any> {
    formRef: any
    constructor(props) {
        super(props);
        let { pageNo, datacenter, vendor, pim_id } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/pim/:id'
        })
        this.state = {
            visible: false,
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            datacenter: datacenter ? datacenter.split(',') : '',
            vendor: vendor ? vendor : '',
            pim_id: mp_node ? mp_node.params.id : '',
            selected: [],
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/pim/1/firewall/info`)
    }

    getData(formData) { // 发现
        if (formData) {
            this.props.actions.autoDiscovery('firewall', formData, (backdata, err) => {
                if (err || backdata.code !== 1) {
                    emitter.emit('message', 'error', '发现失败！')
                }

            })
        }
    }
    getCascaderData(type, value) {
        let { datacenter, vendor } = this.state
        this.setState({
            datacenter: type === 'DataCenter' ? value : datacenter,
            vendor: type === 'DataVendor' ? value : vendor
        })
    }

    handleClick() {
        let { match } = this.props
        let pageNo = 1
        let { datacenter, vendor } = this.state
        let queryObj = { pageNo, datacenter, vendor }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData(queryObj)
    }
    goPage = (num) => {
        let { match } = this.props
        let { datacenter, vendor } = this.state
        let pageNo = num
        let queryObj = { pageNo, datacenter, vendor }
        this.props.history.push(`${match.url}?${stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    searchData(type, value) {  // 查询条件切换
        let { vendor } = this.state
        this.setState({
            vendor: type === 'Vendor' ? value : vendor,
        })
    }

    goLink(key, obj) {
        let { match } = this.props
        if (key === 'name') {
            this.props.history.push(`${match.url}/info/${obj.id}`)
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleManage() {

    }
    handleCancel = () => {
        this.setState({
            visible: false,
            filterDate: null
        });
        this.formRef.handleReset()
    }
    addData = () => {
        let { selected } = this.state
        this.props.actions.findConfirm('firewall', { data: { dataList: selected } }, (data, err) => {
            if (data.code === 1) {
                emitter.emit('message', 'success', '添加成功！')
                let pageNo = 1
                let { datacenter, vendor } = this.state
                let queryObj = { pageNo, datacenter, vendor }
                this.setState({
                    pageNo
                });
                this.getTableData(queryObj)
            }
            if (err || data.code !== 1) {
                emitter.emit('message', 'error', '添加失败！')
            }
            this.setState({
                visible: false,
                filterDate: null,
            });
            this.formRef.handleReset()
            this.props.actions.resetfindData()
        })

    }
    updateAll() {
        let { match } = this.props
        this.props.history.push(`${match.url}/edit`)
    }
    deleteAll() {
        let { selected } = this.state
        let self = this
        Modal.confirm({
            title: '确定要批量删除所选防火墙吗?',
            onOk() {
                emitter.emit('message', 'success', '批量删除成功！')
            },
            okText: '确认',
            cancelText: '取消',
        });
    }
    goDelete(obj) {
        let moTypeKey = 'firewall'
        let moInstId = obj.id
        let self = this
        confirm({
            title: '确定要删除该实例吗?',
            okText: '确认',
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

        });
    }
    selectRow = (data) => {
        this.setState({
            selected: data
        });
    }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageSize, pageNo, datacenter, vendor, pim_id } = this.state
        let params_obj = { pageSize, pageNo, datacenter, vendor, pim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsServerFirewall', params_obj, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    componentWillMount() {
        let { pageNo } = this.state
        let queryObj = {
            pageNo
        }
        this.getTableData(queryObj)
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    renderAddData() {
        let { findData } = this.props
        if (findData) {
            let data_fixed = _.merge({}, findData)
            _.map(data_fixed.header, (item) => {
                item.width = '23%'
            })
            return (
                <div style={{ padding: '20px 0 0 0', borderTop: '1px dashed #ddd', marginTop: '20px' }}>
                    <CompactTable
                        // goPage={this.goPage.bind(this)} // 翻页
                        data={data_fixed}
                        actionAuth=""
                        selectAuth={true}
                        selectRow={this.selectRow.bind(this)}
                        size={{ y: '113px' }}
                        pageSize="999"
                    />
                    <div className="btn" style={{ textAlign: 'right', marginTop: '20px' }}>
                        <Button type="primary" disabled={this.state.selected.length > 0 ? false : true} onClick={this.addData.bind(this)}>添加</Button>
                        <Button onClick={this.handleCancel} style={{ marginLeft: '10px' }}>取消</Button>
                    </div>
                </div >
            )
        } else {
            return <div />
        }

    }
    render() {
        let { match, list, nodeInfo, subDataPIM } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        const { pageSize, tableLoading, datacenter, vendor, selected } = this.state;
        return (
            <Switch>
                {/* <Route path={`${match.url}/info/:id`} component={FirewallInfo} /> */}
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
                                <Cascaderor type="DataCenter" style={{ width: '220px' }} data={this.props.subDataCenter} getCascaderData={this.getCascaderData.bind(this)} value={datacenter} />
                                <Selector type="Vendor" data={this.props.subDataVendor} getData={this.searchData.bind(this)} value={vendor} />
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
                                    <FilterFireWallForm
                                        subDataPIM={subDataPIM}
                                        subDataVendor={this.props.subDataVendor}
                                        getData={this.getData.bind(this)}
                                        wrappedComponentRef={(node) => { this.formRef = node }}
                                    />
                                    {this.renderAddData()}
                                </Modal>
                            </div>
                            {list ? (<CompactTable
                                outStyle={{ 'marginTop': '20px' }}
                                pageSize={pageSize}
                                goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                data={list}
                                loading={tableLoading}
                                goDelete={this.goDelete.bind(this)}
                                actionAuth={['delete']}
                                selectAuth={true}
                                selectRow={this.selectRow.bind(this)}
                            />) : (<Spin />)}

                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Firewall;