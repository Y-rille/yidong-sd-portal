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

class Home extends React.Component<any, any> {
    tabClick() {

    }
    render() {
        return (
            <div>
                <div className={styles.toolBar}>
                    工具栏
                    <TimeSelect />
                </div>
                <Row gutter={16} style={{ padding: '0 0' }}>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box">历史趋势</div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box">历史趋势</div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box">历史趋势</div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box">历史趋势</div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;