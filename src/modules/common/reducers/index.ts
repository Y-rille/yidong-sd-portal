import ActionTypes from '../constants/actionTypes';
import * as _ from 'lodash';
import store from 'superstore-sync'

class CommonState {
    name: string;
    collapsed: boolean;
    fetchingNotices: boolean;
    notices: Object;
    locale: string;
    currentUser: Object;
    translations: Object;

    constructor() {
        this.name = 'common'
        this.currentUser = null
    }
}

let commonReducer = (state = new CommonState(), action = null) => {
    switch (action.type) {
        case ActionTypes.COMMON_SAY_HELLO:
            return _.merge({}, state, action)
        default:
            return state
    }
}

export {
    CommonState,
    commonReducer
}