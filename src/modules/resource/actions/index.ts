import {
    getMoTree,
    getSubDataByName,
    queryList,
    getObjAttributes,
} from './resource'

const HomeActionCreatorsMap = {
    getMoTree,
    getSubDataByName,
    queryList,
    getObjAttributes,
}

export interface ResourceActions {
    getMoTree: Function,
    getSubDataByName: Function,
    queryList: Function
    getObjAttributes: Function,
}

export default HomeActionCreatorsMap;