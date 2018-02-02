import ActionTypes from '../constants/actionTypes'
import * as SI from 'seamless-immutable';

import * as _ from 'lodash';

const SettingState = SI.from({
    name: 'RESOURCE',
    config: {},
    userList: null,
    logList: null
});

let settingReducer = (state = SettingState, action = null) => {
    switch (action.type) {
        case ActionTypes.SETTING_SAY_HELLO:
            return state.merge(action, { deep: true })
        case ActionTypes.SETTING_DELETE_USER:
            return state.setIn(['userList', 'rows'], _.values(SI.without(_.keyBy(state.userList.rows, 'id'), action.id)), { ddep: true });
        default:
            return state
    }
}

export {
    SettingState,
    settingReducer
}