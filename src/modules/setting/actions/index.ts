import {
    getList,
    deleteUser,
    getUserInfo,
    createUser,
    editUser,
    resetUserInfo,
    editUserPassword
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
    resetUserInfo,
    editUserPassword
}

export interface SettingActions {
    getList: Function
    getLogList: Function
    deleteUser: Function
    getUserInfo: Function
    createUser: Function
    editUser: Function
    resetUserInfo: Function
    editUserPassword: Function
}

export default HomeActionCreatorsMap;