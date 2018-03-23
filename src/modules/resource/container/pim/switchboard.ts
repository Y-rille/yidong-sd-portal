
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import Switchboard from '../../views/pim/switchboard'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        nodeInfo: state.resourceReducer.nodeInfo,
        subDataCenter: state.resourceReducer.subDataCenter,
        list: state.resourceReducer.list,
        subDataPIM: state.resourceReducer.subDataPIM,
        subDataSwitchType: state.resourceReducer.subDataSwitchType,
        subDataVendor: state.resourceReducer.subDataVendor,
        findData: state.resourceReducer.findData
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Switchboard)