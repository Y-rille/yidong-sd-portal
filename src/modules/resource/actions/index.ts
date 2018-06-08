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
    getOverview,
    getSyslog,
    resetSyslog,
    resetObjAttributes,
    resetObjData,
    deleteAll,
    editBatchData,
    getTopo,
    getTopoState,
    findtemplate,
    getDict,
    getDictOptions
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
    getOverview,
    getSyslog,
    resetSyslog,
    resetObjAttributes,
    resetObjData,
    deleteAll,
    editBatchData,
    getTopo,
    getTopoState,
    findtemplate,
    getDict,
    getDictOptions
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
    getOverview: Function,
    getSyslog: Function,
    resetSyslog: Function,
    resetObjAttributes: Function,
    resetObjData: Function,
    deleteAll: Function,
    editBatchData: Function,
    getTopo: Function,
    getTopoState: Function,
    findtemplate: Function,
    getDict: Function,
    getDictOptions: Function
}

export default HomeActionCreatorsMap;