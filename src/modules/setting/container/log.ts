const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'
import Log from '../views/log'

function mapProps(state) {
    return {
        name: state.settingReducer.name,
        config: state.settingReducer.config,
        tree: state.commonReducer.tree,
        logList: state.settingReducer.logList
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Log)