import {
  getPackages,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getData
} from './kpi'

const HomeActionCreatorsMap = {
  getPackages,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getData
}

export interface HubActions {
  getPackages: Function
  getMatchingDimensions: Function
  getTimeFilter: Function
  getKpiThresholds: Function
  getData: Function
}

export default HomeActionCreatorsMap;