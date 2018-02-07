import * as React from 'react';

import { Row, Col, Icon, Card, Button } from 'antd';

import styles from './index.less';
declare let global: any;

export interface DashboardCardProps {
    goEdit?
}

export default class DashboardCard extends React.PureComponent<DashboardCardProps, any> {
    goInfo() {

    }
    goEdit() {
        if (this.props.goEdit) {
            this.props.goEdit()
        }
    }
    render() {
        return (
            <div>
                <div className={styles.dashcard}>
                    <div className={styles.title}>
                        <span className={styles.title_header}>资源组织结构  VIM1</span><span>ID: 12345678</span>
                        <Button className={styles.bn} size="small" type="primary" onClick={this.goEdit.bind(this)}>编辑</Button>
                    </div>
                    <Row gutter={20}>
                        <Col span={6}>
                            <div className={styles.card} onClick={this.goInfo.bind(this)}>
                                <h3><Icon type="book" /> AZ管理</h3>
                                <p><span>15</span>个</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.card}>
                                <h3><Icon type="desktop" /> HA管理</h3>
                                <p><span>16</span>个</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.card}>
                                <h3><Icon type="calendar" /> 主机管理</h3>
                                <p><span>15</span>台</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.card}>
                                <h3><Icon type="frown" /> 虚拟机管理</h3>
                                <p><span>06</span>台</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={styles.dashcard}>
                    <div className={styles.title}>
                        <span className={styles.title_header}>资源组织结构  VIM2</span><span>ID: 12345678</span>
                        <Button className={styles.bn} size="small" type="primary" onClick={this.goEdit.bind(this)}>编辑</Button>
                    </div>
                    <Row gutter={20}>
                        <Col span={6}>
                            <div className={styles.card} onClick={this.goInfo.bind(this)}>
                                <h3><Icon type="book" /> AZ管理</h3>
                                <p><span>15</span>个</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.card}>
                                <h3><Icon type="desktop" /> HA管理</h3>
                                <p><span>16</span>个</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.card}>
                                <h3><Icon type="calendar" /> 主机管理</h3>
                                <p><span>15</span>台</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.card}>
                                <h3><Icon type="frown" /> 虚拟机管理</h3>
                                <p><span>06</span>台</p>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={styles.dashcard}>
                    <div className={styles.title}>
                        <span className={styles.title_header}>资源组织结构  VIM3</span><span>ID: 12345678</span>
                        <Button className={styles.bn} size="small" type="primary" onClick={this.goEdit.bind(this)}>编辑</Button>
                    </div>
                    <Row gutter={20}>
                        <Col span={6}>
                            <div className={styles.card} onClick={this.goInfo.bind(this)}>
                                <h3><Icon type="book" /> AZ管理</h3>
                                <p><span>15</span>个</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.card}>
                                <h3><Icon type="desktop" /> HA管理</h3>
                                <p><span>16</span>个</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.card}>
                                <h3><Icon type="calendar" /> 主机管理</h3>
                                <p><span>15</span>台</p>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.card}>
                                <h3><Icon type="frown" /> 虚拟机管理</h3>
                                <p><span>06</span>台</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}