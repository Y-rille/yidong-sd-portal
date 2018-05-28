import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import { Input, Row, Col, Breadcrumb, Icon, Tabs, Button, Spin, Modal, Select } from 'antd';
const InputGroup = Input.Group;
const Option = Select.Option;
import qs from 'querystringify'
import { stringify } from 'querystringify'
import styles from '../../style/index.less'
import CompactTable from '../../../../components/CompactTable/'
import Selector from '../../../../components/Selector'
import Cascaderor from '../../../../components/Cascaderor'
import emitter from '../../../../common/emitter'
import { ResourceActions } from '../../actions/index'

export interface ShieldListProps {
    location
    history
    match
    actions: ResourceActions
    subDataCenter
    subDataVendor
    nodeInfo
    list
}
class ShieldList extends React.Component<ShieldListProps, any> {
    formRef: any
    uploadRef: any
    constructor(props) {
        super(props);
        let { pageNo, vendor, name, assettag, datacenter, machineroom, cabinet } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/pim/:id/:type/shield'
        })
        this.state = {
            vendor: vendor ? vendor : '',
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            pim_id: mp_node.params.id,
            type: mp_node.params.type,
            visible: false,
            datacenter: datacenter,
            machineroom: machineroom,
            cabinet: cabinet,
            name: name ? name : '',
            inputStatus: assettag ? 'switchID' : 'switchName',
            assettag: assettag ? assettag : '',
            activeKey: ''
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
    dataSelectChange(value) {
        this.setState({
            dataSelectValue: value
        })
    }
    handleClick() {
        let { match } = this.props
        let { type } = match.params
        let queryObj = {}
        const { vendor, pageNo, name, assettag, datacenter, machineroom, cabinet } = this.state;
        this.setState({
            pageNo: 1
        }, () => {
            type === 'switchboard' ? (queryObj = { pageNo, name, assettag, datacenter, machineroom, cabinet }) : (queryObj = { pageNo, vendor, datacenter, machineroom, cabinet })
            this.props.history.push(`${match.url}?${stringify(queryObj)}`)
            this.getTableData()
        });
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
    goList() {
        let path = this.props.location.pathname.replace(/\/shield/, '')
        this.props.history.push(`${path}`)
    }
    goPage = (num) => {
        let { match } = this.props
        let { type } = match.params
        let pageNo = num
        let queryObj = {}
        const { vendor, name, assettag, datacenter, machineroom, cabinet } = this.state;
        this.setState({
            pageNo: num
        }, () => {
            type === 'switchboard' ? (queryObj = { pageNo, name, assettag, datacenter, machineroom, cabinet }) : (queryObj = { pageNo, vendor, datacenter, machineroom, cabinet })
            this.props.history.push(`${match.url}?${stringify(queryObj)}`)
            this.getTableData()
        })
    }
    goRemove(obj) {
        let { type } = this.props.match.params
        let moTypeKey = ''
        switch (type) {
            case 'server':
                moTypeKey = 'server'
                break;
            case 'firewall':
                moTypeKey = 'firewall'
                break;
            case 'switchboard':
                moTypeKey = 'switch'
                break;
            case 'magnetic':
                moTypeKey = 'diskarray'
                break
            default:
                moTypeKey = 'server'
        }
        let moInstId = obj.id
        let self = this
        Modal.confirm({
            title: `确定要移出“${obj.name}”吗？`,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                self.props.actions.deleteInstance(moTypeKey, moInstId, (data, err) => {
                    if (data && data.code === 1) {
                        emitter.emit('message', 'success', '移出成功！')
                    }
                    if (err || (data && data.code !== 1)) {
                        let msg = err && err.response.data.message ? err.response.data.message : '移出失败！'
                        emitter.emit('message', 'error', msg)
                    }
                })
            },
            onCancel() { },
        });
    }
    getVendorData(type, value) {
        let { vendor } = this.state
        this.setState({
            vendor: type === 'Vendor' ? value : vendor
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
        let self = this
        let { vendor, pageSize, pim_id, pageNo, type, datacenter, machineroom, cabinet } = this.state
        let params_obj = { pageNo, pageSize, vendor, pim_id, datacenter, machineroom, cabinet }
        _.forIn(params_obj, ((val, key) => {
            if (val === '' || !val || val.length === 0) {
                delete params_obj[key]
            }
        }));
        let dsname = ''
        switch (type) {
            case 'server':
                dsname = 'imdsServerBlacklist'
                break;
            case 'firewall':
                dsname = 'imdsFirewallBlacklist'
                break;
            case 'switchboard':
                dsname = 'imdsSwitchBlacklist'
                break;
            case 'magnetic':
                dsname = 'imdsDiskArrayBlacklist'
                break;
            default:
                dsname = 'imdsServerBlacklist'
        }
        this.props.actions.queryList(dsname, params_obj, () => {
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
    render() {
        let { match, nodeInfo, subDataVendor, subDataCenter, list } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        const { type, vendor, pageSize, tableLoading, assettag, name, datacenter, machineroom, cabinet } = this.state;
        let base_data = {
            server: '服务器',
            firewall: '防火墙',
            switchboard: '交换机',
            magnetic: '磁阵'
        }
        let titleTxt = ''
        for (const key in base_data) {
            if (type === key) {
                titleTxt = base_data[key]
            }
        }
        return (
            <Switch>
                <Route render={() => (
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.title}>屏蔽{titleTxt}管理</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                                <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                                {
                                    labelPathArr.map((item, index) => {
                                        return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                    })
                                }
                                <Breadcrumb.Item><a onClick={this.goList.bind(this)}>{titleTxt}管理</a></Breadcrumb.Item>
                                <Breadcrumb.Item>屏蔽管理</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div style={{ padding: '20px' }}>
                            <div className={styles.shieldBar}>
                                <div className={styles.shieldQuery}>
                                    <Cascaderor type="DataCenter" style={{ width: '220px' }} data={this.props.subDataCenter} getCascaderData={this.getCascaderData.bind(this)} value={[datacenter, machineroom, cabinet]} />
                                </div>
                                {
                                    type === 'switchboard' ? (
                                        <div className={styles.shieldQuery}>
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
                                    ) : (
                                            <div className={styles.vender}>
                                                <Selector type="Vendor" data={subDataVendor} getData={this.getVendorData.bind(this)} value={vendor} />
                                            </div>)
                                }
                                <Button
                                    type="primary"
                                    onClick={this.handleClick.bind(this)}
                                >
                                    查询
                            </Button>
                            </div>
                            {
                                this.props.list ? (
                                    <CompactTable
                                        outStyle={{ 'marginTop': '20px' }}
                                        goPage={this.goPage.bind(this)}
                                        goRemove={this.goRemove.bind(this)}
                                        data={list}
                                        loading={tableLoading}
                                        pageSize={pageSize}
                                        actionAuth={['remove']}
                                        size={{ y: list.totalCount > pageSize ? window.innerHeight - 371 : window.innerHeight - 340 }}
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
export default ShieldList;