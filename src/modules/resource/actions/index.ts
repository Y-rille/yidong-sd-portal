import {
    getMoTree,
    getSubDataByName,
    queryList,
    resetList,
    getObjAttributes,
    getObjData,
    getNodeData,
    editObjData,
    operateStatus,
    autoDiscovery,
    getSummary,
    findConfirm,
    getDataCenter,
    resetSummary,
    resetfindData
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
    operateStatus,
    autoDiscovery,
    getSummary,
    findConfirm,
    getDataCenter,
    resetSummary,
    resetfindData
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
    operateStatus: Function,
    autoDiscovery: Function,
    getSummary: Function,
    findConfirm: Function,
    getDataCenter: Function,
    resetSummary: Function,
    resetfindData: Function,
}

export default HomeActionCreatorsMap;