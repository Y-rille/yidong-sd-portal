import ActionTypes from '../constants/actionTypes'
import userAPI from '../api/userAPI'
// import store from 'superstore-sync'

export const login = (params, cb) => (dispatch) => {
  return userAPI.login(params).then((res) => {
    let action = { type: ActionTypes.COMMON_SAY_HELLO, currentUser: res.data }
    dispatch(action);
    if (cb) {
      cb(res.data)
    }
  }).catch((err) => {
    let action = { type: ActionTypes.COMMON_SAY_HELLO, currentUser: null }
    dispatch(action);
  })
};

export const logout = (cb) => (dispatch) => {
  return userAPI.logout().then((res) => {
    let action = { type: ActionTypes.COMMON_SAY_HELLO, currentUser: null }
    dispatch(action);
    if (cb) {
      cb()
    }
  }).catch((err) => {
    let action = { type: ActionTypes.COMMON_SAY_HELLO, currentUser: null }
    dispatch(action);
  })
};

export const touch = (cb) => (dispatch) => {
  return userAPI.touch().then((res) => {
    let action = { type: ActionTypes.COMMON_SAY_HELLO, currentUser: res.data }
    dispatch(action);
    if (cb) {
      cb(res.data)
    }
  }).catch((err) => {
    let action = { type: ActionTypes.COMMON_SAY_HELLO, currentUser: null }
    dispatch(action);
    cb(null)
  })
};