import * as React from 'react';
import * as _ from 'lodash';
import { Row, Breadcrumb, Icon } from 'antd';
import styles from '../style/index.less'

import VimSummary from '../../../components/VimSummary'
import PimSummary from '../../../components/PimSummary'
import VimEdit from '../../../components/VimEdit/'

let editRef = null
let vimInfo = {
    id: '1',
    name: 'vim',
    url: 'http://www.baidu',
    position: '北京',
    description: '描述描述描述'
}
class Dashboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            currentId: false
        }
    }
    showModal() {
        this.setState({
            visible: true,
        })
    }
    goEdit() {
        this.setState({
            visible: true,
            currentId: true
        })
    }
    handleOk(data) {
        if (data) {
            this.setState({
                visible: false,
            });
        }
    }
    handleCancel() {
        this.setState({
            visible: false,
        })
    }
    render() {
        return (
            <div className={styles.resource}>
                <div className={styles.header}>
                    <h1 className={styles.title}>概览</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>概览</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className={styles.card}>
                    <p className={styles.summary}>资源结构组织</p>
                    <VimSummary goEdit={this.goEdit.bind(this)} />
                    <p className={styles.summary}>物理部署组织</p>
                    <PimSummary />
                </div>
                <VimEdit
                    data={this.state.currentId ? vimInfo : null}
                    visible={this.state.visible}
                    handleOk={this.handleOk.bind(this)}
                    handleCancel={this.handleCancel.bind(this)}
                    ref={(node) => { editRef = node }}
                />
            </div>
        );
    }
}
export default Dashboard;