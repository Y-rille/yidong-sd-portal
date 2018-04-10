const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../actions/index'
import ResourceActionCreatorsMap from '../../resource/actions/index'

import Home from '../views/home'

function mapProps(state) {
    return {
        name: state.searchReducer.name,
        config: state.searchReducer.config,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
        resourceActions: bindActionCreators(ResourceActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Home)