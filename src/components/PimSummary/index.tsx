import * as React from 'react';

import { Card, Button } from 'antd';

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
                plotShadow: false,
                spacing: 0
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
                    colors: ['#879dbb', '#ffe780', '#7cd8ba'],
                    dataLabels: {
                        enabled: false
                    },
                }
            },
            credits: {  // 版权信息，不显示
                enabled: false
            },
            series: [{
                type: 'pie',
                name: '浏览器访问量占比',
                data: [
                    ['计算节点', 50 / (50 + 15 + 35)],
                    ['控制节点', 15 / (50 + 15 + 35)],
                    ['存储节点', 35 / (50 + 15 + 35)]
                ]
            }]
        }
        this.chart = Highcharts.chart(this.pie, this.options);
    }
    renderPim() {
        return (
            <div className={styles.pim}>
                <div className={styles._card_bj}>
                    <Card className={styles._card} bordered={false}>
                        <div className={styles._card_titile}>
                            <span>资源分配情况</span>
                            <Button className={styles._card_bn} size="small">查看</Button>
                        </div>
                        <p className={styles._card_qus}>VCPU(未使用/总)<span className={styles._card_ans}>：21G/26G</span></p>
                        <p className={styles._card_qus}>内存(未使用/总)<span className={styles._card_ans}>：21G/26G</span></p>
                        <p className={styles._card_qus}>硬盘(未使用/总)<span className={styles._card_ans}>：21G/26G</span></p>
                    </Card>
                    <Card className={styles._card2} bordered={false}>
                        <div className={styles._card_titile}>
                            <span>服务器</span>
                        </div>
                        <div className={styles.pie}>
                            <div className={styles.pie_left}>
                                <p className={styles._card_qus}> </p>
                                <p className={styles._card_qus}>总（台）<span className={styles._card_ans}>：21</span></p>
                                <p className={styles._card_qus}>未分配裸机（台）<span className={styles._card_ans}>：26</span></p>
                            </div>
                            <div className={styles.pie_center} ref={(node) => { this.pie = node }} ></div>
                            <div className={styles.pie_right}>
                                <p className={styles._card_left_grey}>
                                    <span className={styles.icon_grey}></span>控制节点：
                                <span className={styles._card_center_grey}>50</span>
                                    <span className={styles._card_right_grey}>个</span>
                                </p>
                                <p className={styles._card_left_yellow}>
                                    <span className={styles.icon_yellow}></span>存储节点：
                                <span className={styles._card_center_yellow}>15</span>
                                    <span className={styles._card_right_yellow}>个</span>
                                </p>
                                <p className={styles._card_left_green}>
                                    <span className={styles.icon_green}></span>计算节点：
                                <span className={styles._card_center_green}>35</span>
                                    <span className={styles._card_right_green}>个</span>
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className={styles._card} bordered={false}>
                        <div className={styles._card_titile}>
                            <span>虚拟机健康状态</span>
                            <Button className={styles._card_bn} size="small">查看</Button>
                        </div>
                        <p className={styles._card_left_blue}>
                            <span className={styles.icon_blue}></span>总数：
                                <span className={styles._card_center_blue}>280</span>
                            <span className={styles._card_right_blue}>个</span>
                        </p>
                        <p className={styles._card_left_grey}>
                            <span className={styles.icon_grey}></span>关机：
                                <span className={styles._card_center_grey}>10</span>
                            <span className={styles._card_right_grey}>个</span>
                        </p>
                        <p className={styles._card_left_green}>
                            <span className={styles.icon_green}></span>运行：
                                <span className={styles._card_center_green}>280</span>
                            <span className={styles._card_right_green}>个</span>
                        </p>
                    </Card>
                </div>
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