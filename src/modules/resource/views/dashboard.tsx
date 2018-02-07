import * as React from 'react';
import * as _ from 'lodash';
import { Row, Col, Breadcrumb, Icon, Tabs, Button, Input, Modal } from 'antd';
const Search = Input.Search
import styles from '../style/index.less'
class Dashboard extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Row className={styles.resource}>
                <div className={styles.header}>
                    <h1 className={styles.title}>概览</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><Icon type="home" /></Breadcrumb.Item>
                        <Breadcrumb.Item>资源管理</Breadcrumb.Item>
                        <Breadcrumb.Item>概览</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div>
                    DashboardItem
                </div>
            </Row>
        );
    }
}
export default Dashboard;