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
    x: any
    y: any
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
        let plotLinesColor = ['#7cd8ba', '#ffe780', '#ffa500', '#fa9e9e']
        if (data.threshold) {
            for (let i = 0; i < plotLinesOpt.length; i++) {
                let plot = data.threshold[plotLinesOpt[i]]
                if (plot.length > 0) {
                    let plotLinesobj = {
                        color: plotLinesColor[i],
                        dashStyle: 'soild',
                        value: parseFloat(plot), // 警戒线
                        width: 2,
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
                enabled: false
            },
            tooltip: {
                formatter: function () {
                    return 'x:' + this.x + ' <br/> ' + 'y:' + this.y + data.kpiUnit
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
