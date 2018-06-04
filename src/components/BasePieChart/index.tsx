import React from 'react';
import * as Highcharts from 'highcharts';

export interface BasePieChartProps {
    data
}

/**
 * 基础饼图
 * 
 * @export
 * @class BasePieChart
 * @extends {React.PureComponent<BasePieChartProps, any>}
 */

export default class BasePieChart extends React.PureComponent<BasePieChartProps, any> {
    container: any
    chart: any
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        let { data } = this.props
        var options = {
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
                    colors: ['#ffe780', '#879dbb', '#7cd8ba'],
                    dataLabels: {
                        enabled: true,
                        distance: -20,
                        style: {
                            fontSize: '9px',
                            color: 'white'
                        },
                        format: '{point.percentage:.1f}%'
                    },
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            },
            credits: {  // 版权信息，不显示
                enabled: false
            },
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            series: [{
                type: 'pie',
                name: '浏览器访问量占比',
                data: data
            }]
        }
        this.chart = Highcharts.chart(this.container, options);
    }

    render() {
        return (
            <div>
                <div ref={(node) => { this.container = node }} style={{ width: '100%', height: '120px' }}></div>
            </div>
        );
    }
}
