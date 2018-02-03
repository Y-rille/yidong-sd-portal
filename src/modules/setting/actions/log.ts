import * as _ from 'lodash'
import ActionTypes from '../constants/actionTypes'
import LogAPI from '../api/LogAPI'
import { LogListParams } from '../api/LogAPI'

/**
 * 用户列表
 * @param cb 
 */
export const getLogList = (params, cb) => (dispatch) => {
    return LogAPI.getLogList(params).then((res: any) => {
        let action = { type: ActionTypes.SETTING_SAY_HELLO, logList: res.data.data }
        dispatch(action);
        if (cb) {
            cb(null)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.SETTING_SAY_HELLO, logList: null }
        dispatch(action);
        if (cb) {
            cb(err)
        }
    })
}
