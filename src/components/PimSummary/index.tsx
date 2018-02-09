import * as React from 'react';

import { Row, Col, Card } from 'antd';

import styles from './index.less';

import * as Highcharts from 'highcharts';

export interface PimSummaryProps {

}

export default class PimSummary extends React.PureComponent<PimSummaryProps, any> {
    pie: any
    options: any
    chart: any
    componentDidMount() {
        this.options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: ''
            },
            tooltip: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    colors: ['red', 'blue', 'black'],
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true,
                    size: 100,
                    center: ['20%', '50%']
                }
            },
            legend: {
                align: 'right',
                x: 0,
                verticalAlign: 'middle',
                y: 0,
                floating: true,
                shadow: false,
                layout: 'vertical',
                itemStyle: { cursor: 'pointer', color: '#3E576F', fontSize: '14px' },
                symbolRadius: 3
            },
            credits: {  // 版权信息，不显示
                enabled: false
            },
            series: [{
                type: 'pie',
                name: '浏览器访问量占比',
                data: [
                    ['计算节点', 45.0],
                    ['控制节点', 26.8],
                    ['存储节点', 12.8]
                ]
            }]
        }
        this.chart = Highcharts.chart(this.pie, this.options);
    }
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
                            <div ref={(node) => { this.pie = node }} ></div>
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