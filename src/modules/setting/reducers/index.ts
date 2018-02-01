import ActionTypes from '../constants/actionTypes'
import * as SI from 'seamless-immutable';

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
        default:
            return state
    }
}

export {
    SettingState,
    settingReducer
}