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
   * PIM ID
   */
  pim_id?: string,
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
   * AZ ID
   */
  az_id?: string,
  /**
   * HA ID
   */
  ha_id?: string,
  /**
   * 数据中心
   */
  datacenter?: string,
  /**
   * 服务器id
   */
  server?: string,
  /**
   * 防火墙id
   */
  firewall?: string,
  /**
   * 交换机编号
   */
  number?: string,
  /**
   * 交换机id
   */
  switch?: string,
  /**
   * 磁阵id
   */
  diskarray?: string,
  /**
   * 资产编号
   */
  assettag?: string
}

export interface DiscoveryParams {
  /**
   * 发现服务
   */
  server?: string,
  /**
   * 开始IP
   */
  startip?: string,
  /**
   * 结束IP
   */
  endip?: string,
  /**
   * 用户名
   */
  username?: string,
  /**
   * 密码
   */
  password?: string,
  /**
   * 网关
   */
  gateway?: string,
  /**
   * 子网掩码
   */
  subnetmask?: string,
  /**
   * DNS
   */
  dns?: string,
  /**
   * 供应商
   */
  vendor?: string,
  /**
   * 设备IP
   */
  deviceip?: string,
  /**
   * 协议
   */
  protocol?: string,
  /**
   * 设备类型
   */
  switchtype?: string,
}

export interface VimParams {
  /**
   * VIM ID
   */
  VimId: string,
  /**
   * 名称
   */
  NAME: string,
  /**
   * URL
   */
  url: string,
  /**
   * 位置
   */
  position?: string,
  /**
   * 描述
   */
  description?: string,
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
  getObjData(moTypeKey, moInstId) {
    // 1.5       
    return axios.get(`/api_resource/datashare-svr/api/moinst/${moTypeKey}/${moInstId}`)
  }
  getOverview(dsname) {
    return axios.get(`/api_resource/datashare-svr/api/imds/report/${dsname}`)
  }
  editObjData(moTypeKey, moInstId, editData) {
    // 1.4   
    return axios.post(`/api_agent/rms-agent/api/configure/${moTypeKey}/${moInstId}`, editData)
  }
  operateStatus(moTypeKey, moInstId, operateType) {
    // 1.2
    return axios.post(`/api_agent/rms-agent/api/operate/${moTypeKey}/${moInstId}/${operateType}`)
  }
  autoDiscovery(moTypeKey, params?: DiscoveryParams) {
    // 1.5
    return axios.post(`/api_agent/rms-agent/api/find/${moTypeKey}`, params)
  }
  findConfirm(moTypeKey, queryData) {
    // 1.2
    return axios.post(`/api_agent/rms-agent/api/findconfirm/${moTypeKey}`, queryData)
  }
  delInstance(moTypeKey, moInstId) {
    // 1.4
    return axios.delete(`/api_agent/rms-agent/api/delete/${moTypeKey}/${moInstId}`)
  }
  deleteAll(params) {
    return axios.delete(`/api_agent/rms-agent/api/batchdelete`, params)
  }
  addVim(moTypeKey, params?: VimParams) {
    // 1.4
    return axios.post(`/api_agent/rms-agent/api/add/${moTypeKey}`, params)
  }
  getSyslog(moTypeKey, moInstId) {
    // 1.4  
    return axios.get(`/api_agent/rms-agent/api/syslog/${moTypeKey}/${moInstId}`)
  }
}

export default new API()