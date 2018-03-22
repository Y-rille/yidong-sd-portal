import * as React from 'react';

import { Card, Button } from 'antd';

import styles from './index.less';

export interface VimSummaryProps {
    goEdit?
    data?
}

export default class VimSummary extends React.PureComponent<VimSummaryProps, any> {
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
                    }
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
                    }
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
                    }
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
                    }
                }
            ]
        }
    }
    renderVim() {
        let { data } = this.props
        let itemResource = data.reports[0] ? data.reports[0] : {}
        let itemWarning = data.reports[1] ? data.reports[1] : {}
        let itemVirtualSource = data.reports[2] ? data.reports[2] : {}
        let itemVirtualHealth = data.reports[3] ? data.reports[3] : {}
        return (
            <div>
                <div className={styles.vim}>
                    <div className={styles.title}>
                        <span className={styles.title_header}>{data.metadata.name}</span><span>ID: {data.metadata.id}</span>&emsp;<span>位置:{data.metadata.localtion}</span>&emsp;
                        <a href="javascript:;" onClick={this.goEdit.bind(this)}>编辑</a>
                    </div>
                    <div className={styles._card_bj}>
                        <Card className={styles._card} bordered={false}>
                            <div className={styles._card_titile}>
                                <span>{itemResource.description}</span>
                                {/* <Button className={styles._card_bn} size="small">查看</Button> */}
                            </div>
                            <p className={styles._card_qus}>VCPU(未使用/总)<span className={styles._card_ans}>：{itemResource.data.values[0][0]}</span></p>
                            <p className={styles._card_qus}>内存(未使用/总)<span className={styles._card_ans}>：{itemResource.data.values[0][1]}</span></p>
                            <p className={styles._card_qus}>硬盘(未使用/总)<span className={styles._card_ans}>：{itemResource.data.values[0][2]}</span></p>
                        </Card>
                        <Card className={styles._card} bordered={false}>
                            <div className={styles._card_titile}>
                                <span>{itemWarning.description}</span>
                                {/* <Button className={styles._card_bn} size="small">查看</Button> */}
                            </div>
                            <p className={styles._card_left_blue}>
                                <span className={styles.icon_blue}></span>总数：
                                <span className={styles._card_center_blue}>{itemWarning.data.values[0][0]}</span>
                                <span className={styles._card_right_blue}>个</span>
                            </p>
                            <p className={styles._card_left_orange}>
                                <span className={styles.icon_orange}></span>严重：
                                <span className={styles._card_center_orange}>{itemWarning.data.values[0][1]}</span>
                                <span className={styles._card_right_orange}>个</span>
                            </p>
                        </Card>
                        <Card className={styles._card} bordered={false}>
                            <div className={styles._card_titile}>
                                <span>{itemVirtualSource.description}</span>
                                {/* <Button className={styles._card_bn} size="small">查看</Button> */}
                            </div>
                            <p className={styles._card_left_blue}>
                                <span className={styles.icon_blue}></span>总数：
                                <span className={styles._card_center_blue}>{itemVirtualSource.data.values[0][0]}</span>
                                <span className={styles._card_right_blue}>个</span>
                            </p>
                            <p className={styles._card_left_grey}>
                                <span className={styles.icon_grey}></span>关机：
                                <span className={styles._card_center_grey}>{itemVirtualSource.data.values[0][1]}</span>
                                <span className={styles._card_right_grey}>个</span>
                            </p>
                            <p className={styles._card_left_green}>
                                <span className={styles.icon_green}></span>运行：
                                <span className={styles._card_center_green}>{itemVirtualSource.data.values[0][2]}</span>
                                <span className={styles._card_right_green}>个</span>
                            </p>
                        </Card>
                        <Card className={styles._card} bordered={false}>
                            <div className={styles._card_titile}>
                                <span>{itemVirtualHealth.description}</span>
                                {/* <Button className={styles._card_bn} size="small">查看</Button> */}
                            </div>
                            <p className={styles._card_left_blue}>
                                <span className={styles.icon_blue}></span>总数：
                                <span className={styles._card_center_blue}>{itemVirtualHealth.data.values[0][0]}</span>
                                <span className={styles._card_right_blue}>个</span>
                            </p>
                            <p className={styles._card_left_grey}>
                                <span className={styles.icon_grey}></span>关机：
                                <span className={styles._card_center_grey}>{itemVirtualHealth.data.values[0][1]}</span>
                                <span className={styles._card_right_grey}>个</span>
                            </p>
                            <p className={styles._card_left_green}>
                                <span className={styles.icon_green}></span>运行：
                                <span className={styles._card_center_green}>{itemVirtualHealth.data.values[0][2]}</span>
                                <span className={styles._card_right_green}>个</span>
                            </p>
                        </Card>
                    </div>
                </div>
            </div >
        )
    }
    render() {
        return (
            <div>
                {this.renderVim()}
            </div>
        );
    }
}