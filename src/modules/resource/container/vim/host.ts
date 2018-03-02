
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import Host from '../../views/vim/host'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        subDataRegion: state.resourceReducer.subDataRegion,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(Host)