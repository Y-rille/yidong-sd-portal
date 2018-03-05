import * as _ from 'lodash'
import ActionTypes from '../constants/actionTypes'
import API from '../api/API'
import deepPick from '../utils/deepPick'
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
        let data = res.data.data
        for (let i = 0; i < data.dataList.length; i++) {

            if (data.dataList[i].hz) {
                data.dataList[i].ha = data.dataList[i].hz
            }
        }
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, hostList: data }
        dispatch(action);
        if (cb) {
            cb(null, data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, hostList: null }
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
/**
 * 根据nodeId返回节点信息
 * getNodeData
 * @param items 整棵树
 * @param nodeId 节点id
 */

export const getNodeData = (nodeId, items, cb) => (dispatch) => {
    let nodeInfo: any = deepPick(nodeId, items)
    if (nodeInfo !== 'undefined') {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, nodeInfo: nodeInfo }
        dispatch(action)
        if (cb) {
            cb(null, nodeInfo)
        }
    } else {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, nodeInfo: null }
        dispatch(action)
        if (cb) {
            cb(new Error(`not found by ${nodeId}`), null)
        }
    }
}

/**
 * 修改对象实例列表
 * @param moTypeKey 对象类型ID或对象类型英文名
 * @param moInstId MO实例ID
 * @param editData
 * @param cb 
 */
export const editObjData = (moTypeKey, moInstId, editData, cb) => (dispatch) => {
    return API.editObjData(moTypeKey, moInstId, editData).then((res: any) => {
        if (cb) {
            cb(null, res.data)
        }
    }).catch((err) => {
        if (cb) {
            cb(err, null)
        }
    })
}
