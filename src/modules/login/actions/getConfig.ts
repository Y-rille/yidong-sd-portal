import ActionTypes from '../constants/actionTypes'
import configAPI from '../api/configAPI'
/**
 * 获取配置信息
 * 
 * @export
 * @returns 
 */
export const getConfig = () => (dispatch) => {
    return configAPI.getConfig().then((data) => {
        let action = { type: ActionTypes.LOGIN_SAY_HELLO, config: data }
        dispatch(action);
    }).catch((err) => {
        let action = { type: ActionTypes.LOGIN_SAY_HELLO, config: null }
        dispatch(action);
    })
};