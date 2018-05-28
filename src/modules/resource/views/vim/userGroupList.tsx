import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { matchPath } from 'react-router'
import { Breadcrumb, Icon, Input, Button, Spin } from 'antd';
import CompactTable from '../../../../components/CompactTable/'
class UserGroupList extends React.Component<any, any> {
    constructor(props) {
        super(props);
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/vim/:id/user_group/:type'
        })
        this.state = {
            type: mp_node ? mp_node.params.type : '',
        }
    }
    goPage = (n) => {
        if (this.props.goPage) {
            this.props.goPage(n)
        }
    }
    goView(key, obj) {
        this.props.goView(key, obj)
    }
    render() {
        const mp_node: any = matchPath(this.props.location.pathname, {
            path: '/resource/vim/:id/user_group/:type'
        })
        let viewList = [
            {
                'key': 'userList',
                'value': '查看用户列表'
            }
        ]
        let type = mp_node ? mp_node.params.type : ''
        let { config, data, pageSize, tableLoading, location } = this.props
        return (
            <div style={{ paddingTop: '20px' }}>
                {
                    data ? (
                        <CompactTable
                            goPage={this.goPage.bind(this)}
                            data={data}
                            pageSize={pageSize}
                            loading={tableLoading}
                            viewList={type === 'group' ? viewList : ''}
                            actionAuth={type === 'group' ? ['view'] : ''}
                            goView={this.goView.bind(this)}
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
export default UserGroupList;