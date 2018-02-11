import * as React from 'react';
import * as _ from 'lodash';
import {
    HashRouter as Router,
    Switch,
    Route, Link
} from 'react-router-dom'

import { Row, Col, Icon } from 'antd';

import InstrumentPanel from '../../../components/InstrumentPanel'
import InstrumentCard from '../../../components/InstrumentCard'
import NoData from '../../../components/NoData'
import styles from '../style/index.less'
import deepPick from '../utils/deepPick'
import getKpiData from '../utils/getKpiData'
import moment from '../../../common/moment'

let testData = [
    {
        'kpiId': '4',
        'x_value': [15149772, 15149781, 15149790, 15149799, 15149808, 15149817, 15149826, 15149826, 15149835, 15149844, 15149853, 15149862, 15149871],
        'val': [60],
        'kpiName': '主机.可用内存',
        'kpiUnit': 'MB',
        'maxValue': '140',
        'minValue': '0'
    },
    {
        'kpiId': '5',
        'x_value': [15149772, 15149781, 15149790, 15149799, 15149808, 15149817, 15149826, 15149826, 15149835, 15149844, 15149853, 15149862, 15149871],
        'val': [1500],
        'threshold': {
            'thresholdId': 1,
            'kpiId': 5,
            'criticalThresholdOperator': '>',
            'criticalThresholdValue': '1500',
            'majorThresholdOperator': '>',
            'majorThresholdValue': '1000',
            'minorThresholdOperator': '>',
            'minorThresholdValue': '400',
            'normalThresholdOperator': '>',
            'normalThresholdValue': '200',
            'state': 1
        },
        'kpiName': '主机.网络端口发送速率',
        'kpiUnit': 'Mbps',
        'maxValue': '2122',
        'minValue': '0'
    }
]

class Current extends React.Component<any, any> {
    instrumentPanel_1: any
    constructor(props) {
        super(props);
        this.state = {
            result: []
        };
    }
    tabClick() {

    }
    printInstrumentPane() {
        this.instrumentPanel_1.chartExport()
    }

    componentWillMount() {
        if (this.props.kpis) {
            this.getData(this.props.kpis)
        }
    }
    getData(facts, begintime = moment().tz('Asia/Shanghai').subtract(15, 'minutes').valueOf(), endtime = moment().tz('Asia/Shanghai').valueOf(), timeFilter = null) {
        let nodeInfo = this.props.nodeInfo
        let wheredim = `${nodeInfo.bizFields.moDimensionId},eq,${nodeInfo.nodeName}`
        let DataParams = {
            facts: facts,
            begintime,
            endtime,
            wheredim,
            dims: 'T_HOST',
            granularity: 15
        }
        let moInstKpiThresholds = this.props.moInstKpiThresholds
        let moTypeKpis = this.props.moTypeKpis
        let self = this
        this.props.actions.getData('value_pack_vim', DataParams, function (kpidata) {
            self.setState({
                result: getKpiData(moTypeKpis, moInstKpiThresholds, kpidata, self.props.kpis)
            })
        })
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.kpis !== this.props.kpis) {
            this.getData(nextProps.kpis)
        }
    }
    deleteCard(kpiId) {
        this.props.deleteCard(kpiId);
    }
    render() {
        let nodeName = this.props.nodeInfo.nodeName;
        let moInstKpiThresholds = this.props.moInstKpiThresholds
        let moTypeKpis = this.props.moTypeKpis
        let kpidata = this.props.kpidata
        // if (moInstKpiThresholds && moTypeKpis && kpidata) {
        //     let result = getKpiData(moTypeKpis, moInstKpiThresholds, kpidata, this.props.kpis)
        //     return (
        //         <Row gutter={20} style={{ padding: '0 20px 10px', marginTop: '-10px' }} className={styles.current}>
        //             {result.map((item, index) => {
        //                 return (
        //                     <InstrumentCard deleteCard={this.deleteCard.bind(this)} key={item.kpiId} data={item} hideFacts={this.props.hideFacts} />
        //                 )
        //             })}
        //         </Row>
        //     )
        // } else {
        //     return <div></div>
        // }
        return (
            this.state.result.length > 0 ? (
                <Row gutter={20} style={{ padding: '0 20px 10px', marginTop: '-10px' }} className={styles.current}>
                    {this.state.result.map((item, index) => {
                        return (
                            <InstrumentCard deleteCard={this.deleteCard.bind(this)} key={item.kpiId} data={item} nodeName={nodeName} hideFacts={this.props.hideFacts} />
                        )
                    })}
                </Row>) : (
                    <NoData/>
                )
        )

    }
}

export default Current;