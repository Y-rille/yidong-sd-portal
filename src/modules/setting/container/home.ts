const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'

import Home from '../views/home'

function mapProps(state) {
    return {
        name: state.performanceReducer.name,
        config: state.performanceReducer.config,
        tree: state.commonReducer.tree
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Home)