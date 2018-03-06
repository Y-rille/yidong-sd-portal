import * as React from 'react';
import * as _ from 'lodash';
import { Switch, Route, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router'
import CompactTable from '../../../../components/CompactTable/'
import HostInfo from '../../container/vim/hostInfo'
import { Spin } from 'antd';
import styles from '../../style/index.less'

class Host extends React.Component<any, any> {
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
        // let { pathname } = this.props.location
        // const mp_node: any = matchPath(this.props.match.url, {
        //     path: '/resource/vim/:id'
        // })
        // if (key === 'name') {
        //     this.props.history.replace(`/resource/vim/${mp_node.params.id}/host/info/${obj.name}`)
        // }
    }
    goDelete = () => { }
    goEdit = () => { }
    render() {
        let { match, data, pageSize, tableLoading } = this.props;
        const { menuValue, secondMenuValue, thiredMenuValue } = this.state;
        return (
            <div>
                {
                    this.props.data ? (
                        <CompactTable
                            goPage={this.goPage.bind(this)} // 翻页
                            goLink={this.goLink.bind(this)}
                            data={data}
                            actionAuth={[]}
                            pageSize={pageSize}
                            loading={tableLoading}
                            outStyle={{ 'marginTop': '20px' }}
                        />
                    ) : (
                            <Spin />
                        )
                }
            </div>

        );
    }
}
export default Host;