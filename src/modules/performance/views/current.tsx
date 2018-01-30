import * as React from 'react';
import * as _ from 'lodash';
import {
    HashRouter as Router,
    Switch,
    Route, Link
} from 'react-router-dom'

import { Row, Col, Icon } from 'antd';

import InstrumentPanel from '../../../components/InstrumentPanel'
import styles from '../style/index.less'

class Home extends React.Component<any, any> {
    instrumentPanel_1: any
    constructor(props) {
        super(props);
        this.state = {
            showOne: true
        };
    }
    tabClick() {

    }
    printInstrumentPane() {
        this.instrumentPanel_1.chartExport()
    }
    hideOne() {
        this.setState({
            showOne: false
        })
    }

    render() {
        return (
            <Row gutter={20} style={{ padding: '0 20px' }} className={styles.current}>
                {this.state.showOne ?
                    <Col className="gutter-row" span={12} >
                        <div className="gutter-box">
                            <div className={styles.cardHead}>
                                <div>仪表盘</div>
                                <div className={styles.cardIcon}>
                                    <Icon type="download" onClick={this.printInstrumentPane.bind(this)} />|
                                    <Icon type="close" onClick={this.hideOne.bind(this)} />
                                </div>
                            </div>
                            <InstrumentPanel
                                ref={(node) => { this.instrumentPanel_1 = node }}
                                data={{
                                    title: '速度',
                                    min: 0,
                                    max: 100,
                                    current: 45
                                }}
                            />
                        </div>
                    </Col> : ''}
                <Col className="gutter-row" span={12}>
                    <div className="gutter-box">当前状态</div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <div className="gutter-box">当前状态</div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <div className="gutter-box">当前状态</div>
                </Col>
            </Row>
        );
    }
}

export default Home;