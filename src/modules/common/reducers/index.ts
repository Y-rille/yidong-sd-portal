import ActionTypes from '../constants/actionTypes';
import * as SI from 'seamless-immutable';

const CommonState = SI.from({
    name: 'COMMON',
    currentUser: null,
    tree: null
});

let commonReducer = (state = CommonState, action = null) => {
    switch (action.type) {
        case ActionTypes.COMMON_SAY_HELLO:
            return state.merge(action, { deep: true });
        case ActionTypes.COMMON_GET_QUERYTREE:
            return state.merge(action, { deep: true });
        default:
            return state
    }
}

export {
    CommonState,
    commonReducer
}