import ActionTypes from '../constants/actionTypes'

const merge = require('lodash/merge')

class DemoState {
    name: string;
    config: Object
    constructor() {
        this.name = 'DEMO'
        this.config = {}
    }
}

let demoReducer = (state = new DemoState(), action = null) => {
    switch (action.type) {
        case ActionTypes.DEMO_SAY_HELLO:
            return merge({}, state, action)
        default:
            return state
    }
}

export {
    DemoState,
    demoReducer
}