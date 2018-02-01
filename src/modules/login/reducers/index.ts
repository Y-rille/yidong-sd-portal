import ActionTypes from '../constants/actionTypes'
import * as SI from 'seamless-immutable';

const LoginState = SI.from({
    name: 'LOGIN',
    config: {}
});

let loginReducer = (state = LoginState, action = null) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SAY_HELLO:
            return state.merge(action, { deep: true })
        default:
            return state
    }
}

export {
    LoginState,
    loginReducer
}