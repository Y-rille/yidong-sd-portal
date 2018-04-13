const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'

import Dashboard from '../views/dashboard'

function mapProps(state) {
    return {
        config: state.commonReducer.config,
        name: state.resourceReducer.name,
        tree: state.commonReducer.tree,
        overviewVIM: state.resourceReducer.overviewVIM,
        overviewPIM: state.resourceReducer.overviewPIM,
        // objData: state.resourceReducer.objData
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Dashboard)