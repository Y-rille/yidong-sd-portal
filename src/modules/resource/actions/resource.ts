import * as _ from 'lodash'
import ActionTypes from '../constants/actionTypes'
import API from '../api/API'
// import deepPick from '../utils/deepPick'
/**
 * 查询分析模型包
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