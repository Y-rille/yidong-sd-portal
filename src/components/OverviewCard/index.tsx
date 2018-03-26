import * as React from 'react';
import { Card, Button } from 'antd';
import * as Highcharts from 'highcharts';
import classNames from 'classnames';
import styles from './index.less';
import _ from 'lodash';

export interface OverviewCardProps {
    goEdit?
    data?
    editable?
}

export default class OverviewCard extends React.PureComponent<OverviewCardProps, any> {
    pie: any
    options: any
    chart: any
    goEdit() {
        let id = this.props.data.metadata.ID
        if (this.props.goEdit) {
            this.props.goEdit(id)
        }
    }
    static defaultProps = {}

    componentDidMount() {
        let { data } = this.props
        let reports = data.reports
        let arr = []
        let arrCont1 = []
        let arrCont2 = []
        let arrCont3 = []
        reports.map((item) => {
            if (item.type === 'pie') {

                let arrHeaders = item.data.headers
                let arrValues = _.head(item.data.values)
                let value_cal = parseInt(arrValues[_.indexOf(arrHeaders, '计算节点')], 10)
                let value_contrl = parseInt(arrValues[_.indexOf(arrHeaders, '控制节点')], 10)
                let value_stor = parseInt(arrValues[_.indexOf(arrHeaders, '存储节点')], 10)
                let total = value_cal + value_contrl + value_stor
                arrCont1.push('计算节点')
                arrCont1.push(_.round((value_cal / total), 2) * 100)
                arrCont2.push('控制节点')
                arrCont2.push(_.round((value_contrl / total), 2) * 100)
                arrCont3.push('存储节点')
                arrCont3.push(_.round((value_stor / total), 2) * 100)
                arr.push(arrCont1)
                arr.push(arrCont2)
                arr.push(arrCont3)
                this.options = {
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
                            colors: ['#7cd8ba', '#879dbb', '#ffe780'],
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
                    series: [{
                        type: 'pie',
                        name: '浏览器访问量占比',
                        data: arr
                    }]
                }
                this.chart = Highcharts.chart(this.pie, this.options);
            }
        })

    }

    renderCardText(item) {
        const clsCard = classNames(styles.card, styles.card_w4);
        let arrHeaders = item.data.headers
        let arrValues = _.head(item.data.values)
        return (
            <Card className={clsCard} bordered={false}>
                <div className={styles.card_titile}>
                    <span>{item.description}</span>
                </div>
                <div className={styles.card_cont_text}>
                    {arrHeaders.map((header, key) => {
                        return (
                            <p className={styles.card_header} key={key}>
                                {header}
                                <span className={styles.card_value}>：{arrValues[key]}</span>
                            </p>
                        )
                    })}
                </div>
            </Card>
        )
    }
    renderCardDot1(item) {
        const clsCard = classNames(styles.card, styles.card_w4);
        const clsIcon = classNames(styles.icon, styles.icon_round);
        let arrHeaders = item.data.headers
        let arrValues = _.head(item.data.values)
        let arrColor = ['#6fbdf3', '#fba277', '#000']
        return (
            <Card className={clsCard} bordered={false}>
                <div className={styles.card_titile}>
                    <span>{item.description}</span>
                </div>
                {arrHeaders.map((header, key) => {
                    return (
                        <p className={styles.card_cont_dot} key={key}>
                            <span className={clsIcon} style={{ backgroundColor: arrColor[key < 3 ? key : 2] }} />
                            {header}：
                            <span className={styles.card_cont_center} style={{ color: arrColor[key < 3 ? key : 2] }}>{arrValues[key]}</span>
                            <span style={{ color: arrColor[key < 3 ? key : 2] }}>&nbsp;个</span>
                        </p>
                    )
                })}
            </Card>
        )
    }
    renderCardDot2(item) {
        const clsCard = classNames(styles.card, styles.card_w4);
        const clsIcon = classNames(styles.icon, styles.icon_round);
        let arrHeaders = item.data.headers
        let arrValues = _.head(item.data.values)
        let arrColor = ['#6fbdf3', '#b2becd', '#7cd8ba']
        return (
            <Card className={clsCard} bordered={false}>
                <div className={styles.card_titile}>
                    <span>{item.description}</span>
                </div>
                {arrHeaders.map((header, key) => {
                    return (
                        <p className={styles.card_cont_dot} key={key}>
                            <span className={clsIcon} style={{ backgroundColor: arrColor[key] }} />
                            {header}：
                            <span className={styles.card_cont_center} style={{ color: arrColor[key] }}>{arrValues[key]}</span>
                            <span style={{ color: arrColor[key] }}>&nbsp;个</span>
                        </p>
                    )
                })}
            </Card>
        )
    }

    renderCardPie(item) {
        const clsCard = classNames(styles.card, styles.card_w2);
        const clsIcon = classNames(styles.icon, styles.icon_square);
        let arrHeaders = item.data.headers
        let arrValues = _.head(item.data.values)
        let arrColor = ['', '', '#7cd8ba', '#879dbb', '#ffe780']
        return (
            <Card className={clsCard} bordered={false}>
                <div className={styles.card_titile}>
                    <span>{item.description}</span>
                </div>
                <div className={styles.card_pie_cont}>
                    <div className={styles.card_pie_cont_left}>
                        {arrHeaders.map((header, key) => {
                            if (key < 2) {
                                return (
                                    <p className={styles.card_header} key={key}>
                                        {header}
                                        <span className={styles.card_value}>：{arrValues[key]}</span>
                                    </p>
                                )
                            } else {
                                return ''
                            }
                        })}
                    </div>
                    <div className={styles.card_pie_cont_center} ref={(node) => { this.pie = node }} ></div>
                    <div className={styles.card_pie_cont_right}>
                        {arrHeaders.map((header, key) => {
                            if (key > 1) {
                                return (
                                    <p className={styles.card_cont_dot} key={key}>
                                        <span className={clsIcon} style={{ backgroundColor: arrColor[key] }} />
                                        {header}：
                                        <span className={styles.card_cont_center} style={{ color: arrColor[key] }}>{arrValues[key]}</span>
                                        <span style={{ color: arrColor[key] }}>&nbsp;个</span>
                                    </p>
                                )
                            } else {
                                return ''
                            }
                        })}
                    </div>
                </div>
            </Card>
        )

    }

    renderCard() {
        let { data } = this.props
        let reports = data.reports
        return (
            <div className={styles.row_card}>
                {reports.map((item, key) => {
                    switch (item.type) {
                        case 'text':
                            return this.renderCardText(item)
                        // break;
                        case 'dot1':
                            return this.renderCardDot1(item)
                        // break;
                        case 'dot2':
                            return this.renderCardDot2(item)
                        // break;
                        default:
                            return this.renderCardPie(item)
                    }
                })}
            </div>
        )
    }

    render() {
        let { data } = this.props
        let { editable } = this.props
        return (
            <div className={styles.overviewCard}>
                <div className={styles.title}>
                    <span className={styles.title_header}>{data.metadata.NAME}</span><span>ID: {data.metadata.ID}</span>&emsp;<span>位置:{data.metadata.localtion}</span>&emsp;
                    {editable ? (<a href="javascript:;" onClick={this.goEdit.bind(this)}>编辑</a>) : ''}
                </div>
                {this.renderCard()}
            </div>
        );
    }
}