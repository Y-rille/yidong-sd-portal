
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import StorageVolumeInfo from '../../views/vim/storageVolumeInfo'

function mapProps(state) {
    return {
        config: state.commonReducer.config,
        name: state.resourceReducer.name,
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

export default connect(mapProps, mapDispatchToProps)(StorageVolumeInfo)