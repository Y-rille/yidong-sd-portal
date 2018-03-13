
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import Magnetic from '../../views/pim/magnetic'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        config: state.resourceReducer.config,
        nodeInfo: state.resourceReducer.nodeInfo,
        list: state.resourceReducer.list,
        subDataCenter: state.resourceReducer.subDataCenter,
        subDataVendor: state.resourceReducer.subDataVendor,
        subDataPIM: state.resourceReducer.subDataPIM,
        findData: state.resourceReducer.findData
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Magnetic)