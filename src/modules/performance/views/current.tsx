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
import styles from '../style/index.less'
import getKpiData from '../utils/getKpiData'

// 指标列表
// let moTypeKpis = {
//     "code": 1,
//     "data": [
//       {
//         "kpiId": 6,
//         "kpiName": "主机.网络端口接收速率",
//         "kpiRealName": "网络端口接收速率",
//         "mogrpId": 1,
//         "kpiDesc": "计算节点必选，所有业务端口接收速率的总和（1B=8b）",
//         "kpiCategory": "PI",
//         "kpiType": 2,
//         "kpiUnit": "Mbps",
//         "kpiAlgorithm": "采集",
//         "dimensionId": 7,
//         "priority": 1,
//         "kpiTablefield": "NicReceiveRate",
//         "version": "1.0",
//         "maxValue": "0",
//         "minValue": "1024",
//         "state": 1
//       },
//       {
//         "kpiId": 5,
//         "kpiName": "主机.网络端口发送速率",
//         "kpiRealName": "网络端口发送速率",
//         "mogrpId": 1,
//         "kpiDesc": "计算节点必选，所有业务端口发送速率的总和（1B=8b）",
//         "kpiCategory": "PI",
//         "kpiType": 2,
//         "kpiUnit": "Mbps",
//         "kpiAlgorithm": "采集",
//         "dimensionId": 7,
//         "priority": 1,
//         "kpiTablefield": "NicTransferRate",
//         "version": "1.0",
//         "maxValue": "0",
//         "minValue": "1024",
//         "state": 1
//       },
//       {
//         "kpiId": 3,
//         "kpiName": "主机.总内存",
//         "kpiRealName": "总内存",
//         "mogrpId": 1,
//         "kpiCategory": "PI",
//         "kpiType": 2,
//         "kpiUnit": "MB",
//         "kpiAlgorithm": "采集",
//         "dimensionId": 7,
//         "priority": 1,
//         "kpiTablefield": "RamTotal",
//         "version": "1.0",
//         "maxValue": "0",
//         "minValue": "131072",
//         "state": 1
//       },
//       {
//         "kpiId": 2,
//         "kpiName": "主机.内存使用率",
//         "kpiRealName": "内存使用率",
//         "mogrpId": 1,
//         "kpiCategory": "PI",
//         "kpiType": 2,
//         "kpiUnit": "%",
//         "kpiAlgorithm": "采集",
//         "dimensionId": 7,
//         "priority": 1,
//         "kpiTablefield": "RamUtil",
//         "version": "1.0",
//         "maxValue": "0",
//         "minValue": "100",
//         "state": 1
//       },
//       {
//         "kpiId": 1,
//         "kpiName": "主机.CPU使用率",
//         "kpiRealName": "CPU使用率",
//         "mogrpId": 1,
//         "kpiDesc": "总CPU使用率/CPU数量",
//         "kpiCategory": "PI",
//         "kpiType": 2,
//         "kpiUnit": "%",
//         "kpiAlgorithm": "采集",
//         "dimensionId": 7,
//         "priority": 1,
//         "kpiTablefield": "CpuUtil",
//         "version": "1.0",
//         "maxValue": "0",
//         "minValue": "100",
//         "state": 1
//       },
//       {
//         "kpiId": 4,
//         "kpiName": "主机.可用内存",
//         "kpiRealName": "可用内存",
//         "mogrpId": 1,
//         "kpiDesc": "",
//         "kpiCategory": "PI",
//         "kpiType": 2,
//         "kpiUnit": "MB",
//         "kpiAlgorithm": "采集",
//         "dimensionId": 7,
//         "priority": 1,
//         "kpiTablefield": "RamUsed",
//         "mogrpCnname": "主机",
//         "mogrpEnname": "HOST",
//         "version": "1.0",
//         "maxValue": "0",
//         "minValue": "131072",
//         "state": 1
//       }
//     ]
// }
// // 对象实例阈值
// let moInstKpiThresholds = {
//     "code": 1,
//     "data": [
//       {
//         "thresholdId": 1,
//         "kpiId": 4,
//         "criticalThresholdOperator": ">",
//         "criticalThresholdValue": "40",
//         "majorThresholdOperator": ">",
//         "majorThresholdValue": "30",
//         "minorThresholdOperator": ">",
//         "minorThresholdValue": "20",
//         "normalThresholdOperator": ">",
//         "normalThresholdValue": "-1",
//         "state": 1
//       }
//     ]
// }
// // 指标数据
// let kpidate = {
//     "headers": [
//       "EVENT_TIMESTAMP",
//       "T_HOST",
//       "4"
//     ],
//     "values": [
//       [
//         1514977200000,
//         "D03-hpeDL380-COMP04",
//         13072
//       ]
//     ],
//     "status": "OK",
//     "nbVals": 1,
//     "timeColumn": "EVENT_TIMESTAMP",
//     "statusInfo": "",
//     "offset": 0,
//     "totalCount": 1
//   }

class Current extends React.Component<any, any> {
    instrumentPanel_1: any
    constructor(props) {
        super(props);
        this.state = {
            showOne: true
        };
    }
    tabClick() {

    }
    // componentDidMount() {
    //     let data = getKpiData(moTypeKpis, moInstKpiThresholds, kpidate)
    //     console.log('=========>', data)
    // }
    printInstrumentPane() {
        this.instrumentPanel_1.chartExport()
    }
    hideOne() {
        this.setState({
            showOne: false
        })
    }
    componentDidMount() {
        // console.log('moTypeKpis', this.props.moTypeKpis);
        // console.log('moInstKpiThresholds', this.props.moInstKpiThresholds);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.moTypeKpis && nextProps.moInstKpiThresholds) {

        }
    }
    render() {
        // console.log('current');
        return (
            <Row gutter={20} style={{ padding: '0 20px' }} className={styles.current}>
                <InstrumentCard data={{
                    title: '速度',
                    min: 0,
                    max: 100,
                    current: 65,
                    gradient: false,
                    unit: '$'
                }} />
                <InstrumentCard data={{
                    title: '温度表1',
                    min: 0,
                    max: 100,
                    current: 45,
                    gradient: true
                }} />
                <InstrumentCard data={{
                    title: '效率表2',
                    min: 0,
                    max: 200,
                    current: 65,
                    gradient: false,
                    unit: '℃'
                }} />

                {/*<Col className="gutter-row" span={12}>
                    <div className="gutter-box">当前状态</div>
                </Col>*/}

            </Row>
        )
    }
}

export default Current;