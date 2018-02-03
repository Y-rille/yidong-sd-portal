// tslint:disable
import { assert } from 'chai';
import configureStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk';
import { getList, getUserInfo, createUser, editUser, deleteUser, editUserPassword } from '../user'
const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares)

declare const sinon;

describe('user actions', () => {
    // it('assert get userList data', (done) => {
    //     const store = mockStore({});
    //     store.dispatch(getList(null, null)).then(() => {
    //         const actions = store.getActions()
    //         assert.isNotNull(actions[0].userList)
    //         done()
    //     })
    // })
    // it('assert create user', (done) => {
    //     const store = mockStore({});
    //     store.dispatch(createUser({
    //         email: "admin11@163.com",
    //         name: "admin",
    //         password: "111111",
    //         mobile: "13211111111",
    //         avatar: "http://url",
    //         remark: "some remark",
    //         roles: "admin"
    //     }, null)).then(() => {
    //         const actions = store.getActions()
    //         assert.isNotNull(actions[0].userList)
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
    //     store.dispatch(editUser(10000008, {
    //         email: "admin1000008@163.com",
    //         name: "admin",
    //         mobile: "13211111111",
    //         avatar: "http://url",
    //         remark: "some remark",
    //         roles: "admin"
    //     }, null)).then(() => {
    //         const actions = store.getActions()
    //         assert.isNotNull(actions[0].userList)
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
    //     store.dispatch(editUserPassword(10000002, {password:'111111'}, null)).then(() => {
    //         const actions = store.getActions()
    //         assert.isNotNull(actions[0].id)
    //         done()
    //     })
    // })
})