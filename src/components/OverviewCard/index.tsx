import * as React from 'react';
import { Card, Tooltip, Button } from 'antd';
import * as Highcharts from 'highcharts';
import classNames from 'classnames';
import styles from './index.less';
import _ from 'lodash';

export interface OverviewCardProps {
    goEdit?
    data?
    type?
    goDelete?
    goBackup?
    goManage?
    doFind?
    goTopo?
}

export default class OverviewCard extends React.PureComponent<OverviewCardProps, any> {
    pie: any
    options: any
    chart: any
    newObj: any
    static defaultProps = {
        textData: {
            data: {
                headers: ['VCPU', '内存', '硬盘'],
                values: [['300/700/1000/70%', '400/600/1000/60%', '200/800/1000/50%']]
            },
            description: '',
            name: '资源分配情况',
            type: 'text'
        }
    }
    goEdit() {
        let id = this.props.data.metadata.moInstId
        if (this.props.goEdit) {
            this.props.goEdit(id)
        }
    }
    goDelete() {
        let id = this.props.data.metadata.moInstId
        if (this.props.goDelete) {
            this.props.goDelete(id)
        }
    }
    goBackup() {
        let metadata = this.props.data.metadata
        if (this.props.goBackup) {
            this.props.goBackup(metadata)
        }
    }
    goManage() {
        let metadata = this.props.data.metadata
        if (this.props.goManage) {
            this.props.goManage(metadata)
        }
    }
    doFind() {
        let metadata = this.props.data.metadata
        if (this.props.doFind) {
            this.props.doFind(metadata)
        }
    }
    goTopo() {
        let metadata = this.props.data.metadata
        if (this.props.goTopo) {
            this.props.goTopo(metadata)
        }
    }

    toNewData(arr1, arr2) {
        let newArr: any = []
        if (arr1 && arr2) {
            let newObj = _.zipObject(arr1, arr2)
            _.forIn(newObj, (value, key) => {
                newArr.push([key, value])
            })
        }
        return newArr
    }

    toNewData2(arr1, arr2, arrText, percent = false) {
        let newArr: any = []
        let len = arrText.length
        if (arr1 && arr2) {
            let newObj = _.zipObject(arr1, arr2)
            if (percent) {
                let total = 0
                let eachNum: any
                _.times(len, (index) => {
                    newArr.push([arrText[index], newObj[arrText[index]]])
                    eachNum = newObj[arrText[index]]
                    total = total + parseInt(eachNum, 10)
                })
                _.times(len, (index) => {
                    newArr[index][1] = _.round((newArr[index][1] / total), 3) * 100
                })
            } else {
                _.times(len, (index) => {
                    newArr.push([arrText[index], newObj[arrText[index]]])
                })
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
    renderColorText(stringVal) {
        let arrColor = ['#6fbdf3', '#fba277', '#7cd8ba', 'dadada']
        let tempArr = _.split(stringVal, '/')
        let tempCon = []
        _.map(tempArr, (item, key) => {
            let display = (key === tempArr.length - 1) ? 'none' : 'inline-block'
            tempCon.push(<span style={{ color: arrColor[key] }}>{item}<i style={{ display: display }}>&nbsp;/&nbsp;</i></span>)
        })
        return tempCon
    }

    renderCardText(item) {
        const clsCard = classNames(styles.card, styles.card_w4);
        let newArr = this.toNewData(item.data.headers, _.head(item.data.values))
        return (
            <Card className={clsCard} bordered={false}>
                <div className={styles.card_titile}>
                    <span>{item.name}</span>
                </div>
                <div className={styles.card_cont_text}>
                    <p>{this.renderColorText('未使用/已使用/总/百分比')}</p>
                    {newArr ? _.map(newArr, (header, key) => {
                        return (
                            <p className={styles.card_header} key={key}>
                                {header[0]}：
                                <Tooltip placement="top" title={this.renderColorText(header[1])} arrowPointAtCenter>
                                    {this.renderColorText(header[1])}
                                </Tooltip>
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
                    <span>{item.name}</span>
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
                    <span>{item.name}</span>
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
                    <span>{item.name}</span>
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
        let { textData } = this.props
        let reports = data.reports
        return (
            <div className={styles.row_card}>
                {reports.map((item, key) => {
                    switch (item.type) {
                        case 'text':
                            return this.renderCardText(item)
                        // return this.renderCardText(textData)
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
        let { type } = this.props
        return (
            <div className={styles.overviewCard}>
                <div className={styles.title}>
                    <span className={styles.title_header}>{metadata.NAME}</span><span>ID: {metadata.ID}</span>&emsp;<span>位置:{metadata.location}</span>&emsp;
                    {type === 'vim' ? (<a href="javascript:;" onClick={this.goEdit.bind(this)}>编辑</a>) : ''}
                    {type === 'pim' ? (<a href="javascript:;" onClick={this.doFind.bind(this)}>链路发现</a>) : ''}
                    {type === 'pim' ? (<a className={styles.title_mg} href="javascript:;" onClick={this.goTopo.bind(this)}>网络拓扑</a>) : ''}
                    {type === 'vim' ? (<a href="javascript:;" className={styles.title_mg} onClick={this.goBackup.bind(this)}>备份</a>) : ''}
                    {type === 'vim' ? (<a href="javascript:;" className={styles.title_mg} onClick={this.goManage.bind(this)}>管理</a>) : ''}
                    {type === 'vim' ? (<a className={styles.title_dele} href="javascript:;" onClick={this.goDelete.bind(this)}>删除</a>) : ''}
                </div>
                {this.renderCard()}
            </div>
        );
    }
}