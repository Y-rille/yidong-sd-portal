
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import Host from '../../views/vim/host'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        subDataRegion: state.resourceReducer.subDataRegion,
        subDataAZ: state.resourceReducer.subDataAZ,
        subDataHA: state.resourceReducer.subDataHA,
        nodeInfo: state.resourceReducer.nodeInfo,
        list: state.resourceReducer.list

    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Host)