// tslint:disable
import { assert } from 'chai';
import configureStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk';
import { getList, getUserInfo, createUser, editUser, deleteUser, editUserPassword } from '../user'
import { login } from '../../../common/actions/user'
import { getLogList } from '../log'
const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares)

declare const sinon;

describe('user actions', () => {
    // it('assert get userList data', (done) => {
    //     const store = mockStore({});
    //     store.dispatch(getList({
    //         page_num: 3,
    //         page_size: 2
    //     }, null)).then(() => {
    //         const actions = store.getActions()
    //         assert.isNotNull(actions[0].userList)
    //         done()
    //     })
    // })
    // it('assert create user', (done) => {
    //     const store = mockStore({});
    //     store.dispatch(createUser({
    //         email: "test@hp.com",
    //         name: "admin",
    //         password: "111111",
    //         mobile: "13211111111",
    //         avatar: "http://url",
    //         remark: "some remark",
    //         roles: "admin"
    //     }, null)).then(() => {
    //         const actions = store.getActions()
    //         assert.isNotNull(actions[0].user)
    //         done()
    //     })
    // })
    // it('assert get userInfo data', (done) => {
    //     const store = mockStore({});
    //     store.dispatch(getUserInfo(10000001, null)).then(() => {
    //         const actions = store.getActions()
    //         assert.isNotNull(actions[0].userInfo)
    //         done()
    //     })
    // })
    // it('assert edit user', (done) => {
    //     const store = mockStore({});
    //     store.dispatch(editUser(10000000, {
    //         email: "zhang.han@hpe.com",
    //         name: "zhanghan666",
    //         mobile: "13211111111",
    //         avatar: "http://url",
    //         remark: "some remark",
    //         roles: "admin,performance"
    //     }, null)).then(() => {
    //         const actions = store.getActions()
    //         assert.isNotNull(actions[0].user)
    //         done()
    //     })
    // })
    // it('assert delete user', (done) => {
    //     const store = mockStore({});
    //     store.dispatch(deleteUser(10000006, null)).then(() => {
    //         const actions = store.getActions()
    //         assert.isNotNull(actions[0].id)
    //         done()
    //     })
    // })
    // it('assert edit password', (done) => {
    //     const store = mockStore({});
    //     store.dispatch(editUserPassword(10000002, { password: '111111' }, null)).then(() => {
    //         const actions = store.getActions()
    //         assert.isNotNull(actions[0].id)
    //         done()
    //     })
    // })
})

describe('log actions', () => {
    // it('assert get logList data', (done) => {
    //     const store = mockStore({});
    //     store.dispatch(getLogList({
    //         page_num: 2,
    //         page_size: 5
    //     }, null)).then(() => {
    //         const actions = store.getActions()
    //         assert.isNotNull(actions[0].logList)
    //         done()
    //     })
    // })
})