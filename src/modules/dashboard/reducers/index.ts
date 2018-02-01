import ActionTypes from '../constants/actionTypes'
import * as SI from 'seamless-immutable';

const DashboardState = SI.from({
    name: 'DASHBOARD',
    config: {}
});

let dashboardReducer = (state = DashboardState, action = null) => {
    switch (action.type) {
        case ActionTypes.DASHBOARD_SAY_HELLO:
            return state.merge(action, { deep: true })
        default:
            return state
    }
}

export {
    DashboardState,
    dashboardReducer
}