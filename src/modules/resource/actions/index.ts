import {
    getMoTree,
    getSubDataByName,
    queryList,
    resetList,
    getObjAttributes,
    getObjData,
    getNodeData,
    editObjData,
    operateStatus
} from './resource'

const HomeActionCreatorsMap = {
    getMoTree,
    getSubDataByName,
    queryList,
    resetList,
    getObjAttributes,
    getObjData,
    getNodeData,
    editObjData,
    operateStatus
}

export interface ResourceActions {
    getMoTree: Function,
    getSubDataByName: Function,
    queryList: Function
    getObjAttributes: Function,
    getObjData: Function,
    getNodeData: Function,
    editObjData: Function,
    resetList: Function,
    operateStatus: Function
}

export default HomeActionCreatorsMap;