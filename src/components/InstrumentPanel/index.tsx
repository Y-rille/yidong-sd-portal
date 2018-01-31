import React from 'react';
import * as Highcharts from 'highcharts';
const merge = require('lodash/merge')
const compact = require('lodash/compact')

// 更多图表类型扩展模块
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

import Solidgauge from 'highcharts/modules/solid-gauge.js';
Solidgauge(Highcharts)

export interface InstrumentPanelProps {
    data,
    gradient?
}

/**
 * 仪表盘
 * 
 * @export
 * @class InstrumentPanel
 * @extends {React.PureComponent<InstrumentPanelProps, any>}
 */

export default class InstrumentPanel extends React.PureComponent<InstrumentPanelProps, any> {
    container: any
    chart: any
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        let { data } = this.props
        let unit = data.unit || ''
        var options = {
            chart: {
                type: 'solidgauge'
            },
            title: {
                text: null,
            },
            legend: {
                enabled: false
            },
            pane: { // 仪表盘
                center: ['50%', '100%'],
                size: '150%',

                startAngle: -90, //  起始角度
                endAngle: 90,
                background: {
                    backgroundColor: '#EEE',
                    innerRadius: '80%', // 刻度內轴位置，厚度
                    outerRadius: '100%', // 刻度外轴
                    shape: 'arc',
                    borderWidth: 0
                }
            },
            tooltip: {  // 数据提示框：不显示
                enabled: false,
                // valueSuffix: ' km/h'
            },

            credits: {  // 版权信息，不显示
                enabled: false
            },
            yAxis: {
                stops: compact([ // 进度条颜色，从0-1
                    this.props.data.gradient && [0.44, 'red'],
                    [1, '#00b388']
                ]),
                lineWidth: 0,
                minorTickInterval: null,
                tickPixelInterval: 400,
                tickWidth: 0,
                title: {
                    text: '50' + unit + '<br/><span style="font-size:10px;color:silver">|</span>',
                    y: -62 // 标题高度
                },
                labels: {
                    distance: -8, // 刻度距离表盘圆心的距离
                    y: 14, // 刻度范围位置
                    formatter: function () {
                        return this.value + unit;
                    },
                },

            },
            plotOptions: { // 中间显示框
                solidgauge: {
                    dataLabels: {
                        y: 16,
                        borderWidth: 0,
                        useHTML: true
                    },
                    // rounded: true // 进度条变圆角
                }
            },
            exporting: { enabled: false },
            series: [{
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:34px;color:rgba(0, 0, 0, 0.8);">{y}%</span></div>',
                    enabled: true
                }
            }]

        }
        let chose_options = {
            yAxis: {
                min: data.min,
                max: data.max,
                // title: {
                //     text: data.title
                // },
                // plotBands: [{   // 刻度条颜色
                //     from: 0,
                //     to: 120,
                //     color: '#55BF3B' // green
                // }, {
                //     from: 120,
                //     to: 160,
                //     color: '#DDDF0D' // yellow
                // }, {
                //     from: 160,
                //     to: 200,
                //     color: '#DF5353' // red
                // }]
            },

            series: [{
                data: [{
                    radius: 100,
                    innerRadius: 80,
                    y: data.current
                }],

            }]
        }
        options = merge({}, options, chose_options)

        this.chart = Highcharts.chart(this.container, options, function (_chart) {
            // if (!_chart.renderer.forExport) {
            // setInterval(function () {
            //     var point = _chart.series[0].points[0],
            //         newVal,
            //         inc = Math.round((Math.random() - 0.5) * 20);
            //     newVal = point.y + inc;
            //     if (newVal < 0 || newVal > 200) {
            //         newVal = point.y - inc;
            //     }
            //     point.update(newVal);
            // }, 3000);
            // }
        });
    }
    chartExport() {
        this.chart.exportChart(
            {
                type: 'image/png',
                filename: this.props.data.title,
                sourceWidth: 280,
            },
            {
                pane: { // 仪表盘
                    center: ['50%', '95%'],
                    size: '150%'
                },
                plotOptions: { // 中间显示框
                    solidgauge: {
                        dataLabels: {
                            y: 65,
                            borderWidth: 0,
                        }
                    }
                },
            }
        );
    }

    render() {
        return (
            <div>
                <div ref={(node) => { this.container = node }} style={{ width: '100%', height: '140px' }}></div>
            </div>
        );
    }

}
