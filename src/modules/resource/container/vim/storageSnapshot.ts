const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import StorageSnapshot from '../../views/vim/storageSnapshot'

function mapProps(state) {
    return {
        config: state.commonReducer.config,
        name: state.resourceReducer.name,
        subDataProject: state.resourceReducer.subDataProject,
        nodeInfo: state.resourceReducer.nodeInfo,
        list: state.resourceReducer.list
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(StorageSnapshot)