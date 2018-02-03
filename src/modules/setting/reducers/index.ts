import ActionTypes from '../constants/actionTypes'
import * as SI from 'seamless-immutable';

const SettingState = SI.from({
    name: 'RESOURCE',
    config: {},
    userList: null,
    logList: null,
    userInfo: null
});

let settingReducer = (state = SettingState, action = null) => {
    switch (action.type) {
        case ActionTypes.SETTING_SAY_HELLO:
            return state.merge(action, { deep: true })
        case ActionTypes.SETTING_ADD_USER:
            return state.setIn(['userList', 'rows'], state.getIn(['userList', 'rows']).concat([action.user]));
        case ActionTypes.SETTING_EDIT_USER:
            // console.log(state.setIn(['userList', 'rows'], state.getIn(['userList', 'rows']).update(action.user.id, [action.user], )))
            return state.merge(action, { deep: true })
        case ActionTypes.SETTING_DELETE_USER:
            return state.setIn(['userList', 'rows'], state.getIn(['userList', 'rows']).filter(o => o.id !== parseInt(action.id, 0)));
        default:
            return state
    }
}

export {
    SettingState,
    settingReducer
}