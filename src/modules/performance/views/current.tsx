import * as React from 'react';
import * as _ from 'lodash';
import {
    HashRouter as Router,
    Switch,
    Route, Link
} from 'react-router-dom'

import { Row, Col, Icon } from 'antd';

import InstrumentPanel from '../../../components/InstrumentPanel'
import InstrumentCard from '../../../components/InstrumentCard'
import styles from '../style/index.less'

class Current extends React.Component<any, any> {
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
                <InstrumentCard data={{
                    title: '速度',
                    min: 0,
                    max: 100,
                    current: 65,
                    gradient: false,
                    unit: '$'
                }} />
                <InstrumentCard data={{
                    title: '温度表1',
                    min: 0,
                    max: 100,
                    current: 45,
                    gradient: true
                }} />
                <InstrumentCard data={{
                    title: '效率表2',
                    min: 0,
                    max: 100,
                    current: 65,
                    gradient: false,
                    unit: '￥'
                }} />

                {/*<Col className="gutter-row" span={12}>
                    <div className="gutter-box">当前状态</div>
                </Col>*/}

            </Row>
        );
    }
}

export default Current;