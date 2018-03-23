
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import HostInfo from '../../views/vim/hostInfo'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        objData: state.resourceReducer.objData,
        objAttributes: state.resourceReducer.objAttributes,
        list: state.resourceReducer.list,
        nodeInfo: state.resourceReducer.nodeInfo,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(HostInfo)