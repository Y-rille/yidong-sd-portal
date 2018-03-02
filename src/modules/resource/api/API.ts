import axios from 'axios'
import { stringify } from 'querystringify'

class API {
  getMoTree() {
    return axios.get(`/api_resource/datashare-svr/api/querytree/mgrmoTree`)
  }
  getSubDataByName() {
    // 4.1
  }
  queryList() {
    // 4.2
  }
  getObjAttributes() {
    // 1.2
  }
  getObjData() {
    // 1.4
  }
}

export default new API()