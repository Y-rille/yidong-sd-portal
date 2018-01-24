import ActionTypes from '../constants/actionTypes'

const merge = require('lodash/merge')

class ResourceState {
    name: string;
    config: Object
    constructor() {
        this.name = 'RESOURCE'
        this.config = {}
    }
}

let resourceReducer = (state = new ResourceState(), action = null) => {
    switch (action.type) {
        case ActionTypes.RESOURCE_SAY_HELLO:
            return merge({}, state, action)
        default:
            return state
    }
}

export {
    ResourceState,
    resourceReducer
}