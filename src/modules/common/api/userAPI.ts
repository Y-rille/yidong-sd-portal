import axios from 'axios'

export interface LoginParams {
  email: string,
  password: string
}

class UserAPI {
  login(params: LoginParams) {
    return axios.post(`/api_setting/v1/login`, params, {
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }
  logout() {
    return axios.post(`/api_setting/v1/logout`)
  }
  touch() {
    return axios.get(`/api_setting/v1/user/touch`)
  }
}

export default new UserAPI();