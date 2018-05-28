import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { matchPath } from 'react-router'
import { Breadcrumb, Icon, Input, Button, Modal, Spin } from 'antd';
import CompactTable from '../../../../components/CompactTable/'
import emitter from '../../../../common/emitter'
class BackupManageList extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/dashboard/backupmanage/:vimId/:type'
        })
        this.state = {
            type: mp_node ? mp_node.params.type : '',
            vim_id: mp_node ? mp_node.params.vimId : ''
        }
    }
    goPage = (n) => {
        if (this.props.goPage) {
            this.props.goPage(n)
        }
    }
    goRecover(obj) {
        let self = this
        let moInstId = obj.id
        Modal.confirm({
            title: '您确定恢复该备份吗？',
            content: '源文件将被恢复',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                let moTypeKey = 'vim'
                let operateType = 'restore'
                self.props.actions.operateStatus(moTypeKey, moInstId, operateType, (err, data) => {
                    if (data && data.code === 1) {
                        emitter.emit('message', 'success', '恢复成功！')
                    }
                    if (err || (data && data.code !== 1)) {
                        let msg = err && err.response.data.message ? err.response.data.message : '恢复失败！'
                        emitter.emit('message', 'error', msg)
                    }
                })
            },
            onCancel() { },
        });
    }
    render() {
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/dashboard/backupmanage/:vimId/:type'
        })
        let type = mp_node ? mp_node.params.type : ''
        let { data, pageSize, tableLoading, location } = this.props
        // let src = (type === 'user') ? `${config.vim_manage_link.user}` : `${config.vim_manage_link.group}`
        return (
            <div style={{ paddingTop: '20px' }}>
                {/* <iframe style={{ width: '100%', height: '100%', border: '1px solid #e2e4e9' }} src={src}></iframe> */}
                {
                    data ? (
                        <CompactTable
                            goPage={this.goPage.bind(this)}
                            goRecover={this.goRecover.bind(this)}
                            data={data}
                            pageSize={pageSize}
                            loading={tableLoading}
                            actionAuth={['recover']}
                            size={{ y: data.totalCount > pageSize ? window.innerHeight - 430 : window.innerHeight - 420 }}
                        />
                    ) : (
                            <Spin />
                        )
                }
            </div>
        );
    }

}
export default BackupManageList;