import React from 'react';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);

export interface LineChartProps {
    data
}

/**
 * 折线图
 * 
 * @export
 * @class LineChart
 * @extends {React.PureComponent<LineChartProps, any>}
 */

export default class LineChart extends React.PureComponent<LineChartProps, any> {
    line: any
    options: any
    chart: any
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.options = {
            title: {
                text: null,
            },
            chart: {
                height: 265,
                type: 'line'
            },
            xAxis: {
                tickPosition: 'inside',
                tickmarkPlacement: null,
                type: 'category',
                categories: ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30']
            },
            yAxis: {
                title: {
                    text: null
                },
                gridLineColor: '#fff', // 隐藏栅格线
                minorTickLength: '8px',
                plotLines: [{
                    color: '#F3CB74',
                    dashStyle: 'solid',
                    value: 70,
                    width: 1,
                    label: {
                        text: null
                    }
                }],
                tickAmount: 5// 刻度总数
            },
            legend: {
                // layout: 'vertical',
                align: 'right',
                // verticalAlign: 'middle'
            },
            series: this.props.data,
            responsive: {
                rules: [{
                    condition: {
                        maxHeight: 0
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            // align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false,
            }
        }
        this.chart = Highcharts.chart(this.line, this.options);
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
            <div ref={(node) => { this.line = node }} ></div>
        );
    }

}
