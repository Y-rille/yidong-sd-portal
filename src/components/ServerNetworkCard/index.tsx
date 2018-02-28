import React from 'react';
import styles from './index.less';
import CompactTable from '../CompactTable'

export interface ServerNetworkCardProps {

}

class ServerNetworkCard extends React.PureComponent<ServerNetworkCardProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
        }
    }
    render() {
        return (
            <div className={styles.serverNetworkCard}>
                <div className={styles.title}>
                    <span>网卡型号：</span><span className={styles.title_header}>p3tenant_c119699c-39cb-400d-8f06-6a85b31f7eb9</span>&emsp;
                    <span>接口类型：</span><span className={styles.title_header}>whj_train</span>&emsp;
                    <span>状态：</span><span className={styles.title_header}>ok</span>
                </div>
                <CompactTable
                    // goPage={this.goPage.bind(this)} // 翻页
                    // goLink={this.goLink.bind(this)}
                    // data={null}
                    actionAuth={['delete']}
                    pageAuth={false}
                />
            </div>
        )
    }
}

export default ServerNetworkCard;