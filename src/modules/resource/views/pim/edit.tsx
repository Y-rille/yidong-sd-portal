import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import { Breadcrumb, Icon, Button, Spin, Cascader, Tabs, Row, Col, Modal } from 'antd';
import PimEdit from '../../../../components/PimEdit'
import styles from '../../style/index.less'
import emitter from '../../../../common/emitter'
class Edit extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    static defaultProps = {

    }
    goList() {
        let path = this.props.location.pathname.replace(/\/edit/, '')
        this.props.history.push(`${path}`)
    }
    doCancel() {
        this.props.history.goBack()
    }
    doSubmit() {
        emitter.emit('message', 'success', '批量更新成功！')
        setTimeout(() => {
            this.goList()
        }, 1000)
    }
    fixData() {
        let { objAttributes, objData } = this.props
        let temp = []
        if (objAttributes && objData) {
            objData.data.columns.map((item, index) => {
                const key = objData.data.headers[index];
                const values = objData.data.values.length > 0 ? objData.data.values[0][index] : [];
                let summary = _.find(objAttributes.data, attr => (attr.physicalTablefield === item));
                if (summary && summary.editable === 1) {
                    summary = _.assign({ key, values }, summary);
                    temp.push(summary);
                }
            });
        }
        return temp;
    }
    componentWillMount() {

    }
    renderPimEdit() {
        let data = this.fixData()
        if (data.length) {
            return _.map(data, (item) => {
                return <PimEdit data={item} />
            })
        }
    }
    render() {
        let { match, subDataCenter, subDataVendor, nodeInfo } = this.props
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
                <div style={{ padding: '20px' }}>
                    {this.renderPimEdit()}
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