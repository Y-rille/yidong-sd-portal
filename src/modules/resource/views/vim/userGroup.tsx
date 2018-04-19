import * as React from 'react';
import * as _ from 'lodash';
import styles from '../../style/index.less'
import { Breadcrumb, Icon } from 'antd';
class UserGroup extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    render() {
        let { match, nodeInfo, config } = this.props
        let labelPathArr = nodeInfo ? nodeInfo.labelPath.split('/') : []
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>用户和用户组管理</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        {
                            labelPathArr.map((item, index) => {
                                return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                            })
                        }
                        <Breadcrumb.Item>用户和用户组管理</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px', height: window.innerHeight - 204 }}>
                    <iframe style={{ width: '100%', height: '100%', border: '1px solid #e2e4e9' }} src={`${config.vim_manage_link.user_group}`}></iframe>
                </div>
            </div>
        );
    }
}
export default UserGroup;