import React from 'react';
import * as Highcharts from 'highcharts';
import { Row, Col, Icon } from 'antd';
import styles from './index.less'
import LineChart from '../LineChart'
export interface LineChartProps {
    data
    deleteCard?
    hideFacts?
    nodeName?
}

/**
 * 折线图
 * @export
 * @class LineChart
 * @extends {React.PureComponent<LineChartProps, any>}
 */

export default class LineChartCard extends React.PureComponent<LineChartProps, any> {
    lineChart: any
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
        this.lineChart.chartExport()
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
        // console.log(this.props.nodeInfo.nodeName, '00000000000')

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
                    <LineChart ref={(node) => { this.lineChart = node }} nodeName={this.props.nodeName} data={data} />
                </div>
            </Col>
        );
    }

}
