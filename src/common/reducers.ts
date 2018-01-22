import { combineReducers } from 'redux'

import { commonReducer } from '../modules/common/reducers/index'

export default function createReducer(asyncReducers = null) {
    return combineReducers({ commonReducer, ...asyncReducers });
}
