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
    newObj: any
    goEdit() {
        let id = this.props.data.metadata.ID
        if (this.props.goEdit) {
            this.props.goEdit(id)
        }
    }

    static defaultProps = {}

    toNewData(arr1, arr2) {
        let newArr: any = []
        if (arr1 && arr2) {
            let newObj = _.zipObject(arr1, arr2)
            for (const key in newObj) {
                if (newObj.hasOwnProperty(key)) {
                    newArr.push([key, newObj[key]])
                }
            }
        }
        return newArr
    }

    toNewData2(arr1, arr2, arrText, percent = false) {
        let newArr: any = []
        if (arr1 && arr2) {
            let newObj = _.zipObject(arr1, arr2)
            if (percent) {
                let total = 0
                let eachNum: any
                for (let i = 0; i < arrText.length; i++) {
                    newArr.push([arrText[i], newObj[arrText[i]]])
                    eachNum = newObj[arrText[i]]
                    total = total + parseInt(eachNum, 10)
                }
                for (let i = 0; i < newArr.length; i++) {
                    newArr[i][1] = _.round((newArr[i][1] / total), 3) * 100
                }
            } else {
                for (let i = 0; i < arrText.length; i++) {
                    newArr.push([arrText[i], newObj[arrText[i]]])
                }
            }
        }
        return newArr
    }

    componentDidMount() {
        let { data } = this.props
        let reports = data.reports
        reports.map((item) => {
            if (item.type === 'pie') {
                let PieTextArr: any = ['计算节点', '控制节点', '存储节点']
                let pieData = this.toNewData2(item.data.headers, _.head(item.data.values), PieTextArr, true)
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
                    navigation: {
                        buttonOptions: {
                            enabled: false
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '浏览器访问量占比',
                        data: pieData
                    }]
                }
                this.chart = Highcharts.chart(this.pie, this.options);
            }
        })

    }

    renderCardText(item) {
        const clsCard = classNames(styles.card, styles.card_w4);
        let newArr = this.toNewData(item.data.headers, _.head(item.data.values))
        return (
            <Card className={clsCard} bordered={false}>
                <div className={styles.card_titile}>
                    <span>{item.description}</span>
                </div>
                <div className={styles.card_cont_text}>
                    {newArr ? _.map(newArr, (header, key) => {
                        return (
                            <p className={styles.card_header} key={key}>
                                {header[0]}
                                <span className={styles.card_value}>：{header[1]}</span>
                            </p>
                        )
                    }) : ''}
                </div>
            </Card>
        )
    }

    renderCardDot1(item) {
        const clsCard = classNames(styles.card, styles.card_w4);
        const clsIcon = classNames(styles.icon, styles.icon_round);
        let arrColor = ['#6fbdf3', '#fba277', '#000']
        let newArr = this.toNewData(item.data.headers, _.head(item.data.values))
        return (
            <Card className={clsCard} bordered={false}>
                <div className={styles.card_titile}>
                    <span>{item.description}</span>
                </div>
                {newArr ? _.map(newArr, (header, key) => {
                    return (
                        <p className={styles.card_cont_dot} key={key}>
                            <span className={clsIcon} style={{ backgroundColor: arrColor[key < 3 ? key : 2] }} />
                            {header[0]}：
                            <span className={styles.card_cont_center} style={{ color: arrColor[key < 3 ? key : 2] }}>{header[1]}</span>
                            <span style={{ color: arrColor[key < 3 ? key : 2] }}>&nbsp;个</span>
                        </p>
                    )
                }) : ''}
            </Card>
        )
    }

    renderCardDot2(item) {
        const clsCard = classNames(styles.card, styles.card_w4);
        const clsIcon = classNames(styles.icon, styles.icon_round);
        let arrColor = ['#6fbdf3', '#b2becd', '#7cd8ba']
        let newArr = this.toNewData(item.data.headers, _.head(item.data.values))
        return (
            <Card className={clsCard} bordered={false}>
                <div className={styles.card_titile}>
                    <span>{item.description}</span>
                </div>
                {newArr ? _.map(newArr, (header, index) => {
                    return (
                        <p className={styles.card_cont_dot} key={index}>
                            <span className={clsIcon} style={{ backgroundColor: arrColor[index] }} />
                            {header[0]}：
                            <span className={styles.card_cont_center} style={{ color: arrColor[index] }}>{header[1]}</span>
                            <span style={{ color: arrColor[index] }}>&nbsp;个</span>
                        </p>
                    )
                }) : ''}
            </Card>
        )
    }

    renderCardPie(item) {
        const clsCard = classNames(styles.card, styles.card_w2);
        const clsIcon = classNames(styles.icon, styles.icon_square);
        let leftTextArr: any = ['总（台）', '未分配裸机（台）']
        let rightTextArr: any = ['计算节点', '控制节点', '存储节点']
        let arrColor = ['#7cd8ba', '#879dbb', '#ffe780']
        let newLeftArr = this.toNewData2(item.data.headers, _.head(item.data.values), leftTextArr)
        let newRightArr = this.toNewData2(item.data.headers, _.head(item.data.values), rightTextArr)       
        return (
            <Card className={clsCard} bordered={false}>
                <div className={styles.card_titile}>
                    <span>{item.description}</span>
                </div>
                <div className={styles.card_pie_cont}>
                    <div className={styles.card_pie_cont_left}>
                        {newLeftArr ? _.map(newLeftArr, (header, key) => {
                            return (
                                <p className={styles.card_header} key={key}>
                                    {header[0]}
                                    <span className={styles.card_value}>：{header[1]}</span>
                                </p>
                            )
                        }) : ''}
                    </div>
                    <div className={styles.card_pie_cont_center} ref={(node) => { this.pie = node }} ></div>
                    <div className={styles.card_pie_cont_right}>
                        {newRightArr ? _.map(newRightArr, (header, key) => {
                            return (
                                <p className={styles.card_cont_dot} key={key}>
                                    <span className={clsIcon} style={{ backgroundColor: arrColor[key] }} />
                                    {header[0]}：
                                    <span className={styles.card_cont_center} style={{ color: arrColor[key] }}>{header[1]}</span>
                                    <span style={{ color: arrColor[key] }}>&nbsp;个</span>
                                </p>
                            )
                        }) : ''}
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
        let metadata = data.metadata
        let { editable } = this.props
        return (
            <div className={styles.overviewCard}>
                <div className={styles.title}>
                    <span className={styles.title_header}>{metadata.NAME}</span><span>ID: {metadata.ID}</span>&emsp;<span>位置:{metadata.localtion}</span>&emsp;
                    {editable ? (<a href="javascript:;" onClick={this.goEdit.bind(this)}>编辑</a>) : ''}
                </div>
                {this.renderCard()}
            </div>
        );
    }
}