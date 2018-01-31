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

class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    inquire(longTime, selectValue) {
        // console.log(longTime, selectValue);
    }
    renderLineChartCard() {
        return alldata.map((item, index) => {
            return (
                <LineChartCard key={index} data={item} />
            )
        })
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

export default Home;