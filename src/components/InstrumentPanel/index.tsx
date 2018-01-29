import React from 'react';
import * as Highcharts from 'highcharts';
const merge = require('lodash/merge')

// 更多图表类型扩展模块
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

import Solidgauge from 'highcharts/modules/solid-gauge.js';
Solidgauge(Highcharts)

export interface InstrumentPanelProps {

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
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        var options = {
            chart: {
                type: 'solidgauge'
            },
            title: null,
            pane: { // 仪表盘
                center: ['50%', '85%'],
                size: '100%',
                startAngle: -90, //  起始角度
                endAngle: 90,
                background: {
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                    innerRadius: '60%', // 刻度內轴位置，厚度
                    outerRadius: '100%', // 刻度外轴
                    shape: 'arc'
                }
            },
            tooltip: {  // 数据提示框：不显示
                enabled: false
            },
            credits: {  // 版权信息，不显示
                enabled: false
            },
            yAxis: {
                stops: [ // 进度条颜色，从0-1
                    [0.3, 'yellow'], // green
                    [0.5, '#DDDF0D'], // yellow
                    [0.8, '#DF5353'] // red
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickPixelInterval: 400,
                tickWidth: 0,
                title: {
                    text: 'title',
                    y: -75 // 标题高度
                },
                labels: {
                    y: 14 // 刻度范围位置
                }
            },          
            plotOptions: { // 中间显示框
                solidgauge: {
                    dataLabels: {
                        y: 15,
                        borderWidth: 0,
                        useHTML: true
                    }                 
                }           
            }
        }
        let chose_options = {
            yAxis: {
                min: 0,
                max: 200,
                title: {
                    text: '标题'
                },
                plotBands: [{   // 刻度条颜色
                    from: 0,
                    to: 120,
                    color: '#55BF3B' // green
                }, {
                    from: 120,
                    to: 160,
                    color: '#DDDF0D' // yellow
                }, {
                    from: 160,
                    to: 200,
                    color: '#DF5353' // red
                }]
            },
            
            series: [{             
                data: [80],
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                    '<span style="font-size:12px;color:silver">km/h</span></div>',
                    enabled: false
                },
                tooltip: {
                    valueSuffix: ' km/h'
                }
            }]
        }
        options = merge({}, options, chose_options)
        
        var chart = Highcharts.chart(this.container, options, function (_chart) {
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

    render() {
        return (
            <div>
                仪表盘
                <div ref={(node) => { this.container = node }} style={{ width: '400', height: '300px' }}></div>
            </div>
        );
    }

}
