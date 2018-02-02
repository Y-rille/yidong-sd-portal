const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'
import UserEdit from '../views/userEdit'
function mapProps(state) {
    return {
        name: state.settingReducer.name,
        config: state.settingReducer.config,
        userInfo: state.settingReducer.userInfo
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(UserEdit)