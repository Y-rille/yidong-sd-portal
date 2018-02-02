import * as _ from 'lodash'
import ActionTypes from '../constants/actionTypes'
import UserAPI from '../api/userAPI'
import { CreateUserParams, EditUserParams, EditUserPasswordParams, ListParams } from '../api/userAPI'

/**
 * 用户列表
 * @param cb 
 */
export const getList = (params, cb) => (dispatch) => {
    return UserAPI.getList(params).then((res: any) => {
        let action = { type: ActionTypes.SETTING_SAY_HELLO, userList: res.data }
        dispatch(action);
        if (cb) {
            cb(null)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.SETTING_SAY_HELLO, userList: null }
        dispatch(action);
        if (cb) {
            cb(err)
        }
    })
}

/**
 * 删除用户
 * @param cb 
 */
export const deleteUser = (userId, cb) => (dispatch) => {
    return UserAPI.deleteUser(userId).then((res) => {
        let rows = {}
        rows[userId] = null
        let userList = {
            rows
        }
        let action = { type: ActionTypes.SETTING_SAY_HELLO, userList: userList }
        if (cb) {
            cb(res.data)
        }
        dispatch(action);
    }).catch((err) => {
        let action = { type: ActionTypes.SETTING_SAY_HELLO, userList: {} }
        dispatch(action);
        if (cb) {
            cb(err)
        }
    })
}

/**
 * 获取用户详情
 * @param cb 
 */
export const getUserInfo = (userId, cb) => (dispatch) => {
    return UserAPI.getUserInfo(userId).then((res) => {
        let data = res.data
        let action = { type: ActionTypes.SETTING_SAY_HELLO, userInfo: data }
        dispatch(action);
        if (cb) {
            cb(null, data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.SETTING_SAY_HELLO, userInfo: null }
        dispatch(action);
    })
};

/**
 * 创建用户
 * @param cb 
 */
export const createUser = (params: CreateUserParams, cb) => (dispatch) => {
    return UserAPI.createUser(params).then((res: any) => {
        let data = res.data
        let userList = {
            rows: _.keyBy([data], 'id')
        }
        let action = { type: ActionTypes.SETTING_SAY_HELLO, userList: userList }
        if (cb) {
            cb(userList, null)
        }
        dispatch(action);

    }).catch((err) => {
        let action = { type: ActionTypes.SETTING_SAY_HELLO, userList: {} }
        dispatch(action);

    })
}

/**
 * 编辑用户
 * @param cb 
 */
export const editUser = (userId, params: EditUserParams, cb) => (dispatch) => {
    return UserAPI.editUser(userId, params).then((res) => {
        let data = res.data
        let userList = {
            rows: _.keyBy([data], 'id')
        }
        let action = { type: ActionTypes.SETTING_SAY_HELLO, userList: userList }
        if (cb) {
            cb()
        }
        dispatch(action);
    }).catch((err) => {
        let action = { type: ActionTypes.SETTING_SAY_HELLO, userList: null }
        dispatch(action);
    })
}
export const resetUserInfo = () => (dispatch) => {
    return dispatch({ type: ActionTypes.SETTING_SAY_HELLO, userInfo: null })
}