import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
// import MagneticInfo from '../../container/pim/magneticInfo'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Cascader, Modal } from 'antd';
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
import FilterMageticForm from '../../../../components/FilterMageticForm/'
import Cascaderor from '../../../../components/Cascaderor'
import Selector from '../../../../components/Selector'
import qs from 'querystringify'
import emitter from '../../../../common/emitter'
const confirm = Modal.confirm

class Magnetic extends React.Component<any, any> {
    formRef: any
    constructor(props) {
        super(props);
        let { datacenter, vendor, pageNo } = qs.parse(this.props.location.search)
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
            pim_id: mp_node.params.id ? mp_node.params.id : '',
            selected: {},
            findSelected: []
        };
    }
    getData(data) {
        if (data) {
            this.props.actions.autoDiscovery('diskarray', data, (backdata, err) => {
                if (err || backdata.code !== 1) {
                    emitter.emit('message', 'error', '发现失败！')
                }

            })
        }
    }
    handleClick() {
        let { match } = this.props
        let pageNo = 1
        let { datacenter, vendor } = this.state
        let queryObj = { pageNo, datacenter, vendor }
        this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
        this.setState({
            pageNo
        });
        this.getTableData(queryObj)
    }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { datacenter, vendor, pageSize, pim_id } = this.state
        let params_obj = { pageNo, datacenter, vendor, pageSize, pim_id }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        this.props.actions.queryList('imdsSwitchDiskArray', params_obj, () => {
            self.setState({
                tableLoading: false
            });
        })
    }
    componentWillMount() {
        let { pathname } = this.props.location
        let { pageNo } = this.state
        let queryObj = {
            pageNo
        }
        this.getTableData(queryObj)
    }
    getCascaderData(type, value) {
        let { datacenter, vendor } = this.state
        this.setState({
            datacenter: type === 'DataCenter' ? value : datacenter,
            vendor: type === 'Vendor' ? value : vendor
        })
    }
    goPage = (num) => {
        let { match } = this.props
        let { datacenter, vendor } = this.state
        let pageNo = num
        let queryObj = { pageNo, datacenter, vendor }
        this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
        this.getTableData({
            pageNo
        })
    }
    goLink(key, obj) {
        let { match } = this.props
        this.props.history.push(`${match.url}/info/${obj.id}`)
    }
    goDelete(obj) {
        let moTypeKey = 'diskarray'
        let moInstId = obj.id
        let self = this
        confirm({
            title: `确定要删除“${obj.name}”吗？`,
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
    updateAll() {
        let { match } = this.props
        this.props.history.push(`${match.url}/edit`)
    }
    deleteAll() {
        let { selected } = this.state
        let self = this
        Modal.confirm({
            title: '确定要批量删除所选磁阵吗?',
            onOk() {
                let param = {
                    delmoInsts: []
                }
                let moTypeKey = 'magnetic'
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
                // console.log(param, '---p');
                self.props.actions.deleteAll(param, (data, err) => {
                    if (data.code === 1) {
                        emitter.emit('message', 'success', '批量删除成功！')
                        self.getTableData({ pageNo: self.state.pageNo })
                    }
                    if (err || (data && data.code !== 1)) {
                        let msg = err && err.message ? err.message : '批量删除失败！'
                        emitter.emit('message', 'error', msg)
                    }
                })
            },
            okText: '确认',
            cancelText: '取消',
        });
    }
    showModal = () => {
        this.setState({
            visible: true,

        });
    }
    handleManage() { }
    handleCancel = () => {
        this.setState({
            visible: false,
            selected: []
        });
        this.formRef.handleReset()
        this.props.actions.resetfindData()
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
            findSelected: data
        })
    }
    addData = () => {

        let { selected } = this.state
        this.props.actions.findConfirm('diskarray', { data: { dataList: selected } }, (data, err) => {
            if (data.code === 1) {
                emitter.emit('message', 'success', '添加成功！')
                let queryObj = {
                    pageNo: 1
                }
                this.getTableData(queryObj)
            }
            if (err || data.code !== 1) {
                emitter.emit('message', 'error', '添加失败！')
            }
            this.setState({
                visible: false,
                selected: []
            });
            this.formRef.handleReset()
            this.props.actions.resetfindData()
        })
    }
    renderAddData() {
        let { findSelected } = this.state
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
                        selectRow={this.findSelectRow.bind(this)}
                        size={{ y: 113 }}
                    />
                    <div className="btn" style={{ textAlign: 'right', marginTop: '20px' }}>
                        <Button type="primary" disabled={findSelected.length > 0 ? false : true} onClick={this.addData.bind(this)}>添加</Button>
                        <Button onClick={this.handleCancel} style={{ marginLeft: '10px' }}>取消</Button>
                    </div>
                </div >
            )
        } else {
            return <div />
        }
    }
    componentWillUnmount() {
        this.props.actions.resetList()
    }
    render() {
        let { match, nodeInfo, list, subDataPIM } = this.props;
        const { datacenter, vendor, pageSize, tableLoading, selected } = this.state;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        let selectLength = 0
        _.forIn(selected, function (value, key) {
            selectLength += value.length
        });
        return (
            <Switch>
                {/* <Route path={`${match.url}/info/:magneticId`} component={MagneticInfo} /> */}
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>磁阵管理</h1>
                            {nodeInfo ? (<Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                {
                                    labelPathArr.map((item, index) => {
                                        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                    })
                                }
                                <Breadcrumb.Item>磁阵管理</Breadcrumb.Item>
                            </Breadcrumb>) : ''}
                        </div>
                        <div style={{ padding: '20px 20px 0px' }}>
                            <div className={styles.queryBar}>
                                <Cascaderor type="DataCenter" style={{ width: '220px' }} data={this.props.subDataCenter} getCascaderData={this.getCascaderData.bind(this)} value={datacenter} />
                                <Selector type="Vendor" data={this.props.subDataVendor} getData={this.getCascaderData.bind(this)} value={vendor} />
                                <Button type="primary" onClick={this.handleClick.bind(this)}>查询</Button>
                                <div style={{ float: 'right' }}>
                                    <Button type="primary" onClick={this.showModal}>发现</Button>
                                    <Button type="primary" onClick={this.handleManage.bind(this)}>管理</Button>
                                    <Button type="primary" onClick={this.updateAll.bind(this)} disabled={selectLength ? false : true}>批量更新</Button>
                                    <Button type="danger" onClick={this.deleteAll.bind(this)} disabled={selectLength ? false : true}>批量删除</Button>
                                </div>
                                <Modal
                                    title="发现"
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    footer={null}
                                    width="70%"
                                >
                                    <FilterMageticForm
                                        getData={this.getData.bind(this)}
                                        wrappedComponentRef={(node) => { this.formRef = node }}
                                        data={subDataPIM}
                                    />
                                    {this.renderAddData()}
                                </Modal>
                            </div>
                        </div>
                        <div style={{ padding: '0px 20px 20px' }}>
                            {list ? (<CompactTable
                                goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                goDelete={this.goDelete.bind(this)}
                                pageSize={pageSize}
                                loading={tableLoading}
                                data={list}
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
export default Magnetic;