import axios from 'axios'
import { stringify } from 'querystringify'

class CommonAPI {
  querytree(parTreeId) {
    return axios.get(`/api_performance/datashare-svr/api/querytree/${parTreeId}`)
  }
}
export default new CommonAPI();