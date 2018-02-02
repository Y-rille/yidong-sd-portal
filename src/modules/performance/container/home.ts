const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'

import Home from '../views/home'

function mapProps(state) {
    return {
        name: state.performanceReducer.name,
        moTypeKpis: state.performanceReducer.moTypeKpis,
        config: state.performanceReducer.config,
        moInstKpiThresholds: state.performanceReducer.moInstKpiThresholds,
        tree: state.commonReducer.tree,
        nodeInfo: state.performanceReducer.nodeInfo,
        timeFilter: state.performanceReducer.timeFilter
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Home)