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