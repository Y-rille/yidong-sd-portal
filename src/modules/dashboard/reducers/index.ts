import ActionTypes from '../constants/actionTypes'

const merge = require('lodash/merge')

class DashboardState {
    name: string;
    config: Object
    constructor() {
        this.name = 'DASHBOARD'
        this.config = {}
    }
}

let dashboardReducer = (state = new DashboardState(), action = null) => {
    switch (action.type) {
        case ActionTypes.DASHBOARD_SAY_HELLO:
            return merge({}, state, action)
        default:
            return state
    }
}

export {
    DashboardState,
    dashboardReducer
}