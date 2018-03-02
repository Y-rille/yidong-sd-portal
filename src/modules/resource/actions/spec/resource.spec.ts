// tslint:disable
import { assert } from 'chai';
import configureStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk';
import { getMoTree } from '../resource'
const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares)

declare const sinon;

describe('Resource actions', () => {
    it('assert get timeFilter data', (done) => {
        const store = mockStore({});
        store.dispatch(getMoTree(null)).then(() => {
            const actions = store.getActions()
            assert.isNotNull(actions[0].resourceTree)
            done()
        })
    })

})