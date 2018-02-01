import {
  getPackages,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getMoInstKpiThresholds,
  getData,
  getMoTypeKpis
} from './kpi'

const HomeActionCreatorsMap = {
  getPackages,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getMoInstKpiThresholds,
  getData,
  getMoTypeKpis,
}

export interface PerformanceActions {
  getPackages: Function
  getMatchingDimensions: Function
  getTimeFilter: Function
  getKpiThresholds: Function
  getMoInstKpiThresholds: Function
  getData: Function
  getMoTypeKpis: Function
}

export default HomeActionCreatorsMap;