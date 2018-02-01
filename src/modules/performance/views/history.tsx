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
import moment from '../../../common/moment'
import getKpiData from '../utils/getKpiData'

let alldata = [{
    'title': 'CPU使用率',
    'x': ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'],
    'tagLine': 50,
    'datas': [{
        // name: '2018-1-30',
        data: [34, 40, 77, 58, 41, 31, 34, 75, 43, 82, 21, 4]
    }]
}, {
    'title': '内存使用率',
    'tagLine': 60,
    'x': ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'],
    'datas': [{
        // name: '2018-1-31',
        data: [62, 21, 34, 40, 67, 58, 61, 31, 33, 12]
    }]
}, {
    'title': '总内存',
    'tagLine': '',
    'x': ['11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00'],
    'datas': [{
        // name: '2018-2-1',
        data: [34, 4, 67, 58, 61, 31, 33]
    }]
}, {
    'title': '可用内存',
    'tagLine': 70,
    'x': ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00'],
    'datas': [{
        // name: '2018-2-2',
        data: [33, 79, 43, 62, 21, 12]
    }]
}]
const packageId = 'value_pack_vim'
class History extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    inquire(longTime, selectValue) {
        let facts = '4,5'
        let begintime = longTime.length > 0 ? longTime[0] : null
        let endtime = longTime.length > 0 ? longTime[1] : null
        let timeFilter = selectValue !== '' ? selectValue : null
        this.getData('4,5', begintime, endtime, timeFilter)

    }

    getData(facts, begintime = moment().tz('Asia/Shanghai').subtract(1, 'days').valueOf(), endtime = moment().tz('Asia/Shanghai').valueOf(), timeFilter = null) {
        let DataParams = {
            facts: facts,
            begintime,
            endtime,
            // wheredim,
            timeFilter

        }
        // console.log(DataParams)
        this.props.actions.getData(packageId, DataParams)
    }
    componentWillMount() {
        let moTypeKpis = this.props.moTypeKpis.data
        let facts = []
        for (let i = 0; i < 4; i++) {
            if (moTypeKpis[i]) {
                facts.push(moTypeKpis[i].kpiId)
            }
        }
        var str_facts = facts.join(',')
        // 默认获取前四个指标的信息
        this.getData(str_facts)
    }
    componentDidMount() {

    }

    renderLineChartCard(result) {
        return alldata.map((item, index) => {
            return (
                <LineChartCard key={index} data={item} />
            )
        })
    }
    render() {
        let moInstKpiThresholds = this.props.moInstKpiThresholds
        let moTypeKpis = this.props.moTypeKpis
        let kpidata = this.props.kpidata
        if (moInstKpiThresholds && moTypeKpis && kpidata) {
            let result = getKpiData(moTypeKpis, moInstKpiThresholds, kpidata)
            // console.log('result: ', result);
            return (
                <div>
                    <div className={styles.toolBar} style={{ backgroundColor: '#FFF', height: 45 }}>
                        <TimeSelect inquire={this.inquire.bind(this)} />
                    </div>
                    <Row gutter={20} style={{ padding: '0 20px' }}>
                        {this.renderLineChartCard(result)}
                    </Row>
                </div>
            );
        } else {
            return (<div>loading</div>)
        }

    }
}

export default History;