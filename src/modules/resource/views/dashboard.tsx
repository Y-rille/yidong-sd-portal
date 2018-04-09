import * as React from 'react';
import * as _ from 'lodash';
import { Row, Breadcrumb, Icon, Button, Spin, Modal } from 'antd';
import styles from '../style/index.less'

import OverviewCard from '../../../components/OverviewCard'
// import VimSummary from '../../../components/VimSummary'
import PimSummary from '../../../components/PimSummary'
import VimEdit from '../../../components/VimEdit/'

import Headline from '../../../components/Headline'
import emitter from '../../../common/emitter'
const confirm = Modal.confirm
let editRef = null
// let vimInfo = {
//     vim_id: 'A12WED34212344RED',
//     name: 'vimxxxx',
//     url: 'http://www.hpe.com/kkkk',
//     position: '北京futong',
//     description: '这里是一段资源结构组织的描述描述描述'
// }
class Dashboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            vimInfo: null,
            loading: false,
            curId: null
        }
    }
    showModal() {
        this.setState({
            visible: true,
            vimInfo: null
        })
    }
    goEdit(id) {
        this.props.actions.getObjData('vim', id, (err, data) => {
            if (data && data.code === 1) {
                this.setState({
                    curId: id,
                    visible: true,
                    vimInfo: data.data
                })
            }
        })
    }
    goDelete(data) {
        let self = this
        confirm({
            title: '确定要删除该VIM吗?',
            onOk() {
                emitter.emit('message', 'success', '删除成功！')
                // self.props.actions.deleteInstance('vim', data.id, (id, error) => {
                //     if (id) {
                //         emitter.emit('message', 'success', '删除成功！')
                //     } else {
                //         emitter.emit('message', 'error', '删除失败！')
                //     }
                // })
            },
            okText: '确认',
            cancelText: '取消',
        });
    }
    handleOk(formdata) {
        let moTypeKey = 'vim'
        this.setState({
            loading: true
        });
        let { vimInfo, curId } = this.state
        if (formdata) {
            if (vimInfo && curId) {
                this.props.actions.editObjData(moTypeKey, curId, formdata, (err, data) => {
                    this.setState({
                        visible: false,
                        loading: false,
                        curId: null
                    });
                    this.props.actions.resetObjData()
                    if (data.code === 1) {
                        this.props.actions.getMoTree('mgrmoTree')
                        this.props.actions.getOverview('overviewVIM')
                        emitter.emit('message', 'success', '编辑成功！')
                    } else {
                        emitter.emit('message', 'error', '编辑失败！')
                    }
                })
            } else {
                this.props.actions.addVim(moTypeKey, formdata, (err, data) => {
                    this.setState({
                        visible: false,
                        loading: false
                    });
                    if (data.code === 1) {
                        this.props.actions.getMoTree('mgrmoTree')
                        this.props.actions.getOverview('overviewVIM')
                        emitter.emit('message', 'success', '创建成功！')
                        window.open('http://www.baidu.com')
                    } else {
                        emitter.emit('message', 'error', '创建失败！')
                    }
                })
            }
        }
    }
    handleCancel() {
        this.setState({
            visible: false,
            curId: null
        })
        this.props.actions.resetObjData()
    }
    componentWillMount() {
        this.props.actions.getOverview('overviewVIM')
        this.props.actions.getOverview('overviewPIM')
    }
    renderOverviewCard(data, type) {
        data = data || []
        return _.map(data, (item) => {
            return (
                <OverviewCard
                    data={item}
                    editable={type === 'vim' ? true : false}
                    goEdit={type === 'vim' ? this.goEdit.bind(this) : null}
                    goDelete={type === 'vim' ? this.goDelete.bind(this) : null}
                />
            )
        })
    }
    render() {
        let { visible, vimInfo } = this.state
        let { overviewVIM, overviewPIM } = this.props
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
                    {overviewVIM && overviewPIM ? (
                        <div>
                            <Headline title="资源结构组织">
                                <Button onClick={this.showModal.bind(this)}><Icon type="codepen" />新建VIM</Button>
                            </Headline>
                            {this.renderOverviewCard(overviewVIM, 'vim')}
                            <Headline title="物理部署组织" />
                            {this.renderOverviewCard(overviewPIM, 'pim')}
                        </div>
                    ) : <Spin />}
                </div>
                {visible ? (
                    <VimEdit
                        data={vimInfo}
                        visible={visible}
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