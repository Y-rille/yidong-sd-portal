import { getMoTree, getSubDataByName, getObjAttributes } from './resource'
const HomeActionCreatorsMap = {
    getMoTree,
    getSubDataByName,
    getObjAttributes,
}

export interface ResourceActions {
    getMoTree: Function,
    getSubDataByName: Function,
    getObjAttributes: Function,

}

export default HomeActionCreatorsMap;