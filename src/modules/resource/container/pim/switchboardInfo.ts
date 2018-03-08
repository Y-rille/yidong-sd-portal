
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import SwitchboardInfo from '../../views/pim/switchboardInfo'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        config: state.resourceReducer.config,
        nodeInfo: state.resourceReducer.nodeInfo,
<<<<<<< HEAD
        list: state.resourceReducer.list,
=======
        objData: state.resourceReducer.objData,
        objAttributes: state.resourceReducer.objAttributes,
>>>>>>> 41273f72926030dbbe6a40ee674bface64bff31d
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(SwitchboardInfo)