
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import VirtualInfo from '../../views/vim/virtualInfo'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        config: state.commonReducer.config,
        nodeInfo: state.resourceReducer.nodeInfo,
        objData: state.resourceReducer.objData,
        objAttributes: state.resourceReducer.objAttributes,
        dictOptions: state.resourceReducer.dictOptions,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(VirtualInfo)