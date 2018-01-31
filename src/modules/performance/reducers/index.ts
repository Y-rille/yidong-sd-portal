import ActionTypes from '../constants/actionTypes'

const merge = require('lodash/merge')

class PerformanceState {
    name: string;
    config: Object;
    timeFilter: Array<Object>
    nfvdPm: Object
    moInstKpiThresholds: Object
    moTypeKpis: Array<Object>

    demo: string

    // TODO: 所以维度 dimensions 以及维度对应的指标 fact

    constructor() {
        this.name = 'PERFORMANCE'
        this.config = {}
        this.timeFilter = null
        this.nfvdPm = null
        this.moInstKpiThresholds = null
        this.moTypeKpis = null
        this.demo = null
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