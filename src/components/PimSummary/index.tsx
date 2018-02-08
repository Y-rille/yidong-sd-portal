import * as React from 'react';

import { Row, Col, Card } from 'antd';

import styles from './index.less';

export interface PimSummaryProps {

}

export default class PimSummary extends React.PureComponent<PimSummaryProps, any> {
    renderPim() {
        return (
            <div className={styles.pim}>
                <Row gutter={20}>
                    <Col span={12}>
                        <Card>
                            <p>资源分配情况</p>
                            <p>未完成</p>
                            <p>占位符</p>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <p>服务器</p>
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
                </Row>
            </div>
        )
    }
    render() {
        return (
            <div>
                {this.renderPim()}
            </div>
        );
    }
}