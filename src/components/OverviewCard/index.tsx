import * as React from 'react';
import { Card, Button } from 'antd';
import styles from './index.less';
import _ from 'lodash';

export interface OverviewCardProps {
    goEdit?
    data?
}

export default class OverviewCard extends React.PureComponent<OverviewCardProps, any> {
    goEdit() {
        if (this.props.goEdit) {
            this.props.goEdit()
        }
    }
    static defaultProps = {
        data: {
            'metadata': {
                'name': 'VIM1',
                'id': '12345678',
                'localtion': '杭州萧山'
            },
            'reports': [
                {
                    'name': 'resUsedInfo',
                    'description': '资源分配情况',
                    'data': {
                        'headers': [
                            'VCPU(未使用/总)',
                            '内存(未使用/总)',
                            '硬盘(未使用/总)'
                        ],
                        'values': [
                            [
                                '21G/26G',
                                '21G/26G',
                                '21G/26G'
                            ]
                        ]
                    },
                    'tab': 'text'
                },
                {
                    'name': 'alarmInfo',
                    'description': '告警',
                    'data': {
                        'headers': [
                            '总数',
                            '严重'
                        ],
                        'values': [
                            [
                                '100',
                                '20'
                            ]
                        ]
                    },
                    'tab': 'dot1'
                },
                {
                    'name': 'vmPowerStatus',
                    'description': '虚拟机电源状态',
                    'data': {
                        'headers': [
                            '总数',
                            '关机',
                            '运行'
                        ],
                        'values': [
                            [
                                '100',
                                '2',
                                '88'
                            ]
                        ]
                    },
                    'tab': 'dot2'
                },
                {
                    'name': 'vmStatus',
                    'description': '虚拟机健康状态',
                    'data': {
                        'headers': [
                            '总数',
                            '关机',
                            '运行'
                        ],
                        'values': [
                            [
                                '100',
                                '2',
                                '88'
                            ]
                        ]
                    },
                    'tab': 'dot2'
                }
            ]
        }
    }

    renderCardText(item) {
        let arrHeaders = item.data.headers
        let arrValues = _.head(item.data.values)
        return (
            <Card className={styles.card} bordered={false}>
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
        let arrHeaders = item.data.headers
        let arrValues = _.head(item.data.values)
        let arrColor = ['#6fbdf3', '#fba277', '#000']
        return (
            <Card className={styles.card} bordered={false}>
                <div className={styles.card_titile}>
                    <span>{item.description}</span>
                </div>
                {arrHeaders.map((header, key) => {
                    return (
                        <p className={styles.card_cont_dot} key={key}>
                            <span className={styles.icon} style={{ backgroundColor: arrColor[key < 3 ? key : 2] }} />
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
        let arrHeaders = item.data.headers
        let arrValues = _.head(item.data.values)
        let arrColor = ['#6fbdf3', '#b2becd', '#7cd8ba']
        return (
            <Card className={styles.card} bordered={false}>
                <div className={styles.card_titile}>
                    <span>{item.description}</span>
                </div>
                {arrHeaders.map((header, key) => {
                    return (
                        <p className={styles.card_cont_dot} key={key}>
                            <span className={styles.icon} style={{ backgroundColor: arrColor[key] }} />
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
        return (
            <div>
                CardPie
            </div>
        )

    }

    renderCard() {
        let { data } = this.props
        let reports = data.reports
        return (
            <div className={styles.row_card}>
                {reports.map((item, key) => {
                    switch (item.tab) {
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
        return (
            <div className={styles.overviewCard}>
                <div className={styles.title}>
                    <span className={styles.title_header}>{data.metadata.name}</span><span>ID: {data.metadata.id}</span>&emsp;<span>位置:{data.metadata.localtion}</span>&emsp;
                    <a href="javascript:;" onClick={this.goEdit.bind(this)}>编辑</a>
                </div>
                {this.renderCard()}
            </div>
        );
    }
}