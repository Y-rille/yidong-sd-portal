
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import Vim from '../../views/vim/vim'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        subDataAZ: state.resourceReducer.subDataAZ,
        subDataHA: state.resourceReducer.subDataHA,
        subDataRegion: state.resourceReducer.subDataRegion,
        subDataHost: state.resourceReducer.subDataHost,
        subDataProject: state.resourceReducer.subDataProject,

    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Vim)