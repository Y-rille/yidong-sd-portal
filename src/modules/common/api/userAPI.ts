import axios from 'axios'

export interface LoginParams {
  email: string,
  password: string
}

class UserAPI {
  login(params: LoginParams) {
    return axios.post(`/api/v1/login`, params)
  }
  logout() {
    return axios.get(`/api/v1/logout`)
  }
  touch() {
    return axios.get(`/api/v1/users/common/info`)
  }
}

export default new UserAPI();