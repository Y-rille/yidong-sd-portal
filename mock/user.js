let _ = require('lodash')
let faker = require('faker');
let currentUser = null
let login = {
  path: '/v1/login',
  method: 'POST',
  cache: false,
  template: (params, query, body) => {
    currentUser = {
      "id": 1,
      "name": faker.name.firstName(),
      "email": (params, query, body) => body.email,
      "mobile": "13211111111",
      "avatar": faker.image.avatar()
    }
    return currentUser
  }
}

let logout = {
  path: '/v1/logout',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    currentUser = null
    return {}
  }
}


let info = {
  path: '/v1/users/common/info',
  method: 'GET',
  cache: false,
  status: (req, res, next) => {
    if (!currentUser) {
      res.status(400);
    }
    next();
  },
  template: (params, query, body) => {
    if (currentUser) {
      return currentUser
    } else {
      return {}
    }
  }
}


module.exports = {
  login,
  logout,
  info
}