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
import deepPick from '../utils/deepPick'
import getKpiData from '../utils/getKpiData'
import moment from '../../../common/moment'

// let testdadadadata = [
//     {
//         "nodelabel": "厂家资源树",
//         "nodeId": "1",
//         "nodeName": "verdorRes",
//         "lablePath": "厂家资源树",
//         "dataType": 0,
//         "children": [
//             {
//                 "nodelabel": "主机",
//                 "nodeId": "2",
//                 "nodeName": "HOST",
//                 "lablePath": "厂家资源树/主机",
//                 "dataType": 1,
//                 "queryUri": "/datashare-svr/api/moinst/1/querydata",
//                 "queryMethod": "POST",
//                 "children": [
//                     {
//                         "nodelabel": "华为",
//                         "nodeId": "3",
//                         "nodeName": "VENDOR",
//                         "lablePath": "厂家资源树/主机/华为",
//                         "dataType": 1,
//                         "queryParams": {
//                             "VENDOR": "华为"
//                         },
//                         "queryUri": "/datashare-svr/api/moinst/1/querydata",
//                         "queryMethod": "POST",
//                         "children": [
//                             {
//                                 "nodelabel": "D04-hpeDL380-COMP09",
//                                 "nodeId": "4",
//                                 "nodeName": "D04-hpeDL380-COMP09",
//                                 "lablePath": "厂家资源树/主机/华为/D04-hpeDL380-COMP09",
//                                 "dataType": 2,
//                                 "bizFields": {
//                                     "moTypeId": "1",
//                                     "moDimensionId": "T_HOST",
//                                     "moInstId": "4",
//                                     "moTypeEnName": "HOST"
//                                 },
//                                 "queryUri": "/datashare-svr/api/moinst/1/4",
//                                 "queryMethod": "GET"
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "nodelabel": "主机",
//                 "nodeId": "5",
//                 "nodeName": "HOST",
//                 "lablePath": "厂家资源树/主机",
//                 "dataType": 1,
//                 "queryUri": "/datashare-svr/api/moinst/1/querydata",
//                 "queryMethod": "POST",
//                 "children": [
//                     {
//                         "nodelabel": "华为",
//                         "nodeId": "6",
//                         "nodeName": "VENDOR",
//                         "lablePath": "厂家资源树/主机/华为",
//                         "dataType": 1,
//                         "queryParams": {
//                             "VENDOR": "华为"
//                         },
//                         "queryUri": "/datashare-svr/api/moinst/1/querydata",
//                         "queryMethod": "POST",
//                         "children": [
//                             {
//                                 "nodelabel": "D04-hpeDL380-COMP09",
//                                 "nodeId": "7",
//                                 "nodeName": "D04-hpeDL380-COMP09",
//                                 "lablePath": "厂家资源树/主机/华为/D04-hpeDL380-COMP09",
//                                 "dataType": 2,
//                                 "bizFields": {
//                                     "moTypeId": "1",
//                                     "moDimensionId": "T_HOST",
//                                     "moInstId": "4",
//                                     "moTypeEnName": "HOST"
//                                 },
//                                 "queryUri": "/datashare-svr/api/moinst/1/4",
//                                 "queryMethod": "GET"
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     }
// ]

class Current extends React.Component<any, any> {
    instrumentPanel_1: any
    constructor(props) {
        super(props);
        this.state = {
            showOne: true,
            facts: ''
        };
    }
    tabClick() {

    }
    printInstrumentPane() {
        this.instrumentPanel_1.chartExport()
    }
    hideOne() {
        this.setState({
            showOne: false
        })
    }
    componentWillMount() {
        let moTypeKpis = this.props.moTypeKpis
        if (moTypeKpis) {
            let facts = []
            for (let i = 0; i < 4; i++) {
                if (moTypeKpis[i]) {
                    facts.push(moTypeKpis[i].kpiId)
                }
            }
            var str_facts = facts.join(',')
            this.setState({facts: str_facts})
            this.getData(str_facts)
        }

    }
    getData(facts, begintime = moment().tz('Asia/Shanghai').subtract(15, 'minutes').format(), endtime = moment().tz('Asia/Shanghai'), timeFilter = null) {
        let DataParams = {
            facts: facts,
            begintime,
            endtime,
            // wheredim,
        }
        this.props.actions.getData('value_pack_vim', DataParams)
    }
    componentDidMount() {
        // let f = deepPick('5', testdadadadata)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.kpis && nextProps.kpis !== this.props.kpis ) {
            this.getData(nextProps.kpis)
        }
    }
    render() {
            let moInstKpiThresholds = this.props.moInstKpiThresholds
            let moTypeKpis = this.props.moTypeKpis
            let kpidata = this.props.kpidata
            if (moInstKpiThresholds && moTypeKpis && kpidata) {
                let result = getKpiData(moTypeKpis, moInstKpiThresholds, kpidata, this.state.facts)
            }
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