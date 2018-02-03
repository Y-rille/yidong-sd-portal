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
        let action = { type: ActionTypes.SETTING_DELETE_USER, id: userId }
        if (cb) {
            cb(res.data)
        }
        dispatch(action);
    }).catch((err) => {
        let action = { type: ActionTypes.SETTING_DELETE_USER, userList: {} }
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
        let action = { type: ActionTypes.SETTING_ADD_USER, user: res.data }
        dispatch(action);
        if (cb) {
            cb(null, res.data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.SETTING_ADD_USER, user: null }
        dispatch(action);
    })
}

/**
 * 编辑用户
 * @param cb 
 */
export const editUser = (userId, params: EditUserParams, cb) => (dispatch) => {
    return UserAPI.editUser(userId, params).then((res) => {
        let action = { type: ActionTypes.SETTING_EDIT_USER, user: res.data }
        dispatch(action)
        if (cb) {
            cb(null, res.data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.SETTING_EDIT_USER, user: null }
        dispatch(action);
    })
}

/**
 * reset 用户信息
 * @param cb 
 */
export const resetUserInfo = () => (dispatch) => {
    return dispatch({ type: ActionTypes.SETTING_SAY_HELLO, userInfo: null })
}

/**
 * reset 用户信息
 * @param cb 
 */
export const resetUserList = () => (dispatch) => {
    return dispatch({ type: ActionTypes.SETTING_SAY_HELLO, userList: null })
}

/**
 * 修改密码
 * @param cb 
 */
export const editUserPassword = (userId, params: EditUserPasswordParams, cb) => (dispatch) => {
    return UserAPI.editUserPassword(userId, params).then((res) => {
        if (cb) {
            cb(res.data)
        }
    }).catch((err) => {
        if (cb) {
            cb(err)
        }
    })
}