
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import Flavor from '../../views/vim/flavor'

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

export default connect(mapProps, mapDispatchToProps)(Flavor)