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
/**
 * 选择项查询
 * @param dsname 数据订阅名
 * @param cb 
 */
export const getSubDataByName = (dsname, cb) => (dispatch) => {
    return API.getSubDataByName(dsname).then((res: any) => { 
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO }
        action[`subData${dsname}`] = res.data.data
        dispatch(action);
        if (cb) {
            cb(null)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO }
        action[`subData${dsname}`] = null
        dispatch(action);
        if (cb) {
            cb(err)
        }
    })
}