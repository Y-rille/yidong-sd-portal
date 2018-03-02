import {
    getMoTree,
    getSubDataByName,
    queryList,
    getObjAttributes,
    getObjData
} from './resource'

const HomeActionCreatorsMap = {
    getMoTree,
    getSubDataByName,
    queryList,
    getObjAttributes,
    getObjData
}

export interface ResourceActions {
    getMoTree: Function,
    getSubDataByName: Function,
    queryList: Function
    getObjAttributes: Function,
    getObjData: Function,
}

export default HomeActionCreatorsMap;