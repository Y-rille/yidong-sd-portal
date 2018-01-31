import React from 'react';
import * as Highcharts from 'highcharts';
import { Row, Col, Icon } from 'antd';
import styles from './index.less'
import LineChart from '../LineChart'
export interface LineChartProps {
    data
}

/**
 * 折线图
 * @export
 * @class LineChart
 * @extends {React.PureComponent<LineChartProps, any>}
 */

export default class LineChartCard extends React.PureComponent<LineChartProps, any> {
    lineChart1: any
    chart: any
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {

    }
    printLineChart() {
        this.lineChart1.chartExport()
    }
    hideOne() {
        this.setState({
            showOne: false
        })
    }
    chartExport() {
        this.chart.exportChart(
            {
                type: 'image/png',
                // filename: ,
                sourceWidth: 280,
                sourceHeight: 200
            }

        );
    }
    render() {
        return (
            <Col className="gutter-rowgutter-row" span={12}>
                <div className="gutter-box">
                    <div className={styles.cardHead}>
                        <div>内存使用率</div>
                        <div className={styles.cardIcon}>
                            <Icon type="download" onClick={this.printLineChart.bind(this)} />|
                        <Icon type="close" onClick={this.hideOne.bind(this)} />
                        </div>
                    </div>
                    <LineChart ref={(node) => { this.lineChart1 = node }} data={this.props.data} />
                </div>
            </Col>
        );
    }

}
