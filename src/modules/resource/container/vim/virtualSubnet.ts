
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import VirtualSubnet from '../../views/vim/virtualSubnet'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        config: state.commonReducer.config,
        nodeInfo: state.resourceReducer.nodeInfo,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(VirtualSubnet)