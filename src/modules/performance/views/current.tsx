import * as React from 'react';
import * as _ from 'lodash';
import {
    HashRouter as Router,
    Switch,
    Route, Link
} from 'react-router-dom'

import { Row, Col, Button } from 'antd';

import InstrumentPanel from '../../../components/InstrumentPanel'

class Home extends React.Component<any, any> {
    instrumentPanel_1: any
    tabClick() {

    }
    printInstrumentPane() {
        this.instrumentPanel_1.chartExport()
    }
    render() {
        return (
            <Row gutter={20} style={{ padding: '0 20px' }}>
                <Col className="gutter-row" span={12}>
                    <div className="gutter-box">
                        仪表盘<Button onClick={this.printInstrumentPane.bind(this)} type="primary" size="small" shape="circle" icon="download" style={{ float: 'right' }}></Button>
                        <InstrumentPanel
                            ref={(node) => { this.instrumentPanel_1 = node }}
                            data={{
                                title: '速度',
                                min: 0,
                                max: 200,
                                current: 100
                            }}
                        />
                    </div>
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