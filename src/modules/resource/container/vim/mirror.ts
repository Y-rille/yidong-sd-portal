
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import Mirror from '../../views/vim/mirror'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        config: state.resourceReducer.config,
        subDataProject: state.resourceReducer.subDataProject,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Mirror)