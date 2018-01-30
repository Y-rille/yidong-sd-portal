import React from 'react';
import * as Highcharts from 'highcharts';
import * as Exporting from 'highcharts/modules/exporting';
Exporting(Highcharts);

export interface LineChartProps {
    data
}

/**
 * 仪表盘
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
                text: '',
                align: 'left',
                style: {
                    'fontSize': '14px',
                }
            },
            chart: {
                height: 265,
                type: 'line'
            },
            yAxis: {
                title: {
                    text: '',
                },
                plotLines: [{
                    color: 'yellow',
                    dashStyle: 'solid',
                    value: 82500,
                    width: 2,
                    label: {
                        text: '警戒线',
                    }
                }]
            },

            legend: {
                // layout: 'vertical',
                align: 'right',
                // verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 10
                }
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

    render() {
        return (
            <div ref={(node) => { this.line = node }} ></div>
        );
    }

}
