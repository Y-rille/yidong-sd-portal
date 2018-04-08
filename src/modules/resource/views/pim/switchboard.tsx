import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
// import SwitchboardInfo from '../../container/pim/switchboardInfo'
import CompactTable from '../../../../components/CompactTable'
import FilterSwitchBoardForm from '../../../../components/FilterSwitchBoardForm'
import Cascaderor from '../../../../components/Cascaderor'
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Input, Modal, Select, } from 'antd'
import styles from '../../style/index.less'
import qs from 'querystringify'
import { ResourceActions } from '../../actions/index'
const InputGroup = Input.Group;
const Option = Select.Option;
const confirm = Modal.confirm
import emitter from '../../../../common/emitter'

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
    constructor(props) {
        super(props);
        let { pageNo, datacenter, name, assettag } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.match.url, {
            path: '/resource/pim/:id'
        })
        this.state = {
            visible: false,
            dataVisible: false,
            tableLoading: false,
            pim_id: mp_node ? mp_node.params.id : '',
            name: name ? name : '',
            pageSize: 10,
            datacenter: datacenter ? datacenter.split(',') : '',
            pageNo: pageNo ? pageNo : 1,
            inputStatus: assettag ? 'switchID' : 'switchName',
            assettag: assettag ? assettag : '',
            selected: []
        };
    }
    goInfo = () => {
        this.props.history.push(`/resource/pim/1/switchboard/info`)
    }
    onDataChange(value) {
        this.setState({
            datacenter: value
        })
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
        const { datacenter, name, assettag } = this.state;
        let pageNo = 1
        this.setState({
            pageNo
        }, () => {
            let { match } = this.props
            let queryObj = { pageNo, datacenter, name, assettag }
            this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
            this.getTableData()
        });
    }
    goPage = (num) => {
        this.setState({
            pageNo: num
        }, () => {
            let { match } = this.props
            let { name, pim_id, datacenter, assettag } = this.state
            let pageNo = num
            let queryObj = { pageNo, name, assettag, datacenter }
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
    handleManage() { }
    handleCancel = () => {
        this.setState({
            visible: false,
            dataVisible: false
        });
        this.formRef.handleReset()
    }
    goDelete(data) {
        let self = this
        confirm({
            title: '确定要删除该实例吗?',
            onOk() {
                self.props.actions.deleteInstance('switch', data.id, (id, error) => {
                    if (id) {
                        emitter.emit('message', 'success', '删除成功！')
                    } else {
                        emitter.emit('message', 'error', '删除失败！')
                    }
                })
            },
            okText: '确认',
            cancelText: '取消',
        });

    }
    renderAddData() {
        const { dataVisible } = this.state;
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
    selectRow = (data) => {
        this.setState({
            selected: data
        })
    }
    addData = () => {
        let { selected } = this.state
        this.setState({
            visible: false,
        });
        this.props.actions.findConfirm('switch', { data: { dataList: selected } }, (data, err) => {
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
            this.props.actions.resetfindData()
            this.formRef.handleReset()
        })
    }
    getData(data) {
        if (data) {
            this.props.actions.autoDiscovery('switch', data)
        }
    }
    getCascaderData(type, value) {
        let { datacenter } = this.state
        this.setState({
            datacenter: type === 'DataCenter' ? value : datacenter,
        })
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
        let { name, assettag, datacenter, pageSize, pageNo, pim_id } = this.state
        let params_obj = { pageNo, name, assettag, datacenter, pageSize, pim_id }
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
    render() {
        const { name, datacenter, pageSize, tableLoading, assettag } = this.state;
        let { match, nodeInfo, list, subDataPIM, subDataVendor, subDataSwitchType } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
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
                                    getCascaderData={this.getCascaderData.bind(this)} value={datacenter}
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
                                    <Button type="primary" style={{ float: 'right' }} onClick={this.showModal}>发现</Button>
                                    <Modal
                                        title="发现"
                                        visible={this.state.visible}
                                        onCancel={this.handleCancel}
                                        footer={null}
                                        width="70%"
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
                                    <Button type="primary"
                                        style={{ float: 'right' }}
                                        onClick={this.handleManage.bind(this)}
                                    >管理</Button>
                                </div>
                            </div>
                            {list ? (<CompactTable
                                outStyle={{ marginTop: '20px' }}
                                goPage={this.goPage.bind(this)}
                                goLink={this.goLink.bind(this)}
                                data={list}
                                pageSize={pageSize}
                                loading={tableLoading}
                                actionAuth={['delete']}
                                goDelete={this.goDelete.bind(this)}
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
export default Switchboard;