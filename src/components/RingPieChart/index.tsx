import React from 'react';
import * as Highcharts from 'highcharts';
import _ from 'lodash';

export interface RingPieChartProps {
    data
    total
}

/**
 * 环形图
 * 
 * @export
 * @class RingPieChart
 * @extends {React.PureComponent<RingPieChartProps, any>}
 */

export default class RingPieChart extends React.PureComponent<RingPieChartProps, any> {
    container: any
    chart: any
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        let { data, total } = this.props
        let titleTxt = total.join(':')
        var options = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                spacing: 0
            },
            title: {
                text: '总:' + total[1],
                // floating: true,
                align: 'center',
                verticalAlign: 'middle',
                style: {
                    fontSize: '10px',
                    color: '#ffe780'
                },
            },
            tooltip: {
                enabled: false,
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    colors: ['#879dbb', '#7cd8ba'],
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
                innerSize: '70%',
                name: '服务器分配状态占比',
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
