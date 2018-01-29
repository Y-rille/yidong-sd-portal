import ActionTypes from '../constants/actionTypes'

const merge = require('lodash/merge')

class PerformanceState {
    name: string;
    config: Object;
    timeFilter: Array<Object>
    constructor() {
        this.name = 'PERFORMANCE'
        this.config = {}
        this.timeFilter = null
    }
}

let performanceReducer = (state = new PerformanceState(), action = null) => {
    switch (action.type) {
        case ActionTypes.PERFORMANCE_SAY_HELLO:
            return merge({}, state, action)
        case ActionTypes.PERFORMANCE_GET_TIME_FILTER:
            return merge({}, state, action)
        default:
            return state
    }
}

export {
    PerformanceState,
    performanceReducer
}