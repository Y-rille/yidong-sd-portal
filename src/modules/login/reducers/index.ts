import ActionTypes from '../constants/actionTypes'

const merge = require('lodash/merge')

class LoginState {
    name: string;
    config: Object
    constructor() {
        this.name = 'LOGIN'
        this.config = {}
    }
}

let loginReducer = (state = new LoginState(), action = null) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SAY_HELLO:
            return merge({}, state, action)
        default:
            return state
    }
}

export {
    LoginState,
    loginReducer
}