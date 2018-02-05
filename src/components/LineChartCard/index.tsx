import React from 'react';
import * as Highcharts from 'highcharts';
import { Row, Col, Icon } from 'antd';
import styles from './index.less'
import LineChart from '../LineChart'
export interface LineChartProps {
    data,
    deleteCard?
    hideFacts?

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
            show: true
        };
    }
    componentDidMount() {

    }
    printLineChart() {
        this.lineChart1.chartExport()
    }
    hideOne() {
        this.setState({
            show: false
        })
        if (this.props.deleteCard) {
            this.props.deleteCard(this.props.data.kpiId)
        }
    }
    render() {
        if (!this.state.show) {
            return <div />
        }
        let { data } = this.props
        return (
            <Col className="gutter-row" span={12} >
                <div className="gutter-box">
                    <div className={styles.cardHead}>
                        <div>{data.kpiName}</div>
                        <div className={styles.cardIcon}>
                            <Icon type="download" onClick={this.printLineChart.bind(this)} />|
                            <Icon type="close" onClick={this.hideOne.bind(this)} />
                        </div>
                    </div>
                    <LineChart ref={(node) => { this.lineChart1 = node }} data={data} />
                </div>
            </Col>
        );
    }

}
