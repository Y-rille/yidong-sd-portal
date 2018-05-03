import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon, Button, Tabs, Spin, Modal } from 'antd';
import DynamicPropertiesCollapse from '../../../../components/DynamicPropertiesCollapse'
import LogShine from '../../../../components/LogShine/'
import fmtLog from '../../utils/fmtLog'
const TabPane = Tabs.TabPane;
import emitter from '../../../../common/emitter'
import CreateSnapshotForm from '../../../../components/CreateSnapshotForm'

class StorgeVolumeInfo extends React.Component<any, any> {
    formRef: any
    constructor(props) {
        super(props);
        this.state = {
            events: [],
        }
    }
    goList() {
        let path = this.props.location.pathname.replace(/\/info\/(\w+)/, '')
        this.props.history.push(`${path}`)
    }
    tabInfo = (key) => {
        this.setState({
            showBtn: key === 'log' ? false : true
        })
        if (key === 'log') {
            this.props.actions.getSyslog('storageVolum', this.props.match.params.id, (data, err) => {
                if (data.code === 1) {
                    let data_fix = data.log.split('\n')
                    this.setState({
                        events: data_fix
                    })
                }
            })
        }
    }
    onChange() { }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }
    handleOk() {
        let moTypeKey = 'storageVolum'
        let operateType = 'snapshot'
        let moInstId = this.props.match.params.id
        let formdata = this.formRef.getData()
        if (formdata) {
            this.props.actions.operateStatus(moTypeKey, moInstId, operateType, (err, res) => {
                // console.log(res, 'res')
                // if (res.code === 1) {
                //     emitter.emit('message', 'success', '操作成功！')
                // }
                // if (err || (res && res.code !== 1)) {
                //     let msg = err && err.message ? err.message : '操作失败！'
                //     emitter.emit('message', 'error', msg)
                // }
            }, formdata)

        }
    }
    storageManage() {
        let { config } = this.props
        window.open(config.IPSAN)
    }

    handleEditData(d, cb) {
        let moTypeKey = 'storageVolum'
        let match = this.props.match
        let moInstId = match.params.id
        this.props.actions.editObjData(moTypeKey, moInstId, d, (err, qdata) => {
            if (err || qdata.code !== 1) {
                emitter.emit('message', 'error', '修改失败')
                if (cb) {
                    cb()
                }
            } else if (qdata.code === 1) {
                this.props.actions.getObjData(moTypeKey, moInstId, (error, res) => {
                    if (res && res.code === 1) {
                        if (cb) {
                            cb()
                        }
                    }
                    if (res && res.code === 0 || error) {
                        emitter.emit('message', 'error', '修改失败')
                        if (cb) {
                            cb()
                        }
                    }
                })
            }
        })
    }
    componentWillMount() {
        let moTypeKey = 'storageVolum'
        let match = this.props.match
        let id = match.params.id
        this.props.actions.getObjAttributes(moTypeKey)
        this.props.actions.getObjData(moTypeKey, id)
    }
    componentWillUnmount() {
        this.props.actions.resetSyslog();
        this.props.actions.resetObjAttributes()
        this.props.actions.resetObjData()
    }
    renderBtns() {
        let { objData, objAttributes } = this.props
        let storageVolumeSize, AvailableCapacity
        if (objData) {
            let { columns, values } = objData
            let observe
            let baseData = _.zipObject(columns, _.head(values))
            storageVolumeSize = baseData.storageVolumeSize
            AvailableCapacity = baseData.AvailableCapacity
        }
        return (
            <div className={styles.btn}>
                <Button
                    type="primary" ghost
                    icon="credit-card"
                    onClick={this.showModal}
                >创建快照</Button>
                <Button
                    type="primary" ghost
                    icon="eye-o"
                    onClick={this.storageManage.bind(this)}
                >存储管理</Button>
                <Modal
                    title="创建快照"
                    visible={this.state.visible}
                    footer={[
                        <div style={{ display: 'flex', justifyContent: 'space-between' }} key="1">
                            <div className={styles.size}>
                                卷大小：<span>{storageVolumeSize}MB</span>&nbsp;&nbsp;可用容量：<span>{AvailableCapacity}GB</span>
                            </div>
                            <div className={styles.btn}>
                                <Button className={styles.btn_ok} type="primary" key="submit" onClick={this.handleOk.bind(this)}>确定</Button>
                                <Button key="reset" onClick={this.handleCancel.bind(this)}>取消</Button>
                            </div>
                        </div>
                    ]}
                >
                    < CreateSnapshotForm wrappedComponentRef={(node) => { this.formRef = node }} />
                </Modal>
            </div>
        )
    }
    renderDynamicPropertiesCollapse() {
        if (this.props.objAttributes && this.props.objData) {
            return (
                <DynamicPropertiesCollapse
                    attributes={this.props.objAttributes}
                    data={this.props.objData}
                    editData={this.handleEditData.bind(this)} />
            )
        } else {
            return (
                <div style={{ position: 'relative', padding: '50px' }}>
                    <Spin />
                </div>
            )
        }
    }
    render() {
        let { nodeInfo } = this.props
        let { events } = this.state
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>存储卷详情</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item><a onClick={this.goList.bind(this)}>存储卷管理</a></Breadcrumb.Item>
                            <Breadcrumb.Item>存储卷详情</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '20px' }}>
                    <Tabs onChange={this.onChange.bind(this)} animated={false} type="card">
                        <TabPane tab="资源详情" key="1">
                            <Tabs
                                defaultActiveKey="1"
                                animated={false}
                                size="small"
                                tabBarExtraContent={this.renderBtns()}
                                onChange={this.tabInfo}
                            >
                                <TabPane tab="资源概况" key="overview">
                                    {this.renderDynamicPropertiesCollapse()}
                                </TabPane>
                                {/* <TabPane tab="日志" key="log">
                                    <LogShine events={events} />
                                </TabPane> */}
                            </Tabs>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
export default StorgeVolumeInfo;