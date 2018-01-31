let _ = require('lodash')
let faker = require('faker');
let logs = []
for (i = 0; i < 10; i++) {
    let user = {
        "id": i+1,
        "name": faker.name.firstName(),
        "email": faker.internet.email(),
        "mobile": faker.phone.phoneNumber(),
        "avatar": faker.image.avatar(),
        "remark": faker.lorem.words(),
        "create_time":faker.date.past()
    }
  logs.push(
    {
        "id":i+1,
        "user":user,
        "action": "login",
        "message":"登入系统",
        "create_time":faker.date.past()
    }
  )
}
let list = {
  path: '/v1/log/logs',
  method: 'GET',
  cache: false,
    template: (params, query, body) => {
    return {
      count: 50,
      rows: logs
    }
  }
}
module.exports = {
  list
}
