
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import VirtualPortInfo from '../../views/vim/virtualPortInfo'

function mapProps(state) {
    return {
        nodeInfo: state.resourceReducer.nodeInfo,
        summary: state.resourceReducer.summary,
        list: state.resourceReducer.list,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(VirtualPortInfo)