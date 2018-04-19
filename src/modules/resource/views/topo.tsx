import * as React from 'react';
import * as _ from 'lodash';
import qs from 'querystringify'
import { Icon, Breadcrumb } from 'antd';
import styles from '../style/index.less'

class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount() {

    }
    render() {
        let { name } = qs.parse(this.props.location.search)
        return (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.title}>网络拓扑</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>物理资源</Breadcrumb.Item>
                        <Breadcrumb.Item>{name}</Breadcrumb.Item>
                        <Breadcrumb.Item>网络拓扑</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div style={{ padding: '20px' }}>
                    网络拓扑
                </div>
            </div>
        );
    }
}

export default Home;