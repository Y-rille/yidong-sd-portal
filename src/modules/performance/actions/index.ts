import {
  getPackages,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getMoInstKpiThresholds,
  cleanMoTypeKpisAndMoInstKpiThresholds,
  getData,
  getOneData,
  getMoTypeKpis,
  getNodeData
} from './kpi'

const HomeActionCreatorsMap = {
  getPackages,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getMoInstKpiThresholds,
  cleanMoTypeKpisAndMoInstKpiThresholds,
  getData,
  getOneData,
  getMoTypeKpis,
  getNodeData
}

export interface PerformanceActions {
  getPackages: Function
  getMatchingDimensions: Function
  getTimeFilter: Function
  getKpiThresholds: Function
  getMoInstKpiThresholds: Function
  cleanMoTypeKpisAndMoInstKpiThresholds: Function
  getData: Function
  getOneData: Function
  getMoTypeKpis: Function
  getNodeData: Function
}

export default HomeActionCreatorsMap;