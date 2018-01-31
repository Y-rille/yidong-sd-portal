import * as _ from 'lodash'
import ActionTypes from '../constants/actionTypes'
import kpiAPI from '../api/kpiAPI'
import { MatchingDimensionsParams, DataParams } from '../api/kpiAPI'

/**
 * 查询分析模型包
 * @param cb 
 */
export const getPackages = (cb) => (dispatch) => {
  return kpiAPI.getPackages().then((res: any) => {
    let action = { type: ActionTypes.PERFORMANCE_SAY_HELLO, nfvdPm: res.data[0] }
    dispatch(action);
    if (cb) {
      cb(null)
    }
  }).catch((err) => {
    let action = { type: ActionTypes.PERFORMANCE_SAY_HELLO, nfvdPm: null }
    dispatch(action);
    if (cb) {
      cb(err)
    }
  })
}

/**
 * 查询维度实例数据
 * @param packageId 分析模型包ID
 * @param params 
 * @param cb 
 */
export const getMatchingDimensions = (packageId, params: MatchingDimensionsParams, cb) => (dispatch) => {
  return kpiAPI.getMatchingDimensions(packageId, params).then((res: any) => {
    let action = { type: ActionTypes.PERFORMANCE_SAY_HELLO, data: res.body }
    dispatch(action);
    if (cb) {
      cb(null)
    }
  }).catch((err) => {
    let action = { type: ActionTypes.PERFORMANCE_SAY_HELLO, data: null }
    dispatch(action);
    if (cb) {
      cb(err)
    }
  })
}

/**
 * 时间过滤条件
 * @param cb 
 */
export const getTimeFilter = (cb) => (dispatch) => {
  return kpiAPI.getTimeFilter().then((res: any) => {
    let action = { type: ActionTypes.PERFORMANCE_GET_TIME_FILTER, timeFilter: res.data.data }
    dispatch(action);
    if (cb) {
      cb(null)
    }
  }).catch((err) => {
    let action = { type: ActionTypes.PERFORMANCE_GET_TIME_FILTER, timeFilter: null }
    dispatch(action);
    if (cb) {
      cb(err)
    }
  })
}

/**
 * 指标阈值查询
 * @param kpiId 指标ID
 * @param cb 
 */
export const getKpiThresholds = (kpiId, cb) => (dispatch) => {
  return kpiAPI.getKpiThresholds(kpiId).then((res: any) => {
    let action = { type: ActionTypes.PERFORMANCE_SAY_HELLO, data: res.body }
    dispatch(action);
    if (cb) {
      cb(null)
    }
  }).catch((err) => {
    let action = { type: ActionTypes.PERFORMANCE_SAY_HELLO, data: null }
    dispatch(action);
    if (cb) {
      cb(err)
    }
  })
}

/**
 * 对象实例阈值
 * @param moTypeId 对象类型ID
 * @param moInstId 对象实例ID
 * @param cb 
 */
export const getMoInstKpiThresholds = (moTypeId, moInstId, cb) => (dispatch) => {
  return kpiAPI.getMoInstKpiThresholds(moTypeId, moInstId).then((res: any) => {
    let action = { type: ActionTypes.PERFORMANCE_SAY_HELLO, moInstKpiThresholds: res.data }
    dispatch(action);
    if (cb) {
      cb(res.data)
    }
  }).catch((err) => {
    let action = { type: ActionTypes.PERFORMANCE_SAY_HELLO, moInstKpiThresholds: null }
    dispatch(action);
    if (cb) {
      cb(err)
    }
  })
}

/**
 * 指标数据查询
 * @param packageId 分析模型包ID
 * @param params 
 * @param cb 
 */
export const getData = (packageId, params: DataParams, cb) => (dispatch) => {
  return kpiAPI.getData(packageId, params).then((res: any) => {
    let action = { type: ActionTypes.PERFORMANCE_SAY_HELLO, data: res.body }
    dispatch(action);
    if (cb) {
      cb(null)
    }
  }).catch((err) => {
    let action = { type: ActionTypes.PERFORMANCE_SAY_HELLO, data: null }
    dispatch(action);
    if (cb) {
      cb(err)
    }
  })
}

/**
 * 对象指标查询
 * getMoTypeKpis
 * @param moTypeId 对象类型ID
 * @param timeDimensionId 时间维度ID
 */

export const getMoTypeKpis = (moTypeId, timeDimensionId, cb) => (dispatch) => {
  return kpiAPI.getMoTypeKpis(moTypeId, timeDimensionId).then((res: any) => {
    let action = { type: ActionTypes.PERFORMANCE_SAY_HELLO, moTypeKpis: res.data }
    dispatch(action);
    if (cb) {
      cb(res.data)
    }
  }).catch((err) => {
    let action = { type: ActionTypes.PERFORMANCE_SAY_HELLO, moTypeKpis: null }
    dispatch(action);
    if (cb) {
      cb(err)
    }
  })
}