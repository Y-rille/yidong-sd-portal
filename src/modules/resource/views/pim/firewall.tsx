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

export interface FirewallProps {
    location?,
    history?,
    actions: ResourceActions,
    match,
    subDataCenter?
    subDataVendor?,
    nodeInfo?,
    list?
    subDataPIM?,
    findData?,
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
            pageSize: 999,
            pageNo: pageNo ? pageNo : 1,
            datacenter: datacenter ? datacenter.split(',') : '',
            vendor: vendor ? vendor : '',
            pim_id: mp_node ? mp_node.params.id : '',
        }
    }
    goInfo = () => {
        this.props.history.push(`/resource/pim/1/firewall/info`)
    }

    getData(formData) {
        if (formData) {
            this.props.actions.autoDiscovery('firewall', formData)
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
        // let { subDataPIM } = this.props;
        // console.log(subDataPIM.length, "]==[=====================>")
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
        this.props.actions.resetfindData()
    }
    selectRow = () => { }
    getTableData(queryObj) {
        this.setState({
            tableLoading: true
        });
        let self = this
        let { pageNo } = queryObj
        let { pageSize, datacenter, vendor, pim_id } = this.state
        this.props.actions.queryList('imdsServerFirewall', { pageNo, pageSize, datacenter, vendor, pim_id }, () => {
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
        if (this.props.findData) {
            return (
                <div style={{ padding: '20px 0 0 0', borderTop: '1px dashed #ddd', marginTop: '20px' }}>
                    <CompactTable
                        // goPage={this.goPage.bind(this)} // 翻页
                        data={findData}
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
        let { match, list, nodeInfo, subDataPIM } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        const { pageSize, tableLoading, datacenter, vendor } = this.state;
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
                                <Button type="primary" style={{ float: 'right' }} onClick={this.showModal}>发现</Button>
                                <Modal
                                    title="发现"
                                    visible={this.state.visible}
                                    onCancel={this.handleCancel}
                                    footer={null}
                                    width="70%"
                                >
                                    <FilterFireWallForm
                                        subDataPIM={subDataPIM}
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
                                actionAuth={['delete']}
                            // pageAuth={false}                              
                            />) : (<Spin />)}

                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Firewall;