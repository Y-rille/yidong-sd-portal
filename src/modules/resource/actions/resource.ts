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
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, }
        dispatch(action);
        if (cb) {
            cb(null)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO, resourceTree: null }
        dispatch(action);
        if (cb) {
            cb(err)
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
        switch (dsname) { 
            case 'AZ':
                action['subDataAZ'] = res.data.data
                break;
            case 'HA':
                action['subDataHA'] = res.data.data
                break;
            case 'Region':
                action['subDataRegion'] = res.data.data
                break;
            case 'Host':
                action['subDataHost'] = res.data.data
                break;
            case 'Project':
                action['subDataProject'] = res.data.data
                break;
            default:
                break;    
        }
        dispatch(action);
        if (cb) {
            cb(null)
        }
    }).catch((err) => {
        let action = { type: ActionTypes.RESOURCE_SAY_HELLO }
        dispatch(action);
        if (cb) {
            cb(err)
        }
    })
}