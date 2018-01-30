import {
  getPackages,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getMoInstKpiThresholds,
  getData
} from './kpi'

const HomeActionCreatorsMap = {
  getPackages,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getMoInstKpiThresholds,
  getData
}

export interface HubActions {
  getPackages: Function
  getMatchingDimensions: Function
  getTimeFilter: Function
  getKpiThresholds: Function
  getMoInstKpiThresholds: Function
  getData: Function
}

export default HomeActionCreatorsMap;