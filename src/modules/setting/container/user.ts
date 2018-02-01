const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'
import User from '../views/user'
function mapProps(state) {
    return {
        name: state.settingReducer.name,
        config: state.settingReducer.config,
        userList: state.settingReducer.userList
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(User)