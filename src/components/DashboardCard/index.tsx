import * as React from 'react';

import { Row, Col, Icon, Card } from 'antd';

import styles from './index.less';
declare let global: any;

export interface DashboardCardProps {

}

export default class DashboardCard extends React.PureComponent<DashboardCardProps, any> {
    goInfo() {

    }
    render() {
        return (
            <div>
                <div className={styles.dashcard}>
                    <div className={styles.title}>
                        <span className={styles.title_header}>资源组织结构  VIM1</span><span>ID: 12345678</span>
                    </div>
                    <Row gutter={20}>
                        <Col span={6}>
                            <div className={styles.card} onClick={this.goInfo.bind(this)}>
                                <h3>AZ管理</h3>
                                <p><span>15</span>个</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.card}>
                                <h3>HA管理</h3>
                                <p><span>16</span>个</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.card}>
                                <h3>主机管理</h3>
                                <p><span>15</span>台</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.card}>
                                <h3>虚拟机管理</h3>
                                <p><span>06</span>台</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}