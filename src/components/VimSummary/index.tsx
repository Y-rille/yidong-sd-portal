import * as React from 'react';

import { Card, Button } from 'antd';

import styles from './index.less';

export interface VimSummaryProps {
    goEdit?
}

export default class VimSummary extends React.PureComponent<VimSummaryProps, any> {
    goEdit() {
        if (this.props.goEdit) {
            this.props.goEdit()
        }
    }
    renderVim() {
        return (
            <div>
                <div className={styles.vim}>
                    <div className={styles.title}>
                        <span className={styles.title_header}>VIM1</span><span>ID: 12345678</span>&emsp;<span>位置:杭州萧山</span>&emsp;
                        <a href="javascript:;" onClick={this.goEdit.bind(this)}>编辑</a>
                    </div>
                    <div className={styles._card_bj}>
                        <Card className={styles._card}>
                            <div className={styles._card_titile}>
                                <span>资源分配情况</span>
                                <Button className={styles._card_bn} size="small">查看</Button>
                            </div>
                            <p className={styles._card_qus}>VCPU(未使用/总)<span className={styles._card_ans}>：21G/26G</span></p>
                            <p className={styles._card_qus}>内存(未使用/总)<span className={styles._card_ans}>：21G/26G</span></p>
                            <p className={styles._card_qus}>硬盘(未使用/总)<span className={styles._card_ans}>：21G/26G</span></p>
                        </Card>
                        <Card className={styles._card}>
                            <div className={styles._card_titile}>
                                <span>告警</span>
                                <Button className={styles._card_bn} size="small">查看</Button>
                            </div>
                            <p className={styles._card_left_blue}>
                                <span className={styles.icon_blue}></span>总数：
                                <span className={styles._card_center_blue}>280</span>
                                <span className={styles._card_right_blue}>个</span>
                            </p>
                            <p className={styles._card_left_orange}>
                                <span className={styles.icon_orange}></span>严重：
                                <span className={styles._card_center_orange}>10</span>
                                <span className={styles._card_right_orange}>个</span>
                            </p>
                        </Card>
                        <Card className={styles._card}>
                            <div className={styles._card_titile}>
                                <span>虚拟机电源状态</span>
                                <Button className={styles._card_bn} size="small">查看</Button>
                            </div>
                            <p className={styles._card_left_blue}>
                                <span className={styles.icon_blue}></span>总数：
                                <span className={styles._card_center_blue}>280</span>
                                <span className={styles._card_right_blue}>个</span>
                            </p>
                            <p className={styles._card_left_grey}>
                                <span className={styles.icon_grey}></span>关机：
                                <span className={styles._card_center_grey}>10</span>
                                <span className={styles._card_right_grey}>个</span>
                            </p>
                            <p className={styles._card_left_green}>
                                <span className={styles.icon_green}></span>运行：
                                <span className={styles._card_center_green}>280</span>
                                <span className={styles._card_right_green}>个</span>
                            </p>
                        </Card>
                        <Card className={styles._card}>
                            <div className={styles._card_titile}>
                                <span>虚拟机健康状态</span>
                                <Button className={styles._card_bn} size="small">查看</Button>
                            </div>
                            <p className={styles._card_left_blue}>
                                <span className={styles.icon_blue}></span>总数：
                                <span className={styles._card_center_blue}>280</span>
                                <span className={styles._card_right_blue}>个</span>
                            </p>
                            <p className={styles._card_left_grey}>
                                <span className={styles.icon_grey}></span>关机：
                                <span className={styles._card_center_grey}>10</span>
                                <span className={styles._card_right_grey}>个</span>
                            </p>
                            <p className={styles._card_left_green}>
                                <span className={styles.icon_green}></span>运行：
                                <span className={styles._card_center_green}>280</span>
                                <span className={styles._card_right_green}>个</span>
                            </p>
                        </Card>
                    </div>
                </div>
                <div className={styles.vim}>
                    <div className={styles.title}>
                        <span className={styles.title_header}>VIM1</span><span>ID: 12345678</span>&emsp;<span>位置:杭州萧山</span>&emsp;
                        <a href="javascript:;" onClick={this.goEdit.bind(this)}>编辑</a>
                    </div>
                    <div className={styles._card_bj}>
                        <Card className={styles._card}>
                            <div className={styles._card_titile}>
                                <span>资源分配情况</span>
                                <Button className={styles._card_bn} size="small">查看</Button>
                            </div>
                            <p className={styles._card_qus}>VCPU(未使用/总)<span className={styles._card_ans}>：21G/26G</span></p>
                            <p className={styles._card_qus}>内存(未使用/总)<span className={styles._card_ans}>：21G/26G</span></p>
                            <p className={styles._card_qus}>硬盘(未使用/总)<span className={styles._card_ans}>：21G/26G</span></p>
                        </Card>
                        <Card className={styles._card}>
                            <div className={styles._card_titile}>
                                <span>告警</span>
                                <Button className={styles._card_bn} size="small">查看</Button>
                            </div>
                            <p className={styles._card_left_blue}>
                                <span className={styles.icon_blue}></span>总数：
                                <span className={styles._card_center_blue}>280</span>
                                <span className={styles._card_right_blue}>个</span>
                            </p>
                            <p className={styles._card_left_orange}>
                                <span className={styles.icon_orange}></span>严重：
                                <span className={styles._card_center_orange}>10</span>
                                <span className={styles._card_right_orange}>个</span>
                            </p>
                        </Card>
                        <Card className={styles._card}>
                            <div className={styles._card_titile}>
                                <span>虚拟机电源状态</span>
                                <Button className={styles._card_bn} size="small">查看</Button>
                            </div>
                            <p className={styles._card_left_blue}>
                                <span className={styles.icon_blue}></span>总数：
                                <span className={styles._card_center_blue}>280</span>
                                <span className={styles._card_right_blue}>个</span>
                            </p>
                            <p className={styles._card_left_grey}>
                                <span className={styles.icon_grey}></span>关机：
                                <span className={styles._card_center_grey}>10</span>
                                <span className={styles._card_right_grey}>个</span>
                            </p>
                            <p className={styles._card_left_green}>
                                <span className={styles.icon_green}></span>运行：
                                <span className={styles._card_center_green}>280</span>
                                <span className={styles._card_right_green}>个</span>
                            </p>
                        </Card>
                        <Card className={styles._card}>
                            <div className={styles._card_titile}>
                                <span>虚拟机健康状态</span>
                                <Button className={styles._card_bn} size="small">查看</Button>
                            </div>
                            <p className={styles._card_left_blue}>
                                <span className={styles.icon_blue}></span>总数：
                                <span className={styles._card_center_blue}>280</span>
                                <span className={styles._card_right_blue}>个</span>
                            </p>
                            <p className={styles._card_left_grey}>
                                <span className={styles.icon_grey}></span>关机：
                                <span className={styles._card_center_grey}>10</span>
                                <span className={styles._card_right_grey}>个</span>
                            </p>
                            <p className={styles._card_left_green}>
                                <span className={styles.icon_green}></span>运行：
                                <span className={styles._card_center_green}>280</span>
                                <span className={styles._card_right_green}>个</span>
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
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