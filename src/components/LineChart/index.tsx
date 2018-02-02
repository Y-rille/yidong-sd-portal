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
        let data = this.props.data
        let seriesData = [{
            color: '#5CCBAE',
            data: data.val
        }]

        let plotLinesArr = []
        let plotLinesOpt = ['normalThresholdValue', 'minorThresholdValue', 'majorThresholdValue', 'criticalThresholdValue']
        let plotLinesColor = ['#7cd8ba', '#ffe780', '#f3820f', '#ef3233']
        if (data.threshold) {
            for (let i = 0; i < plotLinesOpt.length; i++) {
                let plot = data.threshold[plotLinesOpt[i]]
                if (plot.length > 0) {
                    let plotLinesobj = {
                        color: plotLinesColor[i],
                        dashStyle: 'solid',
                        value: parseFloat(plot), // 警戒线
                        width: 1,
                        label: {
                            text: null
                        }
                    }
                    plotLinesArr.push(plotLinesobj)
                }

            }
        }

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
                categories: data.x_value
            },
            yAxis: {
                title: {
                    text: data.kpiName + '(' + data.kpiUnit + ')'
                },
                gridLineColor: '#fff',
                minorTickLength: '8px',
                plotLines: plotLinesArr,
                tickAmount: 5,
            },
            legend: {
                // align: 'right',
                enabled: false
            },
            tooltip: {  // 数据提示框
                formatter: function () {
                    return this.x + ' : ' + this.y + data.kpiUnit
                }
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
                filename: this.props.data.kpiName,
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
