import { login, logout, touch } from './user'
import { querytree, getConfig } from './common'

const HomeActionCreatorsMap = {
  login, logout, touch,
  querytree, getConfig
}

export interface CommonActions {
  login: Function
  logout: Function
  touch: Function
  querytree: Function
  getConfig: Function
}

export default HomeActionCreatorsMap;