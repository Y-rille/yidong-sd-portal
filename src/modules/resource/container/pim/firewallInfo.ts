
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import firewallInfo from '../../views/pim/firewallInfo'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        config: state.resourceReducer.config,
        nodeInfo: state.resourceReducer.nodeInfo,
        list: state.resourceReducer.list,
        objData: state.resourceReducer.objData,
        objAttributes: state.resourceReducer.objAttributes,
        summary: state.resourceReducer.summary,
        syslog: state.resourceReducer.syslog
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(firewallInfo)