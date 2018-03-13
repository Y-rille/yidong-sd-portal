
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import Switchboard from '../../views/pim/switchboard'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        config: state.resourceReducer.config,
        nodeInfo: state.resourceReducer.nodeInfo,
        subDataCenter: state.resourceReducer.subDataCenter,
        list: state.resourceReducer.list,
        subDataPIM: state.resourceReducer.subDataPIM,
        subDataSwitchType: state.resourceReducer.subDataSwitchType,
        subDataVendor: state.resourceReducer.subDataVendor,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Switchboard)