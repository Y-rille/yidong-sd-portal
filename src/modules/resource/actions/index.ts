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
    findConfirm
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
    findConfirm
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
    findConfirm: Function
}

export default HomeActionCreatorsMap;