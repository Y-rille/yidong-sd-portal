import {
    getMoTree,
    getSubDataByName,
    queryList,
    getObjAttributes,
    getObjData,
    editObjData
} from './resource'

const HomeActionCreatorsMap = {
    getMoTree,
    getSubDataByName,
    queryList,
    getObjAttributes,
    getObjData,
    editObjData
}

export interface ResourceActions {
    getMoTree: Function,
    getSubDataByName: Function,
    queryList: Function
    getObjAttributes: Function,
    getObjData: Function,
    editObjData: Function
}

export default HomeActionCreatorsMap;