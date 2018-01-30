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
    name: '安装，实施人员',
    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
}, {
    name: '工人',
    data: [24916, 24064, 29742, 29851, 56432, 30282, 38121, 40434]
}, {
    name: '销售',
    data: [16005, 17722, 11744, 19771, 20185, 24377, 32147, 39387]
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
                <div className={styles.toolBar} style={{backgroundColor:'#FFF',height:45}}>
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