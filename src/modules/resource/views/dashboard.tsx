import * as React from 'react';
import * as _ from 'lodash';
import { Row, Breadcrumb, Icon, Button } from 'antd';
import styles from '../style/index.less'

import OverviewCard from '../../../components/OverviewCard'
// import VimSummary from '../../../components/VimSummary'
import PimSummary from '../../../components/PimSummary'
import VimEdit from '../../../components/VimEdit/'

import Headline from '../../../components/Headline'
import emitter from '../../../common/emitter'
let editRef = null
let vimInfo = {
    vim_id: 'A12WED34212344RED',
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
            vimInfo: vimInfo,
            loading: false
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
    handleOk(formdata) {
        let moTypeKey = 'vim'
        this.setState({
            loading: true
        });
        if (formdata) {
            this.props.actions.addVim(moTypeKey, formdata, (data, err) => {
                this.setState({
                    visible: false,
                    loading: false
                });
                if (data.code === 1) {
                    this.props.actions.getMoTree('mgrmoTree')
                    emitter.emit('message', 'success', '创建成功！')
                } else {
                    emitter.emit('message', 'error', '创建失败！')
                }
            })
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
                    <Headline title="资源结构组织">
                        <Button onClick={this.showModal.bind(this)}><Icon type="codepen" />新建VIM</Button>
                    </Headline>
                    <OverviewCard goEdit={this.goEdit.bind(this)} />
                    <OverviewCard goEdit={this.goEdit.bind(this)} />
                    <Headline title="物理部署组织" />
                    <PimSummary />
                </div>
                {this.state.visible ? (
                    <VimEdit
                        data={this.state.vimInfo}
                        visible={true}
                        loading={this.state.loading}
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