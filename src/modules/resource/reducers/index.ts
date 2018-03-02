import ActionTypes from '../constants/actionTypes'
import * as SI from 'seamless-immutable';

const ResourceState = SI.from({
    name: 'RESOURCE',
    resourceTree: null,
    config: {}
});

let resourceReducer = (state = ResourceState, action = null) => {
    switch (action.type) {
        case ActionTypes.RESOURCE_SAY_HELLO:
            return state.merge(action, { deep: true })
        default:
            return state
    }
}

export {
    ResourceState,
    resourceReducer
}