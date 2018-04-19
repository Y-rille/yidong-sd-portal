const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'

import Topo from '../views/topo'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        resourceTree: state.resourceReducer.resourceTree,
        nodeInfo: state.resourceReducer.nodeInfo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Topo)