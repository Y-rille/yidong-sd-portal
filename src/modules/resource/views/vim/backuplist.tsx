import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import CompactTable from '../../../../components/CompactTable/'
import HostInfo from '../../container/vim/hostInfo'
import { Spin } from 'antd';
import styles from '../../style/index.less'

class BackupList extends React.Component<any, any> {
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
                            goPage={this.goPage.bind(this)} // 翻页
                            goLink={this.goLink.bind(this)}
                            data={list}
                            actionAuth={[]}
                            pageSize={pageSize}
                            loading={tableLoading}
                            outStyle={{ 'marginTop': '20px' }}
                            size={{ y: list.totalCount > pageSize ? window.innerHeight - 430 : window.innerHeight - 420 }}
                        />
                    ) : (
                            <Spin />
                        )
                }
            </div>

        );
    }
}
export default BackupList;