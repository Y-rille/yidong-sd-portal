import axios from 'axios'
import { stringify } from 'querystringify'

export interface DataParams {
    /**
     * PIM ID
     */
    pim_id?: string,
    /**
     * 查询记录数
     */
    pageSize?: number,
    /**
     * 当前页码
     */
    pageNo?: number,
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

}
class API {
    queryList(dsname, params?: DataParams) {
        // 4.2
        return axios.get(`/api_resource/datashare-svr/api/imds/queryList/${dsname}?${stringify(params)}`)
    }
}
export default new API()