import {
    getMoTree,
    queryList
} from './resource'
const HomeActionCreatorsMap = {
    getMoTree,
    queryList,
}

export interface ResourceActions {
    getMoTree: Function
    queryList: Function

}

export default HomeActionCreatorsMap;