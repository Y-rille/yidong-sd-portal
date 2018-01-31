import ActionTypes from '../constants/actionTypes'

const merge = require('lodash/merge')

class SettingState {
    name: string;
    config: Object;
    timeFilter: Array<Object>
    nfvdPm: Object
    moInstKpiThresholds: Object

    // TODO: 所以维度 dimensions 以及维度对应的指标 fact

    constructor() {
        this.name = 'SETTING'
        this.config = {}
        this.timeFilter = null
        this.nfvdPm = null
        this.moInstKpiThresholds = null
    }
}

let settingReducer = (state = new SettingState(), action = null) => {
    switch (action.type) {
        case ActionTypes.SETTING_SAY_HELLO:
            return merge({}, state, action)
        default:
            return state
    }
}

export {
    SettingState,
    settingReducer
}