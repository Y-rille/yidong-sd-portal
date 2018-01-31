// tslint:disable
import { assert } from 'chai';
import configureStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk';
// import { getTimeFilter, getPackages, getMoInstKpiThresholds } from '../kpi'
const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares)

declare const sinon;

