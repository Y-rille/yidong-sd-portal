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
    demo: [{ a: 'b', d: ['1', '2'] }, { c: 'd' }, { e: 'f' }],
});

// class PerformanceState {
//     name: string;
//     config: Object;
//     timeFilter: Array<Object>
//     nfvdPm: Object
//     moInstKpiThresholds: Object
//     moTypeKpis: Array<Object>

//     demo: Array<Object>

//     // TODO: 所以维度 dimensions 以及维度对应的指标 fact

//     constructor() {
//         this.name = 'PERFORMANCE'
//         this.config = {}
//         this.timeFilter = null
//         this.nfvdPm = null
//         this.moInstKpiThresholds = null
//         this.moTypeKpis = null
//         this.demo = [{ a: 'b', d: ['1', '2'] }, { c: 'd' }, { e: 'f' }]
//     }
// }

let performanceReducer = (state = PerformanceState, action = null) => {
    switch (action.type) {
        case ActionTypes.PERFORMANCE_SAY_HELLO:
            return state.merge(action);
        // return merge({}, state, action)
        case ActionTypes.PERFORMANCE_GET_TIME_FILTER:
            return state.merge(action);
        // return merge({}, state, action)
        default:
            return state
    }
}

export {
    PerformanceState,
    performanceReducer
}