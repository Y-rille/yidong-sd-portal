import { login, logout, touch } from './user'
import { querytree } from './common'

const HomeActionCreatorsMap = {
  login, logout, touch,
  querytree
}

export interface CommonActions {
  login: Function
  logout: Function
  touch: Function
  querytree: Function
}

export default HomeActionCreatorsMap;