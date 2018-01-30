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
import LineChart from '../../../components/LineChart/'

let data = [{
    name: '2018-1-30',
    color: '#5CCBAE',
    data: [34, 40, 77, 58, 41, 31, 33, 75, 43, 82, 21, 4]
}, {
    name: '2018-1-31',
    color: '#99CADA',
    data: [16, 64, 42, 51, 32, 82, 51, 34, 31, 19, 33, 15]
}]

class Home extends React.Component<any, any> {
    tabClick() {

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
                <Row gutter={20} style={{ padding: '0 20px' }}>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box"><LineChart data={data} /></div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box"><LineChart data={data} /></div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box"><LineChart data={data} /></div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box"><LineChart data={data} /></div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;