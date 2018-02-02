import {
  getPackages,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getMoInstKpiThresholds,
  getData,
  getMoTypeKpis,
  getNodeData
} from './kpi'

const HomeActionCreatorsMap = {
  getPackages,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getMoInstKpiThresholds,
  getData,
  getMoTypeKpis,
  getNodeData
}

export interface PerformanceActions {
  getPackages: Function
  getMatchingDimensions: Function
  getTimeFilter: Function
  getKpiThresholds: Function
  getMoInstKpiThresholds: Function
  getData: Function
  getMoTypeKpis: Function
  getNodeData: Function
}

export default HomeActionCreatorsMap;