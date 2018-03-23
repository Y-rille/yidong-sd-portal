const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import Server from '../../views/pim/server'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        nodeInfo: state.resourceReducer.nodeInfo,
        subDataVendor: state.resourceReducer.subDataVendor,
        list: state.resourceReducer.list,
        subDataCenter: state.resourceReducer.subDataCenter,
        subDataPIM: state.resourceReducer.subDataPIM,
        findData: state.resourceReducer.findData,
        syslog: state.resourceReducer.syslog
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Server)