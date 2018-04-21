import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon } from 'antd';
class VirtualSubnet extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    goList() {
        let path = this.props.location.pathname.replace(/\/(\w+)\/subnet/, '')
        this.props.history.push(`${path}`)
    }
    render() {
        let { match, nodeInfo, config } = this.props;
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        let id = this.props.match.params.id
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>虚拟子网管理</h1>
                    {nodeInfo ? (
                        <Breadcrumb>
                            <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                            <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                            {
                                labelPathArr.map((item, index) => {
                                    return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                })
                            }
                            <Breadcrumb.Item><a onClick={this.goList.bind(this)}>虚拟网络管理</a></Breadcrumb.Item>
                            <Breadcrumb.Item>虚拟子网管理</Breadcrumb.Item>
                        </Breadcrumb>
                    ) : ''}
                </div>
                <div style={{ padding: '20px', height: window.innerHeight - 204 }}>
                    <iframe src={`${config.vim_manage_link.virtual_subnet}/${id}/detail`} style={{ width: '100%', height: '100%', border: '1px solid #e2e4e9' }}></iframe>
                </div>
            </div>
        );
    }
}
export default VirtualSubnet;