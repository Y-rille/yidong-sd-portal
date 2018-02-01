import {
    getList,
    deleteUser
} from './user'

const HomeActionCreatorsMap = {
    getList,
    deleteUser
}

export interface SettingActions {
    getList: Function,
    deleteUser: Function
}

export default HomeActionCreatorsMap;