import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import CompactTable from '../../../../components/CompactTable/'
import HostInfo from '../../container/vim/hostInfo'
import { Modal, Spin, Button } from 'antd';
import qs from 'querystringify'
import { stringify } from 'querystringify'
import styles from '../../style/index.less'
import BackupForm from '../../../../components/BackupForm'
import emitter from '../../../../common/emitter'
import { ResourceActions } from '../../actions/index'

export interface BackupListProps {
    location
    history
    match
    actions: ResourceActions
    resourceTree
    nodeInfo
    list
    goPage
    goLink
}
class BackupList extends React.Component<BackupListProps, any> {
    formRef: any
    constructor(props) {
        super(props);
        let { pageNo } = qs.parse(this.props.location.search)
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/dashboard/backup/:id'
        })
        this.state = {
            visible: false,
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
            vim_id: mp_node.params.id,
            backupInfo: null
        }
    }
    goPage = (n) => {
        if (this.props.goPage) {
            this.props.goPage(n)
        }
    }
    goLink(key, obj) {
        if (this.props.goLink) {
            this.props.goLink(key, obj)
        }
    }
    goBackup(data) {
        this.setState({
            visible: true,
            backupInfo: data
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            filterDate: null
        });
        this.formRef.handleReset()
    }
    handleOk() {
        let moTypeKey = 'vim'
        let operateType = 'backup'
        let formdata = this.formRef.getData()
        let { backupInfo, vim_id } = this.state
        let moInstId = backupInfo.host_id
        formdata.region = backupInfo.region_name
        formdata.hostId = moInstId
        formdata.vimId = vim_id
        if (formdata) {
            this.props.actions.operateStatus(moTypeKey, moInstId, operateType, (err, res) => {
                if (res && res.code === 1) {
                    emitter.emit('message', 'success', '备份成功！')
                    this.setState({
                        visible: false,
                    });
                    this.formRef.handleReset()
                }
                if (err || (res && res.code !== 1)) {
                    let msg = err && err.response.data.message ? err.response.data.message : '备份失败！'
                    emitter.emit('message', 'error', msg)
                }
            }, formdata)

        }
    }
    render() {
        let { list, location } = this.props
        let { pageSize, tableLoading } = this.state
        const mp_node: any = matchPath(location.pathname, {})
        let ft = ''
        if (mp_node && mp_node.params.type) {
            ft = mp_node.params.type === 'clusterConfig' ? '集群配置' : (mp_node.params.type === 'database' ? '数据库' : '数据库增量')
        }
        return (
            <div>
                {
                    list ? (
                        <CompactTable
                            goPage={this.goPage.bind(this)}
                            goLink={this.goLink.bind(this)}
                            goBackup={this.goBackup.bind(this)}
                            data={list}
                            actionAuth={['backup']}
                            pageSize={pageSize}
                            loading={tableLoading}
                            outStyle={{ 'marginTop': '20px' }}
                            size={{ y: list.totalCount > pageSize ? window.innerHeight - 430 : window.innerHeight - 420 }}
                        />
                    ) : (
                            <Spin />
                        )
                }
                <Modal
                    title="备份"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={[
                        <div className={styles.btn} key="1">
                            <Button className={styles.btn_ok} type="primary" key="submit" onClick={this.handleOk.bind(this)}>确定</Button>
                            <Button key="reset" onClick={this.handleCancel.bind(this)}>取消</Button>
                        </div>
                    ]}
                >
                    < BackupForm wrappedComponentRef={(node) => { this.formRef = node }} />
                </Modal>
            </div>
        );
    }
}
export default BackupList;