/**
 * 属性设置接口
 */
let configure = {
  path: '/rms-agent/api/configure/:moTypeKey/:moInstId',
  method: 'POST',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "message": ""
    }
  }
}

module.exports = {
  configure
}