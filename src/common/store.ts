import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { createStore, applyMiddleware } from 'redux';
import createReducer from './reducers'

const middlewares: any = [thunk];

if (process.env.NODE_ENV === 'dev') {
    middlewares.push(logger);
}

export default function configureStore() {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    let store: any = createStoreWithMiddleware(createReducer());
    store.asyncReducers = {};
    return store;
}

export function injectAsyncReducer(store: any, name: string, asyncReducer: any) {
    store.asyncReducers[name] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
}