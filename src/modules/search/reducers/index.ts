import ActionTypes from '../constants/actionTypes'
import * as SI from 'seamless-immutable';

const SearchState = SI.from({
    name: 'SEARCH',
    list: null,
    config: {}
});

let searchReducer = (state = SearchState, action = null) => {
    switch (action.type) {
        case ActionTypes.SEARCH_SAY_HELLO:
            return state.merge(action, { deep: true })
        default:
            return state
    }
}

export {
    SearchState,
    searchReducer
}