import {
  getPackages,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getMoInstKpiThresholds,
  getData,
  getMoTypeKpis,
  demo
} from './kpi'

const HomeActionCreatorsMap = {
  getPackages,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getMoInstKpiThresholds,
  getData,
  getMoTypeKpis,
  demo
}

export interface PerformanceActions {
  getPackages: Function
  getMatchingDimensions: Function
  getTimeFilter: Function
  getKpiThresholds: Function
  getMoInstKpiThresholds: Function
  getData: Function
  getMoTypeKpis: Function
  demo: Function
}

export default HomeActionCreatorsMap;