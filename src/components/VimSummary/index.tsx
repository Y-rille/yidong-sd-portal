import * as React from 'react';

import { Row, Col, Icon, Card, Button } from 'antd';

import styles from './index.less';

export interface VimSummaryProps {
    goEdit?
}

export default class VimSummary extends React.PureComponent<VimSummaryProps, any> {
    goEdit() {
        if (this.props.goEdit) {
            this.props.goEdit()
        }
    }
    renderVim() {
        return (
            <div>
                <div className={styles.vim}>
                    <div className={styles.title}>
                        <span className={styles.title_header}>VIM1</span><span>ID: 12345678</span>&emsp;<span>位置：杭州萧山</span>
                        <a className={styles.edit} href="javascript:;" onClick={this.goEdit.bind(this)}>编辑</a>
                    </div>
                    <Row gutter={20}>
                        <Col span={12}>
                            <Card onClick={this.goEdit.bind(this)}>
                                <p>资源分配情况</p>
                                <p>未完成</p>
                                <p>占位符</p>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card>
                                <p>告警</p>
                                <p>未完成</p>
                                <p>占位符</p>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card>
                                <p>虚拟机电源状态</p>
                                <p>未完成</p>
                                <p>占位符</p>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card>
                                <p>虚拟机健康状态</p>
                                <p>未完成</p>
                                <p>占位符</p>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <div className={styles.vim}>
                    <div className={styles.title}>
                        <span className={styles.title_header}>VIM2</span><span>ID: 12345678</span>&emsp;<span>位置：杭州萧山</span>
                        <a className={styles.edit} href="javascript:;" onClick={this.goEdit.bind(this)}>编辑</a>
                    </div>
                    <Row gutter={20}>
                        <Col span={12}>
                            <Card>
                                <p>资源分配情况</p>
                                <p>未完成</p>
                                <p>占位符</p>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card>
                                <p>告警</p>
                                <p>未完成</p>
                                <p>占位符</p>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card>
                                <p>虚拟机电源状态</p>
                                <p>未完成</p>
                                <p>占位符</p>
                            </Card>
                        </Col>
                        <Col span={4}>
                            <Card>
                                <p>虚拟机健康状态</p>
                                <p>未完成</p>
                                <p>占位符</p>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                {this.renderVim()}
            </div>
        );
    }
}