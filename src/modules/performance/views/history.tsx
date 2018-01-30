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
import LineChart from '../../../components/LineChart'

class Home extends React.Component<any, any> {
    tabClick() {

    }
    inquire(longTime) {
        // console.log(longTime);
    }

    render() {
        return (
            <div>
                <div className={styles.toolBar}>
                    工具栏
                    <TimeSelect inquire={this.inquire.bind(this)} />
                </div>
                <Row gutter={20} style={{ padding: '0 20px' }}>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box"><LineChart /></div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box"><LineChart /></div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box"><LineChart /></div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box"><LineChart /></div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;