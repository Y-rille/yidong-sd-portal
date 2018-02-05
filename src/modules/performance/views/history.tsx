import * as React from 'react';
import * as _ from 'lodash';
import {
    HashRouter as Router,
    Switch,
    Route, Link
} from 'react-router-dom'
import { Row, Col, Spin } from 'antd';

import styles from '../style/index.less'
import TimeSelect from '../../../components/TimeSelect/';
import LineChartCard from '../../../components/LineChartCard/'
import moment from '../../../common/moment'
import getKpiData from '../utils/getKpiData'

const packageId = 'value_pack_vim'
class History extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            begintime: moment().tz('Asia/Shanghai').subtract(1, 'days').valueOf(),
            endtime: moment().tz('Asia/Shanghai').valueOf(),
            timeFilter: 5,
            result: []
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

    getData(facts, begintime = moment().tz('Asia/Shanghai').subtract(1, 'days').valueOf(), endtime = moment().tz('Asia/Shanghai').valueOf(), timeFilter = this.state.timeFilter) {
        let nodeInfo = this.props.nodeInfo
        let wheredim = `${nodeInfo.bizFields.moDimensionId},eq,${nodeInfo.nodeName}`
        let DataParams = {
            facts: facts,
            begintime,
            endtime,
            wheredim,
            timeFilter
        }
        let moInstKpiThresholds = this.props.moInstKpiThresholds
        let moTypeKpis = this.props.moTypeKpis
        // let kpidata = this.props.kpidata
        let self = this
        this.props.actions.getData(packageId, DataParams, function (kpidata) {
            self.setState({
                result: getKpiData(moTypeKpis, moInstKpiThresholds, kpidata, self.props.kpis)
            })
        })
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
    deleteCard(kpiId) {
        this.props.deleteCard(kpiId)
    }
    render() {
        let moInstKpiThresholds = this.props.moInstKpiThresholds
        let moTypeKpis = this.props.moTypeKpis
        let kpidata = this.props.kpidata

        // if (moInstKpiThresholds && moTypeKpis && kpidata && this.props.nodeInfo) {
        //     let result = getKpiData(moTypeKpis, moInstKpiThresholds, kpidata, this.props.kpis)
        //     return (
        //         <div>
        //             <div className={styles.toolBar} style={{ backgroundColor: '#FFF' }}>
        //                 <TimeSelect timeFilter={this.props.timeFilter} defaultValue={[this.state.begintime, this.state.endtime, this.state.timeFilter]} inquire={this.inquire.bind(this)} />
        //             </div>
        //             <Row gutter={20} style={{ padding: '0 20px 10px', marginTop: '-10px' }}>
        //                 {
        //                     result.map((item, index) => {
        //                         return (
        //                             <LineChartCard key={index} data={item} deleteCard={this.deleteCard.bind(this)} hideFacts={this.props.hideFacts} />
        //                         )
        //                     })
        //                 }
        //             </Row>
        //         </div>
        //     );
        // } else {
        //     return <Spin />
        // }
        return (
            <Row gutter={20} style={{ padding: '0 20px 10px', marginTop: '-10px' }} className={styles.current}>
                {this.state.result.map((item, index) => {
                    return (
                        <LineChartCard deleteCard={this.deleteCard.bind(this)} key={item.kpiId} data={item} hideFacts={this.props.hideFacts} />
                    )
                })}
            </Row>
        )

    }
}

export default History;