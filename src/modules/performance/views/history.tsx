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

let testData = [
    {
        'kpiId': '4',
        'x_value': [15149772, 15149781, 15149790, 15149799, 15149808, 15149817, 15149826, 15149826, 15149835, 15149844, 15149853, 15149862, 15149871],
        'val': [13072, 13072, 13072, 13072, 13072, 13072, 13072, 13072, 13072, 13072, 13072, 13072, 13072],
        'kpiName': '主机.可用内存',
        'kpiUnit': 'MB',
        'maxValue': '0',
        'minValue': '131072'
    },
    {
        'kpiId': '5',
        'x_value': [15149772, 15149781, 15149790, 15149799, 15149808, 15149817, 15149826, 15149826, 15149835, 15149844, 15149853, 15149862, 15149871],
        'val': [2111, 2343, 17644, 13211, 24222, 34222, 34222, 16072, 34222, 34222, 34222, 34222, 34222],
        'threshold': {
            'thresholdId': 1,
            'kpiId': 5,
            'criticalThresholdOperator': '>',
            'criticalThresholdValue': '30000',
            'majorThresholdOperator': '>',
            'majorThresholdValue': '20000',
            'minorThresholdOperator': '>',
            'minorThresholdValue': '14000',
            'normalThresholdOperator': '>',
            'normalThresholdValue': '5000',
            'state': 1
        },
        'kpiName': '主机.网络端口发送速率',
        'kpiUnit': 'Mbps',
        'maxValue': '0',
        'minValue': '1024'
    }
]

const packageId = 'value_pack_vim'
class History extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            begintime: moment().tz('Asia/Shanghai').subtract(1, 'days').valueOf(),
            endtime: moment().tz('Asia/Shanghai').valueOf(),
            timeFilter: '5',
        };
    }
    inquire(longTime, selectValue) {
        let begintime = longTime.length > 0 ? longTime[0] : null
        let endtime = longTime.length > 0 ? longTime[1] : null
        let timeFilter = selectValue !== '' ? selectValue : null
        this.setState({
            begintime,
            endtime,
            timeFilter
        })
        this.getData(this.props.kpis, begintime, endtime, timeFilter)

    }

    getData(facts, begintime = moment().tz('Asia/Shanghai').subtract(1, 'days').valueOf(), endtime = moment().tz('Asia/Shanghai').valueOf(), timeFilter = null) {
        let DataParams = {
            facts: facts,
            begintime,
            endtime,
            // wheredim,
            timeFilter
        }
        this.props.actions.getData(packageId, DataParams)
    }

    componentWillMount() {
        this.getData(this.props.kpis)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.kpis && nextProps.kpis !== this.props.kpis) {
            this.getData(nextProps.kpis, this.state.begintime, this.state.endtime, this.state.timeFilter)
        }
    }

    componentDidMount() {

    }

    renderLineChartCard(result) {
        return result.map((item, index) => {
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
            let result = getKpiData(moTypeKpis, moInstKpiThresholds, kpidata, this.props.kpis)
            // console.log('result: ', result);
            return (
                <div>
                    <div className={styles.toolBar} style={{ backgroundColor: '#FFF', height: 45 }}>
                        <TimeSelect timeFilter={this.props.timeFilter} defaultValue={[this.state.begintime, this.state.endtime, this.state.timeFilter]} inquire={this.inquire.bind(this)} />
                    </div>
                    <Row gutter={20} style={{ padding: '0 20px' }}>
                        {this.renderLineChartCard(result)}
                    </Row>
                </div>
            );
        } else {
            return (<div > loading</div>)
        }

    }
}

export default History;