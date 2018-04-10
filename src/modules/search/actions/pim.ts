import * as _ from 'lodash'
import ActionTypes from '../constants/actionTypes'
import API from '../api/API'
/**
 * 数据列表查询
 * @param cb
 */
export const queryList = (dsname, params, cb, complex?) => (dispatch) => {

    return API.queryList(dsname, params).then((res: any) => {
        let data = res.data.data
        if (complex) {
            let newdata: any = {}
            newdata[dsname] = data
            data = newdata
        }
        let action = { type: ActionTypes.SEARCH_SAY_HELLO, list: data }
        dispatch(action);
        if (cb) {
            cb(null, data)
        }

    }).catch((err) => {
        let action = { type: ActionTypes.SEARCH_SAY_HELLO, list: null }
        dispatch(action);
        if (cb) {
            cb(err, null)
        }
    })
}
/**
 * reset列表
 * @param cb
 */
export const resetList = () => (dispatch) => {
    return dispatch({ type: ActionTypes.SEARCH_SAY_HELLO, list: null })
}
