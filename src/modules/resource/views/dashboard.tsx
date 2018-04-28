import * as React from 'react';
import * as _ from 'lodash';
import { Row, Breadcrumb, Icon, Button, Spin, Modal } from 'antd';
import OverviewCard from '../../../components/OverviewCard'
import PimSummary from '../../../components/PimSummary'
import VimEdit from '../../../components/VimEdit/'
import Headline from '../../../components/Headline'
import emitter from '../../../common/emitter'
import styles from '../style/index.less'
const confirm = Modal.confirm
let editRef = null
class Dashboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            vimInfo: null,
            loading: false,
            curId: null,
            findVisible: false,
            pimInfo: null
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
    goDelete(moInstId) {
        let self = this
        confirm({
            title: '确定要删除该VIM吗?',
            onOk() {
                self.props.actions.deleteInstance('vim', moInstId, (data, error) => {
                    if (data) {
                        emitter.emit('message', 'success', '删除成功！')
                        self.props.actions.getMoTree('mgrmoTree')
                        self.props.actions.getOverview('overviewVIM')
                    } else {
                        emitter.emit('message', 'error', '删除失败！')
                    }
                })
            },
            okText: '确认',
            cancelText: '取消',
        });
    }
    goBackup(metadata) {
        let { match } = this.props
        if (metadata.ID) {
            this.props.history.push(`${match.url}/backup/${metadata.ID}/clusterConfig`)
        }
    }
    handleOk(formdata) {
        let moTypeKey = 'vim'
        this.setState({
            loading: true
        });
        let { vimInfo, curId } = this.state
        let { config } = this.props
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
                        window.open(config.vim_manage)
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
    doFind(metadata) {
        this.setState({
            findVisible: true,
            pimInfo: metadata
        })
    }
    goTopo(metadata) {
        let { match } = this.props
        if (metadata.ID && metadata.metaname) {
            this.props.history.push(`${match.url}/topo/${metadata.ID}?name=${metadata.metaname}`)
        }
    }
    findHandleOk() {
        let { pimInfo } = this.state
        let { match } = this.props
        if (pimInfo.ID && pimInfo.metaname) {
            this.props.history.push(`${match.url}/topo/${pimInfo.ID}?name=${pimInfo.metaname}`)
        }
        this.setState({
            findVisible: false,
            pimId: null
        })
    }
    findHandleCancle() {
        this.setState({
            findVisible: false
        })
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
                    type={type}
                    goEdit={type === 'vim' ? this.goEdit.bind(this) : null}
                    goDelete={type === 'vim' ? this.goDelete.bind(this) : null}
                    goBackup={type === 'vim' ? this.goBackup.bind(this) : null}
                    doFind={type === 'pim' ? this.doFind.bind(this) : null}
                    goTopo={type === 'pim' ? this.goTopo.bind(this) : null}
                />
            )
        })
    }
    render() {
        let { visible, vimInfo, findVisible } = this.state
        let { overviewVIM, overviewPIM, config } = this.props
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
                {findVisible ? (
                    <Modal
                        title="链路发现"
                        visible={findVisible}
                        onCancel={this.findHandleCancle.bind(this)}
                        footer={[
                            <Button key="submit" type="primary" onClick={this.findHandleOk.bind(this)}>关闭</Button>
                        ]}
                        width="70%"
                        style={{ top: '30px' }}
                    >
                        <iframe style={{ width: '100%', height: window.innerHeight - 208, border: '0px' }} src={`${config.link_find}`}></iframe>
                    </Modal>
                ) : ''}
            </div>
        );
    }
}
export default Dashboard;