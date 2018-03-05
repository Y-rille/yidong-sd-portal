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
/**
 * 对象属性查询
 * @param moTypeKey 对象类型ID或对象类型英文名
 * @param cb 
 */
export const getObjAttributes = (moTypeKey, cb) => (dispatch) => {
    return API.getObjAttributes(moTypeKey).then((res: any) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, objAttributes: res.data.data }
        dispatch(action);
        if (cb) {
            cb(null)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, objAttributes: null }
        dispatch(action);
        if (cb) {
            cb(err)
        }
    })
}

/**
 * 对象实例列表
 * @param moTypeKey 对象类型ID或对象类型英文名
 * @param cb 
 */
export const getObjData = (moTypeKey, cb) => (dispatch) => {
    return API.getObjData(moTypeKey).then((res: any) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, objData: res.data.data }
        dispatch(action);
        if (cb) {
            cb(null)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, objData: null }
        dispatch(action);
        if (cb) {
            cb(err)
        }
    })
}