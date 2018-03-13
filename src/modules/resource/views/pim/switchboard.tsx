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
    list?
}
class Switchboard extends React.Component<SwitchboardProps, any> {
    formRef: any;
    constructor(props) {
        super(props);
        let { pageNo, datacenter, name, switch_id } = qs.parse(this.props.location.search)
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
            inputStatus: switch_id ? 'switchID' : 'switchName',
            switch_id: switch_id ? switch_id : ''
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
                switch_id: ''
            })
        } else {
            this.setState({
                name: '',
                switch_id: value
            })
        }
    }
    handleClick() {
        const { datacenter, name, switch_id } = this.state;
        let pageNo = 1
        this.setState({
            pageNo
        }, () => {
            let { match } = this.props
            let queryObj = { pageNo, datacenter, name, switch_id }
            this.props.history.push(`${match.url}?${qs.stringify(queryObj)}`)
            this.getTableData()
        });
    }
    goPage = (num) => {
        this.setState({
            pageNo: num
        }, () => {
            let { match } = this.props
            let { name, pim_id, datacenter, switch_id } = this.state
            let pageNo = num
            let queryObj = { pageNo, name, switch_id, datacenter }
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
            dataVisible: false
        });
        this.formRef.handleReset()
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
                title: '型号'
            }, {
                key: 'status',
                title: '添加状态'
            }],
            'body': [{
                'id': '0',
                'ip': '10.4.152.60',
                'name': 'admin',
                'password': 'xiaojindian4@1234',
                'brand': 'hp',
                'number': '6cu611xd9v',
                'status': '成功发现',
            }]
        }
        const { dataVisible } = this.state;
        if (dataVisible === true) {
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
            return null;
        }

    }
    selectRow = () => { }
    addData = () => {
        this.setState({
            visible: false,
        });
        this.formRef.handleReset()
    }
    getData(value) {
        let { vendor } = this.state
        this.setState({
            dataVisible: true,
            vendor: value
        })

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
        let { name, switch_id, datacenter, pageSize, pageNo } = this.state
        this.props.actions.queryList('imdsSwitch', { name, switch_id, datacenter, pageNo, pageSize }, () => {
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
        const { name, datacenter, pageSize, tableLoading, switch_id } = this.state;
        let { match, nodeInfo, list, subDataPIM, subDataSwitchType, subDataVendor } = this.props;
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
                                            <Input style={{ width: '180px' }} value={this.state.inputStatus === 'switchName' ? name : switch_id} type="text"
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
                                </div>
                                {/* <Button type="primary" style={{ float: 'right' }} onClick={this.showModal}>发现</Button> */}
                            </div>
                            {list ? (<CompactTable
                                outStyle={{ marginTop: '20px' }}
                                goPage={this.goPage.bind(this)} // 翻页
                                goLink={this.goLink.bind(this)}
                                data={list}
                                pageSize={pageSize}
                                loading={tableLoading}
                                actionAuth={['delete']}
                            />) : (<Spin />)}
                        </div>
                    </div>
                )} />
            </Switch>
        );
    }
}
export default Switchboard;