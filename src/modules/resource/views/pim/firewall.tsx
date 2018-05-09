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
import FindUpload from '../../../../components/FindUpload/'

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
    uploadRef: any
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
            selected: {},
            btnDisabled: true,
            findSelected: [],
            uploadUrl: ''
        }
    }
    getData(formData) {
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
    searchData(type, value) {
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
    handleCancel = () => {
        this.setState({
            visible: false,
            filterDate: null
        });
        this.formRef.handleReset()
    }
    selectRow = (data) => {
        let { pageNo, selected } = this.state
        let newSelected = selected
        newSelected[pageNo] = data
        this.setState({
            selected: newSelected
        })
    }
    findSelectRow(data) {
        this.setState({
            findSelected: data,
            btnDisabled: data.length > 0 ? false : true
        })
    }
    createTemplate = () => {
        let { findSelected } = this.state
        let { findData } = this.props
        let params = {
            code: 1,
            data: {
                header: findData.header,
                dataList: findSelected
            }
        }
        this.props.actions.findtemplate('firewall', params, (data, err) => {
            if (data && data.code === 1) {
                this.setState({
                    downloadUrl: data.url
                })
                emitter.emit('message', 'success', '模板生成成功！')
            }
            if (err || (data && data.code !== 1)) {
                emitter.emit('message', 'error', '模板生成失败！')
            }
        })
    }
    findConfirm() {
        let { uploadUrl } = this.state
        if (!uploadUrl) {
            this.uploadRef.removeFileList()
            emitter.emit('message', 'error', '请先上传模板文件！')
            return
        }
        this.props.actions.findConfirm('firewall', { url: uploadUrl }, (data, err) => {
            if (data && data.code === 1) {
                emitter.emit('message', 'success', '发现成功！')
                this.setState({
                    pageNo: 1
                }, () => {
                    this.getTableData()
                })
            }
            if (err || (data && data.code !== 1)) {
                emitter.emit('message', 'error', '发现失败！')
            }
            this.setState({
                visible: false,
            });
            this.props.actions.resetfindData()
            this.formRef.resetForm()
            this.uploadRef.removeFileList()
        })
    }
    uploadChange(url) {
        this.setState({
            uploadUrl: url
        })
    }
    updateAll() {
        let { match } = this.props
        let { selected } = this.state
        let selectParam = []
        for (let page in selected) {
            if (selected.hasOwnProperty(page)) {
                let selectArr = selected[page]
                for (let i = 0; i < selectArr.length; i++) {
                    selectParam.push(selectArr[i].id)
                }
            }
        }
        this.props.history.push(`${match.url}/edit?id=${selectParam.join(',')}`)
    }
    deleteAll() {
        let { selected } = this.state
        let self = this
        Modal.confirm({
            title: '确定要批量删除所选防火墙吗?',
            onOk() {
                let param = {
                    delmoInsts: []
                }
                let moTypeKey = 'firewall'
                for (let page in selected) {
                    if (selected.hasOwnProperty(page)) {
                        let selectArr = selected[page]
                        for (let i = 0; i < selectArr.length; i++) {
                            let sObj = {
                                moTypeKey: moTypeKey,
                                moInstId: selectArr[i].id
                            }
                            param.delmoInsts.push(sObj)
                        }
                    }
                }
                self.props.actions.deleteAll(param, (data, err) => {
                    if (data && data.code === 1) {
                        emitter.emit('message', 'success', '批量删除成功！')
                        self.getTableData()
                    }
                    if (err || (data && data.code !== 1)) {
                        let msg = err && err.response.data.message ? '批量删除失败, ' + err.response.data.message : '批量删除失败！'
                        emitter.emit('message', 'error', msg)
                    }
                })
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
            title: `确定要删除“${obj.name}”吗？`,
            okText: '确认',
            cancelText: '取消',
            onOk() {
                self.props.actions.deleteInstance(moTypeKey, moInstId, (data, err) => {
                    if (data && data.code === 1) {
                        emitter.emit('message', 'success', '删除成功！')
                    }
                    if (err || (data && data.code !== 1)) {
                        let msg = err && err.response.data.message ? err.response.data.message : '删除失败！'
                        emitter.emit('message', 'error', msg)
                    }
                })
            },
        });
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
        this.props.actions.queryList('imdsServerFirewall', params_obj, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    componentWillMount() {
        this.getTableData()
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    renderAddData() {
        let { findData } = this.props
        let { btnDisabled } = this.state
        if (findData) {
            let data_fixed = _.merge({}, findData)
            _.map(data_fixed.header, (item) => {
                item.width = '23%'
            })
            return (
                <div className={styles.projectile}
                >
                    <CompactTable
                        data={data_fixed}
                        selectAuth={true}
                        selectRow={this.findSelectRow.bind(this)}
                        size={{ y: 113 }}
                        pageSize={999}
                    />
                    <div className="btn" style={{ textAlign: 'right', marginTop: '20px' }}>
                        <Button icon="table" style={{ marginRight: '10px' }} onClick={this.createTemplate.bind(this)} disabled={btnDisabled}>生成模板</Button>
                        <Button icon="download" disabled={btnDisabled}>下载模版</Button>
                    </div>
                    <div className={styles.projectile} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <FindUpload ref={(node) => { this.uploadRef = node }} disabled={btnDisabled} uploadChange={this.uploadChange.bind(this)} moTypeKey="firewall" />
                        </div>
                        <div>
                            <Button type="primary" onClick={this.findConfirm.bind(this)} disabled={btnDisabled}>发现</Button>
                        </div>
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
        let selectLength = 0
        _.forIn(selected, function (value, key) {
            selectLength += value.length
        });
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
                                    <Button type="primary" onClick={this.updateAll.bind(this)} disabled={selectLength ? false : true}>批量更新</Button>
                                    <Button type="danger" onClick={this.deleteAll.bind(this)} disabled={selectLength ? false : true}>批量删除</Button>
                                </div>
                                <Modal
                                    title="发现"
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    footer={null}
                                    width="80%"
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
                                size={{ y: list.totalCount > pageSize ? window.innerHeight - 371 : window.innerHeight - 340 }}
                            />) : (<Spin />)}

                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Firewall;