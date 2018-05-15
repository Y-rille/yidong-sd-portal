import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import CompactTable from '../../../../components/CompactTable/'
import HostInfo from '../../container/vim/hostInfo'
import { Spin } from 'antd';
import styles from '../../style/index.less'

class HostList extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {

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
    render() {
        let { data, pageSize, tableLoading, location } = this.props;
        const mp_node: any = matchPath(location.pathname, {
            path: '/resource/vim/:id/host/:type'
        })
        let ft = ''
        if (mp_node && mp_node.params.type) {
            ft = mp_node.params.type === 'compute' ? '计算节点' : (mp_node.params.type === 'controller' ? '控制节点' : (mp_node.params.type === 'storage') ? '存储节点' : '关注设备')
        }
        let sortAuth = mp_node.params.type === 'favorite' ? true : false
        return (
            <div>
                {
                    data ? (
                        <CompactTable
                            goPage={this.goPage.bind(this)}
                            goLink={this.goLink.bind(this)}
                            data={data}
                            pageSize={pageSize}
                            loading={tableLoading}
                            sortAuth={sortAuth}
                            footInfoAuth={<div>*&nbsp;主机共有{ft}{data.totalCount}个</div>}
                            size={{ y: data.totalCount > pageSize ? window.innerHeight - 408 : window.innerHeight - 401 }}
                        />
                    ) : (
                            <Spin />
                        )
                }
            </div>

        );
    }
}
export default HostList;