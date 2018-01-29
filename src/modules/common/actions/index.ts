import { login, logout, touch } from './user'

const HomeActionCreatorsMap = {
  login, logout, touch
}

export interface CommonActions {
  login: Function
  logout: Function
  touch: Function
}

export default HomeActionCreatorsMap;