let _ = require('lodash')
let faker = require('faker');
let currentUser = null

let users = []
for (i = 0; i < 50; i++) {
  users.push(
    {
      "id": i+1,
      "name": faker.name.firstName(),
      "email": faker.internet.email(),
      "mobile": faker.phone.phoneNumber,
      "avatar": faker.image.avatar(),
      "remark": faker.lorem.text(),
      "roles": ["admin", "performance", "resource", "alarm"],
      "create_time":faker.date.recent()
    }
  )
}
let login = {
  path: '/v1/login',
  method: 'POST',
  cache: false,
  template: (params, query, body) => {
    currentUser = {
      "id": 1,
      "name": faker.name.firstName(),
      "email": faker.internet.email(),
      "mobile": faker.phone.phoneNumber,
      "avatar": faker.image.avatar(),
      "remark": faker.lorem.text,
      "roles": ["admin", "performance", "resource", "alarm"],
      "create_time":faker.date.past()
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

let list = {
  path: '/v1/user/users',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      count: users.length,
      rows: users
    }
  }
}
let create = {
  path: '/v1/user/users',
  method: 'POST',
  cache: false,
  template: (params, query, body) => {
    return {
      "id": 1,
      "name": faker.name.firstName(),
      "email": faker.internet.email(),
      "mobile": faker.phone.phoneNumber,
      "avatar": faker.image.avatar(),
      "remark": faker.lorem.text,
      "roles": ["performance", "resource", "alarm"],
      "create_time":faker.date.past()
    }
  }
}
var del = {
  path: '/v1/user/users/:userId',
  method: 'DELETE',
  template: (params, query, body) => {
    return {}
  }
}
var edit = {
  path: '/v1/user/users/:userId',
  method: 'PUT',
  cache: false,
  template: (params, query, body) => {
    return {
      "id": 1,
      "name": faker.name.firstName(),
      "email": faker.internet.email(),
      "mobile": faker.phone.phoneNumber,
      "avatar": faker.image.avatar(),
      "remark": faker.lorem.text,
      "roles": ["performance", "resource", "alarm"],
      "create_time":faker.date.past()
    }
  }
}
let u_info = {
  path: '/v1/user/users/:userId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return _.find(users, { id: parseInt(params.userId) })
  }
}
var edit_password = {
  path: '/v1/user/users/:userId/password',
  method: 'PUT',
  cache: false,
  template: (params, query, body) => {
    return {}
  }
}
module.exports = {
  login,
  logout,
  info,
  list,
  create,
  del,
  edit,
  u_info,
  edit_password
}