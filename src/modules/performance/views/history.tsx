import * as React from 'react';
import * as _ from 'lodash';
import {
    HashRouter as Router,
    Switch,
    Route, Link
} from 'react-router-dom'
import { Row, Col } from 'antd';

import styles from '../style/index.less'
import TimeSelect from '../../../components/TimeSelect/';
import LineChartCard from '../../../components/LineChartCard/'
let alldata = [{
    'title': 'CPU使用率',
    'tagLine': 50,
    'datas': [{
        name: '2018-1-30',
        data: [34, 40, 77, 58, 41, 31, 34, 75, 43, 82, 21, 4]
    }]
}, {
    'title': '内存使用率',
    'tagLine': 60,
    'datas': [{
        name: '2018-1-31',
        data: [79, 43, 62, 21, 34, 40, 67, 58, 61, 31, 33, 12]
    }]
}, {
    'title': '总内存',
    'tagLine': '',
    'datas': [{
        name: '2018-2-1',
        data: [34, 4, 67, 58, 61, 31, 33, 79, 43, 62, 21, 12]
    }]
}, {
    'title': '可用内存',
    'tagLine': 70,
    'datas': [{
        name: '2018-2-2',
        data: [34, 40, 67, 33, 79, 43, 62, 21, 12, 58, 61, 31]
    }]
}]

let testData = [
    {
        'kpiId': '4',
        'x_value': [15149772, 15149781, 15149790, 15149799, 15149808, 15149817, 15149826, 15149826, 15149835, 15149844, 15149853, 15149862, 15149871],
        'val': [13072, 13072, 13072, 13072, 13072, 13072, 13072, 13072, 13072, 13072, 13072, 13072, 13072],
        'kpiName': '主机.可用内存',
        'kpiUnit': 'MB',
        'maxValue': '0',
        'minValue': '131072'
    },
    {
        'kpiId': '5',
        'x_value': [15149772, 15149781, 15149790, 15149799, 15149808, 15149817, 15149826, 15149826, 15149835, 15149844, 15149853, 15149862, 15149871],
        'val': [2111, 2343, 17644, 13211, 24222, 34222, 34222, 16072, 34222, 34222, 34222, 34222, 34222],
        'threshold': {
            'thresholdId': 1,
            'kpiId': 5,
            'criticalThresholdOperator': '>',
            'criticalThresholdValue': '30000',
            'majorThresholdOperator': '>',
            'majorThresholdValue': '20000',
            'minorThresholdOperator': '>',
            'minorThresholdValue': '14000',
            'normalThresholdOperator': '>',
            'normalThresholdValue': '5000',
            'state': 1
        },
        'kpiName': '主机.网络端口发送速率',
        'kpiUnit': 'Mbps',
        'maxValue': '0',
        'minValue': '1024'
    }
]

class History extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    inquire(longTime, selectValue) {
        // console.log(longTime, selectValue);
    }
    renderLineChartCard() {
        return testData.map((item, index) => {
            return (
                <LineChartCard key={index} data={item} />
            )
        })
    }
    componentWillUpdate(nextProps: any, nextState) {
        console.warn('History componentWillUpdate');
    }
    render() {
        return (
            <div>
                <div className={styles.toolBar} style={{ backgroundColor: '#FFF', height: 45 }}>
                    <TimeSelect inquire={this.inquire.bind(this)} />
                </div>
                <Row gutter={20} style={{ padding: '0 20px' }}>
                    {this.renderLineChartCard()}
                </Row>
            </div>
        );
    }
}

export default History;