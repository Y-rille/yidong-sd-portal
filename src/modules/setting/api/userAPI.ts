import axios from 'axios'
import { stringify } from 'querystringify'

export interface CreateUserParams {
  name: string,
  email: string,
  mobile: string,
  avatar: string,
  remark?: string,
  roles: Array<string>,
  password: string
}

export interface EditUserParams {
  name: string,
  email: string,
  mobile: string,
  avatar: string,
  remark?: string,
  roles: Array<string>,
}
export interface EditUserPasswordParams {
  password: string,
}

export interface ListParams {
  page_size?: number,
  page_num?: number,
  query_key?: string,
  order_by?: string,
  order?: string
}

class UserAPI {

  getList(params?: ListParams) {
    return axios.get(`/api/v1/user/users?${stringify(params)}`)
  }
  getUserInfo(userId) {
    return axios.get(`/api/v1/user/users/${userId}`)
  }
  createUser(params: CreateUserParams) {
    return axios.post(`/api/v1/user/users`, params)
  }
  editUser(userId, params: EditUserParams) {
    return axios.put(`/api/v1/user/users/${userId}`, params)
  }
  deleteUser(userId) {
    return axios.delete(`/api/v1/user/users/${userId}`)
  }
  editUserPassword(userId, params: EditUserPasswordParams) {
    return axios.put(`/api/v1/user/users/${userId}/password`, params)
  }

}

export default new UserAPI();