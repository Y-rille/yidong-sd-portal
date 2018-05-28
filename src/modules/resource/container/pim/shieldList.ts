const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import ShieldList from '../../views/pim/shieldList'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        nodeInfo: state.resourceReducer.nodeInfo,
        subDataVendor: state.resourceReducer.subDataVendor,
        list: state.resourceReducer.list,
        subDataCenter: state.resourceReducer.subDataCenter,

    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(ShieldList)