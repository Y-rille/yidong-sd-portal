import { getMoTree, getSubDataByName } from './resource'
const HomeActionCreatorsMap = {
    getMoTree,
    getSubDataByName,
}

export interface ResourceActions {
    getMoTree: Function,
    getSubDataByName: Function,

}

export default HomeActionCreatorsMap;