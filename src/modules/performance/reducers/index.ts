import ActionTypes from '../constants/actionTypes'
import * as SI from 'seamless-immutable';

const merge = require('lodash/merge')

const PerformanceState = SI.from({
    name: 'PERFORMANCE',
    config: {},
    timeFilter: null,
    nfvdPm: null,
    moInstKpiThresholds: null,
    moTypeKpis: null,
});

let performanceReducer = (state = PerformanceState, action = null) => {
    switch (action.type) {
        case ActionTypes.PERFORMANCE_SAY_HELLO:
            return state.merge(action, { deep: true });
        case ActionTypes.PERFORMANCE_GET_TIME_FILTER:
            return state.merge(action);
        default:
            return state
    }
}

export {
    PerformanceState,
    performanceReducer
}