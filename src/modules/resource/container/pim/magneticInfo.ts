
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import MagneticInfo from '../../views/pim/magneticInfo'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        nodeInfo: state.resourceReducer.nodeInfo,
        objData: state.resourceReducer.objData,
        objAttributes: state.resourceReducer.objAttributes,
        summary: state.resourceReducer.summary,
        list: state.resourceReducer.list,
        syslog: state.resourceReducer.syslog,
        config: state.commonReducer.config,
        dictOptions: state.resourceReducer.dictOptions,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(MagneticInfo)