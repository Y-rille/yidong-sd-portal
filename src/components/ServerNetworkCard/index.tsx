import React from 'react';
import styles from './index.less';

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
                网卡信息
            </div>
        )
    }

}

export default ServerNetworkCard;