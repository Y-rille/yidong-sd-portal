import axios from 'axios'
import { stringify } from 'querystringify'

class CommonAPI {
  querytree(parTreeId) {
    return axios.get(`/api_performance/datashare-svr/api/querytree/${parTreeId}`)
  }
  config() {
    return axios.get('./config.json')
  }
}
export default new CommonAPI();