// tslint:disable
import { assert } from 'chai';
import configureStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk';
import { getList } from '../user'
const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares)

declare const sinon;

describe('user actions', () => {
    it('assert get userList data', (done) => {
        const store = mockStore({});
        store.dispatch(getList(null, null)).then(() => {
            const actions = store.getActions()
            assert.isNotNull(actions[0])
            done()
        })
    })
})