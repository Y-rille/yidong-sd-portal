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
        let seriesData = this.props.data.datas
        seriesData.map(function (item) {
            // 修改折线颜色
            item.color = '#5CCBAE'
        })
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
                gridLineColor: '#fff',
                minorTickLength: '8px',
                plotLines: [{
                    color: '#F3CB74',
                    dashStyle: 'solid',
                    value: this.props.data.tagLine, // 警戒线
                    width: 1,
                    label: {
                        text: null
                    }
                }],
                tickAmount: 5,
                tickInterval: 10
            },
            legend: {
                align: 'right',
            },
            series: seriesData,
            responsive: {
                rules: [{
                    condition: {
                        maxHeight: 0
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
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
        // this.chart.yAxis[0].addPlotLine({
        //     value: this.props.data.tagLine,
        //     color: '#F3CB74',
        //     dashStyle: 'solid',
        //     width: 1,
        //     label: {
        //         text: null
        //     }
        // });
    }
    chartExport() {
        this.chart.exportChart(
            {
                type: 'image/png',
                filename: this.props.data.title,
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
