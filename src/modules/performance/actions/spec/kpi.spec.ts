// tslint:disable
import { assert } from 'chai';
import configureStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk';
import { getTimeFilter } from '../kpi'
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
})