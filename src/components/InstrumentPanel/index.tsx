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
        let unit = data.kpiUnit || ''
        let min = parseFloat(data.minValue)
        let max = parseFloat(data.maxValue)
        let current = parseFloat(data.val[0])
        let middle = (max - min) / 2
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
                    outerRadius: '95%', // 刻度外轴
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
                    // this.props.data.gradient && [0.44, 'red'],
                    [1, '#7cd8ba']
                ]),
                lineWidth: 0,
                minorTickInterval: null,
                tickWidth: 0,
                title: {
                    text: middle + unit + '<br/><span style="font-size:10px;color:silver">|</span>',
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
                        y: 10,
                        borderWidth: 0,
                        useHTML: true
                    },
                    // rounded: true // 进度条变圆角
                }
            },
            exporting: { enabled: false },
            series: [{
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:24px;color:rgba(0, 0, 0, 0.8);">{y}' + unit + '</span></div>',
                    enabled: true
                }
            }]
        }

        let plotBandsArr: Array<object> = [] // 刻度线
        // let stopsArr: Array<object> = [] // 进度条

        let plotBandsColor = ['#ffe780', '#f3820f', '#ef3233'] // '#7cd8ba'
        let plotBandsOpt = [
            // { // 暂时去掉了
            //     plot: 'normalThresholdValue',
            //     color: 'blue',
            // },
            {
                plot: 'minorThresholdValue',
                color: '#ffe780',
            },
            {
                plot: 'majorThresholdValue',
                color: '#f3820f'
            },
            {
                plot: 'criticalThresholdValue',
                color: '#ef3233'
            }]

        if (data.threshold) {
            for (let i = 0; i < plotBandsOpt.length; i++) {
                let plot = data.threshold[plotBandsOpt[i].plot]
                if (plot.length > 0) {
                    plot = parseFloat(plot)
                    let plotBandsobj1 = {
                        from: plotBandsArr.length === 0 ? min : plotBandsArr[plotBandsArr.length - 1]['to'],
                        to: plot,
                        color: plotBandsArr.length === 0 ? '#18b4ef' : plotBandsOpt[i - 1]['color'],
                        innerRadius: '95%',
                        outerRadius: '98%'
                    }
                    plotBandsArr.push(plotBandsobj1)

                    // let stopsobj1 = stopsArr.length === 0 ? [(plot / max), '#7cd8ba'] : [(plot / max), plotBandsOpt[i - 1]['color']]
                    // stopsArr.push(stopsobj1)

                    if (i === plotBandsOpt.length - 1) {
                        let plotBandsobj2 = {
                            from: plotBandsArr.length === 0 ? min : plotBandsArr[plotBandsArr.length - 1]['to'],
                            to: max,
                            color: plotBandsArr.length === 0 ? '#18b4ef' : plotBandsOpt[i]['color'],
                            innerRadius: '95%',
                            outerRadius: '98%'
                        }
                        plotBandsArr.push(plotBandsobj2)

                        // let stopsobj2 = [1, plotBandsOpt[i]['color']]
                        // stopsArr.push(stopsobj2)
                    }
                } else {
                    plotBandsOpt = plotBandsOpt.splice(i, 1)
                }
            }

        }
        // else {
        //     stopsArr = [[1, '#7cd8ba']]
        // }

        let stopsColor = '#18b4ef' // 进度条颜色
        if (data.threshold) {
            for (let i = 0; i < plotBandsOpt.length; i++) {
                if (current >= parseFloat(data.threshold[plotBandsOpt[i].plot])) {
                    stopsColor = plotBandsOpt[i].color
                }
            }
        }
        let chose_options = {
            yAxis: {
                min: min,
                max: max,
                tickPositions: [min, max],
                // title: {
                //     text: data.title
                // },
                stops: [[1, stopsColor]],
                tickPosition: 'outside',
                plotBands: plotBandsArr,

            },

            series: [{
                data: [{
                    radius: 95,
                    innerRadius: 80,
                    y: current
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
                filename: this.props.data.kpiName,
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
                            y: 45,
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
                <div ref={(node) => { this.container = node }} style={{ width: '100%', height: '160px' }}></div>
            </div>
        );
    }

}
