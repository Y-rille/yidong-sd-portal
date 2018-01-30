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

}

class KpiAPI {

}

export default new KpiAPI();