import {
    getList,
    deleteUser
} from './user'

import {
    getLogList
} from './log'

const HomeActionCreatorsMap = {
    getList,
    deleteUser,
    getLogList
}

export interface SettingActions {
    getList: Function
    getLogList: Function
    deleteUser: Function
}

export default HomeActionCreatorsMap;