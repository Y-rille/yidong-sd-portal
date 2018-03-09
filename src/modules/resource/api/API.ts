import axios from 'axios'
import { stringify } from 'querystringify'

export interface DataParams {
  /**
   * 所属AZ
   */
  az?: string,
  /**
   * 所属HA
   */
  ha?: string,
  /**
   * 所属Region
   */
  region?: string,
  /**
   * VIM ID
   */
  vim_id?: string,
  /**
   * 主机名称
   */
  host?: string,
  /**
   * project名称
   */
  project?: string,
  /**
   * 名称
   */
  name?: string,
  /**
   * 查询记录数
   */
  pageSize?: number,
  /**
   * 当前页码
   */
  pageNo?: number,
  /**
   * 查询关键字
   */
  queryKey?: string,

}

class API {
  // mgrmoTree
  getQueryTree(queryKey) {
    return axios.get(`/api_resource/datashare-svr/api/querytree/${queryKey}`)
  }
  getSubDataByName(dsname) {
    // 4.1
    return axios.get(`/api_resource/datashare-svr/api/dssvr/getSubDataByName/${dsname}`)
  }
  queryList(dsname, params?: DataParams) {
    // 4.2
    return axios.get(`/api_resource/datashare-svr/api/imds/queryList/${dsname}?${stringify(params)}`)
  }
  getObjAttributes(moTypeKey) {
    // 1.2
    return axios.get(`/api_resource/datashare-svr/api/mo/${moTypeKey}/attributes`)
  }
  getObjData(moTypeKey) {
    // 1.4   
    return axios.post(`/api_resource/datashare-svr/api/moinst/${moTypeKey}/querydata`)
  }
  editObjData(moTypeKey, moInstId, editData) {
    // 1.4   
    return axios.post(`/api_agent/rms-agent/api/configure/${moTypeKey}/${moInstId}`, editData)
  }
  operateStatus(moTypeKey, moInstId, operateType) {
    // 1.2
    return axios.post(`/api_agent/rms-agent/api/operate/${moTypeKey}/${moInstId}/${operateType}`)
  }
  autoDiscovery(moTypeKey) {
    // 1.5
    return axios.post(`/api_agent/rms-agent/api/find/${moTypeKey}`)
  }
  findConfirm(moTypeKey, queryData) {
    // 1.2
    return axios.post(`/api_agent/rms-agent/api/findconfirm/${moTypeKey}`, queryData)
  }
}

export default new API()