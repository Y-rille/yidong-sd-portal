
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import Virtual from '../../views/vim/virtual'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        subDataRegion: state.resourceReducer.subDataRegion,
        subDataAZ: state.resourceReducer.subDataAZ,
        subDataHA: state.resourceReducer.subDataHA,
        subDataHost: state.resourceReducer.subDataHost,
        nodeInfo: state.resourceReducer.nodeInfo,
        list: state.resourceReducer.list
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Virtual)