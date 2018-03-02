import * as _ from 'lodash'
import ActionTypes from '../constants/actionTypes'
import API from '../api/API'
// import deepPick from '../utils/deepPick'
/**
 * 查询资源树
 * @param cb 
 */
export const getMoTree = (cb) => (dispatch) => {
    return API.getMoTree().then((res: any) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, resourceTree: res.data }
        dispatch(action);
        if (cb) {
            cb(null, res.data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, resourceTree: null }
        dispatch(action);
        if (cb) {
            cb(err, null)
        }
    })
}

/**
 * 数据列表查询
 * @param cb
 */
export const queryList = (dsname, params, cb) => (dispatch) => {
    return API.queryList(dsname, params).then((res: any) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, list: res.data.data }
        dispatch(action);
        if (cb) {
            cb(null, res.data.data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, list: null }
        dispatch(action);
        if (cb) {
            cb(err, null)
        }
    })
}