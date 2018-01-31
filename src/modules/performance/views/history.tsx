import * as React from 'react';
import * as _ from 'lodash';
import {
    HashRouter as Router,
    Switch,
    Route, Link
} from 'react-router-dom'
import { Row, Col, Icon } from 'antd';

import styles from '../style/index.less'
import TimeSelect from '../../../components/TimeSelect/';
import LineChartCard from '../../../components/LineChartCard/'

let data = [{
    name: '2018-1-30',
    color: '#5CCBAE',
    data: [34, 40, 77, 58, 41, 31, 33, 75, 43, 82, 21, 4]
}]

class Home extends React.Component<any, any> {
    lineChart_1: any
    lineChart_2: any
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    inquire(longTime, selectValue) {
        // console.log(longTime, selectValue);
    }
    render() {
        return (
            <div>
                <div className={styles.toolBar}>
                    <TimeSelect inquire={this.inquire.bind(this)} />
                </div>
                <Row gutter={20} style={{ padding: '0 20px' }} className={styles.current}>
                    <LineChartCard data={data} />
                    <LineChartCard data={data} />
                </Row>
            </div>
        );
    }
}

export default Home;