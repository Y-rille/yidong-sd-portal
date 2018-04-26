
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import VirtualRouter from '../../views/vim/virtualRouter'

function mapProps(state) {
    return {
        config: state.commonReducer.config,
        name: state.resourceReducer.name,
        nodeInfo: state.resourceReducer.nodeInfo,
        subDataProject: state.resourceReducer.subDataProject,
        list: state.resourceReducer.list
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(VirtualRouter)