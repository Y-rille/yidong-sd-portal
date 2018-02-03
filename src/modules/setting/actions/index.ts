import {
    getList,
    deleteUser,
    getUserInfo,
    createUser,
    editUser,
    resetUserInfo,
    editUserPassword,
    resetUserList
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
    editUserPassword,
    resetUserList
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
    resetUserList: Function
}

export default HomeActionCreatorsMap;