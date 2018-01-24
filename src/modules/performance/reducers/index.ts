import ActionTypes from '../constants/actionTypes'

const merge = require('lodash/merge')

class PerformanceState {
    name: string;
    config: Object
    constructor() {
        this.name = 'PERFORMANCE'
        this.config = {}
    }
}

let performanceReducer = (state = new PerformanceState(), action = null) => {
    switch (action.type) {
        case ActionTypes.PERFORMANCE_SAY_HELLO:
            return merge({}, state, action)
        default:
            return state
    }
}

export {
    PerformanceState,
    performanceReducer
}