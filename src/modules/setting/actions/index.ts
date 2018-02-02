import {
    getList,
    deleteUser,
    editUserPassword
} from './user'

import {
    getLogList
} from './log'

const HomeActionCreatorsMap = {
    getList,
    deleteUser,
    getLogList,
    editUserPassword
}

export interface SettingActions {
    getList: Function
    getLogList: Function
    deleteUser: Function
    editUserPassword: Function
}

export default HomeActionCreatorsMap;