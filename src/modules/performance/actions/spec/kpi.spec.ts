// tslint:disable
import { assert } from 'chai';
import configureStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk';
import { getTimeFilter, getPackages, getMoInstKpiThresholds } from '../kpi'
const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares)

declare const sinon;

describe('Kpi actions', () => {
    it('assert get timeFilter data', (done) => {
        const store = mockStore({});
        store.dispatch(getTimeFilter(null)).then(() => {
        const actions = store.getActions()
        assert.isNotNull(actions[0].timeFilter)
        done()
    })
    })
    it('assert get packages data', (done) => {
        const store = mockStore({});
        store.dispatch(getPackages(null)).then(() => {
        const actions = store.getActions()
        assert.isNotNull(actions[0].nfvdPm)
        done()
    })
    })
    it('assert get getMoInstKpiThresholds data', (done) => {
        const store = mockStore({});
        store.dispatch(getMoInstKpiThresholds(1,1,null)).then(() => {
        const actions = store.getActions()
        assert.isNotNull(actions[0].moInstKpiThresholds)
        done()
    })
    })    
})