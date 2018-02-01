import axios from 'axios'
import { stringify } from 'querystringify'

export interface LogListParams {
    page_size?: number,
    page_num?: number,
    query_key?: string,
    order_by?: string,
    order?: string
}

class LogAPI {
    getLogList(params?: LogListParams) {
        return axios.get(`/api/v1/log/logs?${stringify(params)}`)
    }
}

export default new LogAPI();