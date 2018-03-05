import {
    getMoTree,
    getSubDataByName,
    queryList,
    getObjAttributes,
    getObjData,
    getNodeData,
    editObjData
} from './resource'

const HomeActionCreatorsMap = {
    getMoTree,
    getSubDataByName,
    queryList,
    getObjAttributes,
    getObjData,
    getNodeData,
    editObjData
}

export interface ResourceActions {
    getMoTree: Function,
    getSubDataByName: Function,
    queryList: Function
    getObjAttributes: Function,
    getObjData: Function,
    getNodeData: Function,
    editObjData: Function
}

export default HomeActionCreatorsMap;