import { assert } from 'chai';
import configureStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk';
import { login, logout, touch } from '../user'
import actionTypes from '../../constants/actionTypes'
const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares)

declare const sinon;

describe('User', () => {
  // before(function () {
  // });
  // after(function () {
  // });
  it('assert login succ', (done) => {
    const store = mockStore({});
    store.dispatch(login({ email: 'zhangsan@163.com', password: '111111' }, null)).then(() => {
      const actions = store.getActions()
      assert.isNotNull(actions[0].currentUser)
      done()
    })
  })
  it('assert touch succ', (done) => {
    const store = mockStore({});
    store.dispatch(touch(null)).then(() => {
      const actions = store.getActions()
      assert.isNotNull(actions[0].currentUser)
      done()
    })
  })
  // it('assert logout succ', (done) => {
  //   const store = mockStore({});
  //   store.dispatch(logout(null)).then(() => {
  //     const actions = store.getActions()
  //     assert.isNull(actions[0].currentUser)
  //     done()
  //   })
  // })
  // it('assert touch return error', (done) => {
  //   const store = mockStore({});
  //   store.dispatch(touch(null)).then(() => {

  //   }).catch((err) => {
  //     done()
  //   })
  // })
});