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
    printLineChart() {
        this.lineChart_1.chartExport()
        this.lineChart_2.chartExport()
    }
    hideOne() {
        this.setState({
            showOne: false
        })
    }
    render() {
        return (
            <div>
                <div className={styles.toolBar} style={{backgroundColor: '#FFF', height: 45}}>
                    <TimeSelect inquire={this.inquire.bind(this)} />
                </div>
                <Row gutter={20} style={{ padding: '0 20px' }} className={styles.current}>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box">
                            <div className={styles.cardHead}>
                                <div>CPU使用率</div>
                                <div className={styles.cardIcon}>
                                    <Icon type="download" onClick={this.printLineChart.bind(this)} />|
                                    <Icon type="close" onClick={this.hideOne.bind(this)} />
                                </div>
                            </div>
                            <LineChart ref={(node) => { this.lineChart_1 = node }} data={data} />
                        </div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box">
                            <div className={styles.cardHead}>
                                <div>内存使用率</div>
                                <div className={styles.cardIcon}>
                                    <Icon type="download" onClick={this.printLineChart.bind(this)} />|
                                    <Icon type="close" onClick={this.hideOne.bind(this)} />
                                </div>
                            </div>
                            <LineChart ref={(node) => { this.lineChart_2 = node }} data={data} />
                        </div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box">折线图</div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div className="gutter-box">折线图</div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;