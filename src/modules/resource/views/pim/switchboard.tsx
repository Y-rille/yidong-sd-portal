import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
// import SwitchboardInfo from '../../container/pim/switchboardInfo'
import CompactTable from '../../../../components/CompactTable'
import FilterSwitchBoardForm from '../../../../components/FilterSwitchBoardForm'
import Cascaderor from '../../../../components/Cascaderor'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Input, Modal, Select } from 'antd'
import styles from '../../style/index.less'
import qs from 'querystringify'
import { ResourceActions } from '../../actions/index'
const InputGroup = Input.Group;
const Option = Select.Option;
const confirm = Modal.confirm
import emitter from '../../../../common/emitter'
import FindUpload from '../../../../components/FindUpload/'

export interface SwitchboardProps {
    location?,
    history?,
    actions: ResourceActions,
    match,
    subDataCenter?,
    subDataPIM?,
    subDataSwitchType?,
    subDataVendor?,
    nodeInfo?,
    list?,
    findData?,

}
class Switchboard extends React.Component<SwitchboardProps, any> {
    formRef: any;
    uploadRef: any
    constructor(props) {
        super(props);
        let { pageNo, datacenter, machineroom, cabinet, name, assettag } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/pim/:id'
        })
        this.state = {
            visible: false,
            tableLoading: false,
            pim_id: mp_node ? mp_node.params.id : '',
            name: name ? name : '',
            pageSize: 10,
            // datacenter: datacenter ? datacenter.split(',') : '',
            datacenter: datacenter,     // 数据中心
            machineroom: machineroom,   // 机房
            cabinet: cabinet,           // 机柜
            pageNo: pageNo ? pageNo : 1,
            inputStatus: assettag ? 'switchID' : 'switchName',
            assettag: assettag ? assettag : '',
            selected: {},
            findSelected: [],
            btnDisabled: true,
            uploadUrl: ''
        };
    }
    onNameChange(value) {
        if (this.state.inputStatus === 'switchName') {
            this.setState({
                name: value,
                assettag: ''
            })
        } else {
            this.setState({
                name: '',
                assettag: value
            })
        }
    }
    handleClick() {
        const { datacenter, machineroom, cabinet, name, assettag } = this.state;
        let pageNo = 1
        this.setState({
            pageNo
        }, () => {
            let { match } = this.props
            let queryObj = { pageNo, datacenter, machineroom, cabinet, name, assettag }
            this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
            this.getTableData()
        });
    }
    goPage = (num) => {
        this.setState({
            pageNo: num
        }, () => {
            let { match } = this.props
            let { name, pim_id, datacenter, machineroom, cabinet, assettag } = this.state
            let pageNo = num
            let queryObj = { pageNo, name, assettag, datacenter, machineroom, cabinet }
            this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
            this.getTableData()
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
        });
        this.formRef.handleReset()
        this.props.actions.resetfindData()
        if (this.uploadRef) {
            this.uploadRef.removeFileList()
        }
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
    goDelete(obj) {
        let moTypeKey = 'switch'
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
            title: '确定要批量删除所选交换机吗?',
            onOk() {
                let param = {
                    delmoInsts: []
                }
                let moTypeKey = 'switch'
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
    shield() {
        let { match } = this.props
        this.props.history.push(`${match.url}/shield`)
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
        this.props.actions.findtemplate('switch', params, (data, err) => {
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
    downloadTemplate() {
        let { downloadUrl } = this.state
        if (downloadUrl) {
            window.open(downloadUrl)
        } else {
            emitter.emit('message', 'error', '请先生成模板！')
        }
    }
    uploadChange(url) {
        this.setState({
            uploadUrl: url
        })
    }
    findConfirm() {
        let { uploadUrl } = this.state
        if (!uploadUrl) {
            this.uploadRef.removeFileList()
            emitter.emit('message', 'error', '请先上传模板文件！')
            return
        }
        this.props.actions.findConfirm('switch', { url: uploadUrl }, (data, err) => {
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
            this.formRef.handleReset()
            this.uploadRef.removeFileList()
        })
    }
    getData(data) {
        if (data) {
            this.props.actions.autoDiscovery('switch', data, (backdata, err) => {
                if (err || (backdata && backdata.code !== 1)) {
                    emitter.emit('message', 'error', '发现失败！')
                }
            })
        }
    }
    getCascaderData(type, value) {
        if (type === 'DataCenter') {
            this.setState({
                datacenter: value[0],
                machineroom: value[1],
                cabinet: value[2]
            })
        }
    }
    getSelectValue(value) {
        this.setState({
            inputStatus: value
        })
    }
    getTableData() {
        this.setState({
            tableLoading: true
        });
        let { name, assettag, datacenter, machineroom, cabinet, pageSize, pageNo, pim_id } = this.state
        let params_obj = { pageNo, name, assettag, datacenter, machineroom, cabinet, pageSize, pim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsSwitch', params_obj, () => {
            this.setState({
                tableLoading: false
            });
        })
    }
    componentWillMount() {
        this.getTableData()
    }
    componentWillUnMount() {
        this.props.actions.resetList()
    }
    renderAddData() {
        let { findData } = this.props
        let { btnDisabled } = this.state
        if (findData) {
            let data_fixed = _.merge({}, findData)
            _.map(data_fixed.header, (item) => {
                item.width = `${100 / data_fixed.header.length}%`
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
                        <Button icon="download" disabled={btnDisabled} onClick={this.downloadTemplate.bind(this)} >下载模版</Button>
                    </div>
                    <div className={styles.projectile} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <FindUpload ref={(node) => { this.uploadRef = node }} disabled={btnDisabled} uploadChange={this.uploadChange.bind(this)} moTypeKey="switch" />
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
        const { name, datacenter, machineroom, cabinet, pageSize, tableLoading, assettag, selected } = this.state;
        let { match, nodeInfo, list, subDataPIM, subDataVendor, subDataSwitchType } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        let selectLength = 0
        _.forIn(selected, function (value, key) {
            selectLength += value.length
        });
        return (
            <Switch>
                {/* <Route path={`${match.url}/info/:id`} component={SwitchboardInfo} /> */}
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>交换机管理</h1>
                            {nodeInfo ? (<Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                {
                                    labelPathArr.map((item, index) => {
                                        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                    })
                                }
                                <Breadcrumb.Item>交换机管理</Breadcrumb.Item>
                            </Breadcrumb>) : ''}

                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.swichQueryBar}>
                                <div className={styles.swichQuery}><Cascaderor
                                    style={{ width: '220px' }}
                                    type="DataCenter"
                                    data={this.props.subDataCenter}
                                    getCascaderData={this.getCascaderData.bind(this)} value={[datacenter, machineroom, cabinet]}
                                />
                                    <div>
                                        <InputGroup compact>
                                            <Select onChange={this.getSelectValue.bind(this)} defaultValue={this.state.inputStatus === 'switchName' ? '名称' : '编号'}>
                                                <Option value="switchName">名称</Option>
                                                <Option value="switchID">编号</Option>
                                            </Select>
                                            <Input style={{ width: '180px' }} value={this.state.inputStatus === 'switchName' ? name : assettag} type="text"
                                                onChange={e => this.onNameChange(e.target.value)}
                                                placeholder={this.state.inputStatus === 'switchName' ? '名称' : '编号'} />
                                        </InputGroup>
                                    </div>
                                    <Button
                                        type="primary"
                                        onClick={this.handleClick.bind(this)}
                                    >
                                        查询
                                </Button>
                                </div>
                                <div>
                                    <div style={{ float: 'right' }}>
                                        <Button type="primary" onClick={this.showModal}>发现</Button>
                                        <Button type="primary" onClick={this.updateAll.bind(this)} disabled={selectLength ? false : true}>批量更新</Button>
                                        <Button type="danger" onClick={this.deleteAll.bind(this)} disabled={selectLength ? false : true}>批量删除</Button>
                                        <Button type="primary" onClick={this.shield.bind(this)}>屏蔽管理</Button>
                                    </div>
                                    <Modal
                                        title="发现"
                                        visible={this.state.visible}
                                        onCancel={this.handleCancel}
                                        footer={null}
                                        width="80%"
                                    >
                                        <FilterSwitchBoardForm
                                            getData={this.getData.bind(this)}
                                            wrappedComponentRef={(node) => { this.formRef = node }}
                                            subDataPIM={subDataPIM}
                                            subDataVendor={subDataVendor}
                                            subDataSwitchType={subDataSwitchType}
                                        />
                                        {this.renderAddData()}
                                    </Modal>
                                </div>
                            </div>
                            {list ? (<CompactTable
                                goPage={this.goPage.bind(this)}
                                goLink={this.goLink.bind(this)}
                                data={list}
                                pageSize={pageSize}
                                loading={tableLoading}
                                actionAuth={['delete']}
                                goDelete={this.goDelete.bind(this)}
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
export default Switchboard;