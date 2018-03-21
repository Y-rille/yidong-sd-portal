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
    queryListServerPower,
    resetfindData,
    deleteInstance,
    addVim,
    getSyslog
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
    queryListServerPower,
    resetfindData,
    deleteInstance,
    addVim,
    getSyslog
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
    queryListServerPower: Function,
    resetfindData: Function,
    deleteInstance: Function,
    addVim: Function,
    getSyslog: Function
}

export default HomeActionCreatorsMap;