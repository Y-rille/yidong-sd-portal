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
