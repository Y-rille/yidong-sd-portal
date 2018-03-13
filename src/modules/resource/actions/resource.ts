import * as _ from 'lodash'
import ActionTypes from '../constants/actionTypes'
import API from '../api/API'
import deepPick from '../utils/deepPick'
import formatDataCenter from '../utils/getDataCenter'
/**
 * 查询资源树
 * @param cb 
 */
export const getMoTree = (queryName, cb) => (dispatch) => {
    return API.getQueryTree(queryName).then((res: any) => {
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
 * 数据中心查询
 * @param cb 
 */
export const getDataCenter = (queryKey, cb) => (dispatch) => {
    return API.getQueryTree(queryKey).then((res: any) => {
        let data = formatDataCenter(res.data)
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, subDataCenter: data }
        dispatch(action);
        if (cb) {
            cb(null, res.data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, subDataCenter: null }
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
export const queryList = (dsname, params, cb, complex?) => (dispatch) => {

    return API.queryList(dsname, params).then((res: any) => {
        let data = res.data.data
        if (complex) {
            let newdata: any = {}
            newdata[complex] = data
            data = newdata
        }
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, list: data }
        dispatch(action);
        if (cb) {
            cb(null, data)
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
 * 电源状态查询
 * @param cb
 */
export const queryListServerPower = (dsname, params, cb, complex?) => (dispatch) => {
    return API.queryList(dsname, params).then((res: any) => {
        let data = res.data.data.dataList[0]
        if (complex) {
            let newdata: any = {}
            newdata[complex] = data
            data = newdata
        }
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, power: data }
        dispatch(action);
        if (cb) {
            cb(null, data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, power: null }
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
    return dispatch({ type: ActionTypes.RESOURCE_SAY_HELLO, list: null })
}

export const resetSummary = () => (dispatch) => {
    return dispatch({ type: ActionTypes.RESOURCE_SAY_HELLO, summary: null })
}

/**
 * 概览数据查询
 * @param cb
 */
export const getSummary = (dsname, params, cb, complex?) => (dispatch) => {
    return API.queryList(dsname, params).then((res: any) => {
        let data = {}
        if (complex) {
            data[dsname] = res.data.data
        } else {
            data = res.data.data
        }
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, summary: data }
        dispatch(action);
        if (cb) {
            cb(null, data)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, summary: null }
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
        let name = ''
        switch (dsname) {
            case 'imdsSelectionAZ':
                name = 'AZ'
                break;
            case 'imdsSelectionHA':
                name = 'HA'
                break;
            case 'imdsSelectionRegion':
                name = 'Region'
                break;
            case 'imdsSelectionHost':
                name = 'Host'
                break;
            case 'imdsSelectionProject':
                name = 'Project'
                break;
            case 'imdsSelectionVendor':
                name = 'Vendor'
                break;
            case 'imdsSelectionPIM':
                name = 'PIM'
                break;
            case 'imdsSelectSwitchType':
                name = 'SwitchType'
                break;
            default:
                name = 'AZ'
        }
        action[`subData${name}`] = res.data.data
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
export const getObjData = (moTypeKey, moInstId, cb) => (dispatch) => {
    return API.getObjData(moTypeKey, moInstId).then((res: any) => {
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

/**
 * 控制操作
 * @param moTypeKey 对象类型ID或对象类型英文名
 * @param moInstId MO实例ID
 * @param operateType 操作类型
 * @param cb 
 */
export const operateStatus = (moTypeKey, moInstId, operateType, cb) => (dispatch) => {
    return API.operateStatus(moTypeKey, moInstId, operateType).then((res: any) => {
        if (cb) {
            cb(null, res.data)
        }
    }).catch((err) => {
        if (cb) {
            cb(err, null)
        }
    })
}

/**
 * 自动发现
 * @param moTypeKey 对象类型ID或对象类型英文名
 * @param cb 
 */
export const autoDiscovery = (moTypeKey, queryData, cb) => (dispatch) => {
    return API.autoDiscovery(moTypeKey, queryData).then((res: any) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, findData: res.data.data }
        dispatch(action);
        if (cb) {
            cb(res.data.data, null)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, findData: null }
        dispatch(action);
        if (cb) {
            cb(null, err)
        }
    })
}
/**
 * 置空发现数据
 */
export const resetfindData = () => (dispatch) => {
    return dispatch({ type: ActionTypes.RESOURCE_SAY_HELLO, findData: null })
}
/**
 * 自动发现确认接口
 * @param moTypeKey 对象类型ID或对象类型英文名
 * @param cb 
 */
export const findConfirm = (moTypeKey, queryData, cb) => (dispatch) => {
    return API.findConfirm(moTypeKey, queryData).then((res: any) => {
        if (cb) {
            cb(null, res.data)
        }
    }).catch((err) => {
        if (cb) {
            cb(err, null)
        }
    })
}

/**
 * 删除实例
 * @param moTypeKey 对象类型ID或对象类型英文名
 * @param moInstId MO实例ID
 * @param cb 
 */
export const deleteInstance = (moTypeKey, moInstId, cb) => (dispatch) => {
    return API.delInstance(moTypeKey, moInstId).then((res) => {
        let action = { type: ActionTypes.RESOURCE_DELETE, id: moInstId }
        if (cb) {
            cb(res.data)
        }
        dispatch(action);
    }).catch((err) => {
        let action = { type: ActionTypes.RESOURCE_DELETE, list: {} }
        dispatch(action);
        if (cb) {
            cb(err)
        }
    })
}