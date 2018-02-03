const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'

import Result from '../views/result'

function mapProps(state) {
  return {
    name: state.performanceReducer.name,
    config: state.performanceReducer.config,
    tree: state.commonReducer.tree,
    searchDatas: state.performanceReducer.searchDatas
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
  }
}

export default connect(mapProps, mapDispatchToProps)(Result)