const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';
import Home from '../views/home'

function mapProps(state) {
  return {
    config: state.commonReducer.config,
  }
}
function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapProps, mapDispatchToProps)(Home)