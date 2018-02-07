
const { connect } = require('react-redux')
import { bindActionCreators } from 'redux';

import HomeActionCreatorsMap from '../../actions/index'

import VolumeType from '../../views/vim/volumeType'

function mapProps(state) {
    return {
        name: state.resourceReducer.name,
        config: state.resourceReducer.config,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(HomeActionCreatorsMap, dispatch),
    }
}

export default connect(mapProps, mapDispatchToProps)(VolumeType)