import * as React from 'react';
import * as _ from 'lodash';
import { Row, Breadcrumb, Icon, Button } from 'antd';
import styles from '../style/index.less'

import VimSummary from '../../../components/VimSummary'
import PimSummary from '../../../components/PimSummary'
import VimEdit from '../../../components/VimEdit/'

let editRef = null
let vimInfo = {
    id: 'A12WED34212344RED',
    name: 'vimxxxx',
    url: 'http://www.hpe.com/kkkk',
    position: '北京futong',
    description: '这里是一段资源结构组织的描述描述描述'
}
class Dashboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            vimInfo: vimInfo
        }
    }
    showModal() {
        this.setState({
            visible: true,
            vimInfo: null
        })
    }
    goEdit() {
        this.setState({
            visible: true,
            vimInfo: vimInfo
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
                    <div className={styles.summary}>
                        <span >资源结构组织</span>
                        <Button className={styles.btn} onClick={this.showModal.bind(this)} type="primary">新建VIM</Button>
                    </div>

                    <VimSummary goEdit={this.goEdit.bind(this)} />
                    <p className={styles.summary}>物理部署组织</p>
                    <PimSummary />
                </div>
                {this.state.visible ? (
                    <VimEdit
                        data={this.state.vimInfo}
                        visible={true}
                        handleOk={this.handleOk.bind(this)}
                        handleCancel={this.handleCancel.bind(this)}
                        ref={(node) => { editRef = node }}
                    />
                ) : ''}

            </div>
        );
    }
}
export default Dashboard;