import {
    getList,
    deleteUser,
    getUserInfo,
    createUser,
    editUser,
    resetUserInfo
} from './user'

import {
    getLogList
} from './log'

const HomeActionCreatorsMap = {
    getList,
    deleteUser,
    getLogList,
    getUserInfo,
    createUser,
    editUser,
    resetUserInfo
}

export interface SettingActions {
    getList: Function
    getLogList: Function
    deleteUser: Function
    getUserInfo: Function
    createUser: Function
    editUser: Function
    resetUserInfo: Function
}

export default HomeActionCreatorsMap;