import {
    queryList,
    resetList
} from './pim'
const HomeActionCreatorsMap = {
    queryList,
    resetList
}
export interface ResourceActions {
    queryList: Function
    resetList: Function,
}

export default HomeActionCreatorsMap;