const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'

import Current from '../views/current'

function mapProps(state) {
    return {
        name: state.performanceReducer.name,
        config: state.performanceReducer.config,
        moTypeKpis: state.performanceReducer.moTypeKpis
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Current)