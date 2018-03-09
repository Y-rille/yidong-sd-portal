import React from 'react';
import styles from './index.less';
import CompactTable from '../CompactTable'

export interface ServerNetworkCardProps {
    data?
}

class ServerNetworkCard extends React.PureComponent<ServerNetworkCardProps, any> {
    constructor(props: any) {
        super(props)
        this.state = {
        }
    }
    render() {
        let { data } = this.props
        return (
            <div className={styles.serverNetworkCard}>
                <div className={styles.title}>
                    <span>网卡型号：</span><span className={styles.title_header}>{data.title.model}</span>&emsp;
                    <span>接口类型：</span><span className={styles.title_header}>{data.title.ethernetInterfaceType}</span>&emsp;
                    <span>状态：</span><span className={styles.title_header}>{data.title.status}</span>
                </div>
                <CompactTable
                    data={data.table}
                />
            </div>
        )
    }
}

export default ServerNetworkCard;