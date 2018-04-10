const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';
import HomeActionCreatorsMap from '../actions/index'
import Home from '../views/home'

function mapProps(state) {
    return {
        list: state.searchReducer.list,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Home)