
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import SwitchboardInfo from '../../views/pim/switchboardInfo'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        config: state.resourceReducer.config,
        nodeInfo: state.resourceReducer.nodeInfo,
        list: state.resourceReducer.list,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(SwitchboardInfo)