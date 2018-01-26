import * as React from 'react';
import * as _ from 'lodash';
import {
    HashRouter as Router,
    Switch,
    Route, Link
} from 'react-router-dom'

import { Row, Col } from 'antd';

class Home extends React.Component<any, any> {
    tabClick() {

    }
    render() {
        return (
            <Row gutter={16} style={{ padding: '0 16px' }}>
                <Col className="gutter-row" span={12}>
                    <div className="gutter-box">当前状态</div>
                </Col>
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