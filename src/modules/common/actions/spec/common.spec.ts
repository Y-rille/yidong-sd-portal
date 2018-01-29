// tslint:disable
import { assert } from 'chai';
import configureStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk';
import { querytree } from '../common'
import actionTypes from '../../constants/actionTypes'
const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares)

declare const sinon;

describe('Common actions', () => {
  it('assert get common tree data', (done) => {
    const store = mockStore({});
    store.dispatch(querytree(0, null)).then(() => {
      const actions = store.getActions()
      assert.isNotNull(actions[0].tree)
      done()
    })
  })
})