import {
    getMoTree,
    getSubDataByName,
    queryList,
    getObjAttributes,
    getObjData,
    getNodeData
} from './resource'

const HomeActionCreatorsMap = {
    getMoTree,
    getSubDataByName,
    queryList,
    getObjAttributes,
    getObjData,
    getNodeData
}

export interface ResourceActions {
    getMoTree: Function,
    getSubDataByName: Function,
    queryList: Function
    getObjAttributes: Function,
    getObjData: Function,
    getNodeData: Function,
}

export default HomeActionCreatorsMap;