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
                        <span className={styles.title_header}>VIM1</span><span>ID: 12345678</span>&emsp;<span>位置:杭州萧山</span>&emsp;
                        <a href="javascript:;" onClick={this.goEdit.bind(this)}>编辑</a>
                    </div>
                    <Row gutter={20}>
                        <Col span={6}>
                            <Card className={styles._card}>
                                <p style={{ fontSize: '16px', marginBottom: '20px', fontWeight: 'bold' }}>资源分配情况</p>
                                <p style={{ marginTop: '10px' }}>VCPU(未使用/总)<span style={{ color: '#000' }}>：21G/26G</span></p>
                                <p style={{ marginTop: '10px' }}>内存(未使用/总)<span style={{ color: '#000' }}>：21G/26G</span></p>
                                <p style={{ marginTop: '10px' }}>硬盘(未使用/总)<span style={{ color: '#000' }}>：21G/26G</span></p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className={styles._card}>
                                <p style={{ fontSize: '16px', marginBottom: '20px', fontWeight: 'bold' }}>告警</p>
                                <p style={{ marginTop: '10px' }}><span className={styles.icon_lan}></span>总数</p>
                                <p style={{ marginTop: '10px' }}><span className={styles.icon_cheng}></span>严重</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className={styles._card}>
                                <p style={{ fontSize: '16px', marginBottom: '20px', fontWeight: 'bold' }}>虚拟机电源状态</p>
                                <p style={{ marginTop: '10px' }}><span className={styles.icon_lan}></span>总数</p>
                                <p style={{ marginTop: '10px' }}><span className={styles.icon_hui}></span>关机</p>
                                <p style={{ marginTop: '10px' }}><span className={styles.icon_lv}></span>运行</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card className={styles._card}>
                                <p style={{ fontSize: '16px', marginBottom: '20px', fontWeight: 'bold' }}>虚拟机健康状态</p>
                                <p style={{ marginTop: '10px' }}><span className={styles.icon_lan}></span>总数</p>
                                <p style={{ marginTop: '10px' }}><span className={styles.icon_hui}></span>关机</p>
                                <p style={{ marginTop: '10px' }}><span className={styles.icon_lv}></span>运行</p>
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