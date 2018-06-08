import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import { Breadcrumb, Icon, Button, Spin, Cascader, Tabs, Row, Col, Modal } from 'antd';
import PimEdit from '../../../../components/PimEdit'
import styles from '../../style/index.less'
import emitter from '../../../../common/emitter'
import qs from 'querystringify'
class Edit extends React.Component<any, any> {
    formRef: any
    moTypeKey: any
    id: any
    constructor(props) {
        super(props);
    }
    static defaultProps = {

    }
    getMoTypeKeyAndId() {
        let { type } = this.props.match.params
        this.moTypeKey = ''
        switch (type) {
            case 'server':
                this.moTypeKey = 'server'
                break
            case 'firewall':
                this.moTypeKey = 'firewall'
                break
            case 'switchboard':
                this.moTypeKey = 'switch'
                break
            case 'magnetic':
                this.moTypeKey = 'diskarray'
                break
            default:
                this.moTypeKey = 'server'
        }
        let { id } = qs.parse(this.props.location.search)
        this.id = id.split(',')
    }
    goList() {
        let path = this.props.location.pathname.replace(/\/edit/, '')
        this.props.history.push(`${path}`)
    }
    doCancel() {
        this.props.history.goBack()
    }
    doSubmit() {
        let formdata = this.formRef.getData()
        let params = { configures: [] }
        let flag = _.filter(formdata, item => item !== '')
        if (formdata && flag.length) {
            _.map(this.id, (item) => {
                let paramsItem = {
                    moTypeKey: this.moTypeKey,
                    moInstId: item,
                    attributes: formdata
                }
                params.configures.push(paramsItem)
            })
            this.props.actions.editBatchData(params, (err, data) => {
                if (data && data.code === 1) {
                    emitter.emit('message', 'success', '批量更新成功！')
                    setTimeout(() => {
                        this.goList()
                    }, 1000)
                }
                if (err || (data && data.code === 0)) {
                    emitter.emit('message', 'error', '批量更新失败！')
                }
            })
        } else {
            setTimeout(() => {
                this.goList()
            }, 1000)
        }
    }
    fixData() {
        let { objAttributes, objData } = this.props
        let temp = []
        if (objAttributes && objData) {
            objData.columns.map((item, index) => {
                const key = objData.headers[index];
                const values = objData.values.length > 0 ? objData.values[0][index] : [];
                let summary = _.find(objAttributes, attr => (attr.physicalTablefield === item));
                if (summary && summary.editable === 1) {
                    summary = _.assign({ key, values }, summary);
                    temp.push(summary);
                }
            });
        }
        return temp;
    }
    componentWillMount() {
        this.getMoTypeKeyAndId()
        this.props.actions.getObjAttributes(this.moTypeKey)
        this.props.actions.getObjData(this.moTypeKey, this.id[0])
    }
    componentWillUnmount() {
        this.formRef.handleReset()
        this.props.actions.resetObjAttributes()
        this.props.actions.resetObjData()
    }
    renderPimEdit() {
        let data = this.fixData()
        let { dict, dictOptions } = this.props
        if (data.length) {
            return <PimEdit wrappedComponentRef={(node) => { this.formRef = node }} data={data} dict={dict} dictOptions={dictOptions} />
        }
    }
    render() {
        let { match, subDataCenter, subDataVendor, nodeInfo, objAttributes, objData } = this.props
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        let base_data = {
            server: '服务器',
            firewall: '防火墙',
            switchboard: '交换机',
            magnetic: '磁阵'
        }
        let type = match.params.type
        let titleTxt = ''
        for (const key in base_data) {
            if (type === key) {
                titleTxt = base_data[key]
            }
        }
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>{titleTxt}批量更新</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item><a onClick={this.goList.bind(this)}>{titleTxt}管理</a></Breadcrumb.Item>
                        <Breadcrumb.Item>{titleTxt}批量更新</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px', minHeight: `${window.innerHeight - 277}px` }}>
                    {objAttributes && objData ? this.renderPimEdit() : <div />}
                </div>
                <div className={styles.footer}>
                    <Button onClick={this.doCancel.bind(this)}>取消</Button>
                    <Button type="primary" onClick={this.doSubmit.bind(this)}>确定</Button>
                </div>
            </div>
        )

    }
}
export default Edit;