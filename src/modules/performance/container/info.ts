const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'

import Info from '../views/info'

function mapProps(state) {
  return {
    name: state.performanceReducer.name,
    config: state.performanceReducer.config,
    moTypeKpis: state.performanceReducer.moTypeKpis,
    moInstKpiThresholds: state.performanceReducer.moInstKpiThresholds,
    tree: state.commonReducer.tree,
    timeFilter: state.performanceReducer.timeFilter
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
  }
}

export default connect(mapProps, mapDispatchToProps)(Info)