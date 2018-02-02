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

let testData = [
    {
        'kpiId': '4',
        'x_value': [15149772, 15149781, 15149790, 15149799, 15149808, 15149817, 15149826, 15149826, 15149835, 15149844, 15149853, 15149862, 15149871],
        'val': [60],
        'kpiName': '主机.可用内存',
        'kpiUnit': 'MB',
        'maxValue': '140',
        'minValue': '0'
    },
    {
        'kpiId': '5',
        'x_value': [15149772, 15149781, 15149790, 15149799, 15149808, 15149817, 15149826, 15149826, 15149835, 15149844, 15149853, 15149862, 15149871],
        'val': [70],
        'threshold': {
            'thresholdId': 1,
            'kpiId': 5,
            'criticalThresholdOperator': '>',
            'criticalThresholdValue': '1500',
            'majorThresholdOperator': '>',
            'majorThresholdValue': '1000',
            'minorThresholdOperator': '>',
            'minorThresholdValue': '400',
            'normalThresholdOperator': '>',
            'normalThresholdValue': '200',
            'state': 1
        },
        'kpiName': '主机.网络端口发送速率',
        'kpiUnit': 'Mbps',
        'maxValue': '2122',
        'minValue': '0'
    }
]
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

    componentWillUpdate(nextProps: any, nextState) {
        console.warn('Current componentWillUpdate');
    }

    demo() {
        this.props.actions.demo()
    }
    renderCard() {

    }
    render() {
        // console.log('-------------------------', this.props.demo);
        return (
            <Row gutter={20} style={{ padding: '0 20px' }} className={styles.current}>
                {/* <a href="javascript:void(0)" onClick={this.demo.bind(this)}>demo</a> */}
                {testData.map((item, index) => {
                    return (
                        <InstrumentCard key={index} data={item} />
                    )
                })}
                {/*<InstrumentCard data={{
                    title: '速度',
                    min: 0,
                    max: 100,
                    current: 65,
                    gradient: false,
                    unit: '$'
                }} />
               
                <Col className="gutter-row" span={12}>
                    <div className="gutter-box">当前状态</div>
                </Col>*/}

            </Row>
        );
    }
}

export default Current;