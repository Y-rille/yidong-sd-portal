import * as React from 'react';
import * as _ from 'lodash';
import {
    HashRouter as Router,
    Switch,
    Route, Link
} from 'react-router-dom'

import { Row, Col } from 'antd';

import InstrumentPanel from '../../../components/InstrumentPanel'
import LineChart from '../../../components/LineChart'

class Home extends React.Component<any, any> {
    tabClick() {

    }
    render() {
        return (
            <Row gutter={16} style={{ padding: '0 0' }}>
                <Col className="gutter-row" span={12}>
                    <div className="gutter-box"><InstrumentPanel /></div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <div className="gutter-box"><LineChart /></div>
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