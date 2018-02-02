const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'

import History from '../views/history'
import { start } from 'repl';

function mapProps(state) {
    return {
        name: state.performanceReducer.name,
        config: state.performanceReducer.config,
        kpidata: state.performanceReducer.kpidata,
        moTypeKpis: state.performanceReducer.moTypeKpis,
        moInstKpiThresholds: state.performanceReducer.moInstKpiThresholds,
        nodeInfo: state.performanceReducer.nodeInfo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(History)