
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import Ha from '../../views/vim/ha'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        subDataRegion: state.resourceReducer.subDataRegion,
        list: state.resourceReducer.list,
        nodeInfo: state.resourceReducer.nodeInfo,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Ha)