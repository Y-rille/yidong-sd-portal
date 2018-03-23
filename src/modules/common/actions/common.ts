import ActionTypes from '../constants/actionTypes'
import commonAPI from '../api/commonAPI'

/**
 * 资源树图查询
 * @param parTreeId 根节点ID
 * @param cb 
 */
export const querytree = (parTreeId, cb) => (dispatch) => {
  return commonAPI.querytree(parTreeId).then((res: any) => {
    let action = { type: ActionTypes.COMMON_GET_QUERYTREE, tree: res.data }
    dispatch(action);
    if (cb) {
      cb(null)
    }
  }).catch((err) => {
    let action = { type: ActionTypes.COMMON_GET_QUERYTREE, tree: null }
    dispatch(action);
    if (cb) {
      cb(err)
    }
  })
}

/**
 * 获取配置信息
 * 
 * @export
 * @returns 
 */
export const getConfig = (cb) => (dispatch) => {
  return commonAPI.config().then((res) => {
    let action = { type: ActionTypes.COMMON_SAY_HELLO, config: res.data }
    dispatch(action);
    if (cb) {
      cb(res.data)
    }
  }).catch((err) => {
    let action = { type: ActionTypes.COMMON_SAY_HELLO, config: null }
    dispatch(action);
    cb(null)
  })
}