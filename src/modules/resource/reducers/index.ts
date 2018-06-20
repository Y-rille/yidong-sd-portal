import ActionTypes from '../constants/actionTypes'
import * as SI from 'seamless-immutable';

const ResourceState = SI.from({
    name: 'RESOURCE',
    resourceTree: null,
    list: null,
    subDataInfoAZ: null,
    subDataInfoHA: null,
    subDataAZ: null,
    subDataHA: null,
    subDataRegion: null,
    subDataHost: null,
    subDataProject: null,
    subDataCenter: null,
    subDataVendor: null,
    subDataPIM: null,
    subDataSwitchType: null,
    objAttributes: null,
    objData: null,
    nodeInfo: null,
    findData: null,
    summary: null,
    power: null,
    overviewVIM: null,
    overviewPIM: null,
    syslog: null,
    dictOptions: null
});

let resourceReducer = (state = ResourceState, action = null) => {
    switch (action.type) {
        case ActionTypes.RESOURCE_SAY_HELLO:
            return state.merge(action, { deep: true })
        case ActionTypes.RESOURCE_DELETE:
            return state.setIn(['list', 'dataList'], state.getIn(['list', 'dataList']).filter(o => o.id !== parseInt(action.id, 0)));
        default:
            return state
    }
}

export {
    ResourceState,
    resourceReducer
}