
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import ServerInfo from '../../views/pim/serverInfo'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        nodeInfo: state.resourceReducer.nodeInfo,
        list: state.resourceReducer.list,
        objData: state.resourceReducer.objData,
        objAttributes: state.resourceReducer.objAttributes,
        summary: state.resourceReducer.summary,
        power: state.resourceReducer.power,
        config: state.commonReducer.config,
        dictOptions: state.resourceReducer.dictOptions,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(ServerInfo)