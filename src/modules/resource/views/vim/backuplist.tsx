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

class BackupList extends React.Component<any, any> {
    constructor(props) {
        super(props);
        let { pageNo, pim_id } = qs.parse
        this.state = {
            visible: false,
            tableLoading: false,
            pageSize: 10,
            pageNo: pageNo ? pageNo : 1,
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
    goBackup() {
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({
            visible: false,
            filterDate: null
        });
    }
    getData() {
        let data = null
        this.props.form.validateFields((err, values) => {
            if (!err) {
                data = values
            } else {
                data = null
            }
        })
        if (this.props.getData) {
            this.props.getData(data)
        }
    }
    resetForm() {
        this.props.form.resetFields()
    }
    render() {
        let { list, pageSize, tableLoading, location } = this.props;
        const mp_node: any = matchPath(location.pathname, {
            // path: '/resource/dashbord/:id/host/:type'
        })
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
                        <div key="1">
                            <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                                文件大小：<span>20k</span>&nbsp;&nbsp;目标地址可用容量：<span>30M</span>
                            </div>
                            <div className={styles.btn}>
                                <Button className={styles.btn_ok} type="primary" key="submit" onClick={this.getData.bind(this)}>确定</Button>
                                <Button key="reset" onClick={this.resetForm.bind(this)}>重置</Button>
                            </div>
                        </div>
                    ]}
                >
                    < BackupForm />
                </Modal>
            </div>
        );
    }
}
export default BackupList;