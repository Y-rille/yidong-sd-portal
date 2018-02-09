import axios from 'axios'
import { stringify } from 'querystringify'

export interface MatchingDimensionsParams {
  /**
   * 维度ID和排序方式，格式如：T_HOST.ASC
   */
  dims?: string,
  /**
   * 针对维度实例名称进行like 过滤的条件
   */
  exps?: string,
  /**
   * 返回记录条数
   */
  batchSize?: number,
  /**
   * 过滤条件是否忽略大小写，true/false
   */
  ignorecase?: boolean,
}

export interface DataParams {
  /**
   * 指标 ID，多个指标逗号分割；格式如：3,5,1,2,4,6
   */
  facts: string,
  /**
   * 查询开始时间，毫秒类型，格式如：1514777526666
   */
  begintime: number,
  /**
   * 查询结束时间，毫秒类型，格式如1515383226666
   */
  endtime: number,
  /**
   * 维度实例过滤条件，格式1：T_HOST,in,D03-hpeDL380-COMP04,D03-hpeDL380-COMP03，格式2：T_HOST,eq,D03-hpeDL380-COMP04
   */
  wheredim: string,
  /**
   * 取topN使用该参数，格式如：10
   */
  top?: number,
  /**
   * 取lastN使用该参数，格式如：10
   */
  last?: number,
  /**
   * 获取记录数限制，格式如：100
   */
  batchsize?: number,
  /**
   * 时间过滤条件ID
   */
  timeFilter?: number
  /**
   * 维度Id
   */
  dims
}

class KpiAPI {
  getPackages() {
    return axios.get(`/api/datashare-svr/api/kpi/getPackages`)
  }
  getMoTypeKpis(moTypeId, timeDimensionId) {
    return axios.get(`/api/datashare-svr/api/kpi/getMoTypeKpis/${moTypeId}/${timeDimensionId}`)
  }
  getMatchingDimensions(packageId, params?: MatchingDimensionsParams) {
    return axios.get(`/api/datashare-svr/api/kpi/getMatchingDimensions/${packageId}?${stringify(params)}`)
  }
  getTimeFilter() {
    return axios.get(`/api/datashare-svr/api/kpi/getTimeFilter`)
  }
  getKpiThresholds(kpiId) {
    return axios.get(`/api/datashare-svr/api/kpi/getKpiThresholds/${kpiId}`)
  }
  getMoInstKpiThresholds(moTypeId, moInstId) {
    return axios.get(`/api/datashare-svr/api/kpi/getMoInstKpiThresholds/${moTypeId}/${moInstId}`)
  }
  getData(packageId, params: DataParams) {
    return axios.get(`/api/datashare-svr/api/kpi/getData/${packageId}?${stringify(params)}`)
  }
}

export default new KpiAPI();