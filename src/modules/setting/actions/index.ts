import {
    getList
} from './user'

import {
    getLogList
} from './log'

const HomeActionCreatorsMap = {
    getList,
    getLogList
}

export interface SettingActions {
    getList: Function
    getLogList: Function
}

export default HomeActionCreatorsMap;