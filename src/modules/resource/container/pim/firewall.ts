
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import Firewall from '../../views/pim/firewall'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        nodeInfo: state.resourceReducer.nodeInfo,
        subDataCenter: state.resourceReducer.subDataCenter,
        subDataVendor: state.resourceReducer.subDataVendor,
        list: state.resourceReducer.list,
        subDataPIM: state.resourceReducer.subDataPIM,
        findData: state.resourceReducer.findData
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Firewall)