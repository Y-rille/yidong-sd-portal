/**
 * 控制操作接口
 */
let operate = {
  path: '/rms-agent/api/operate/:moTypeId/:moInstId/:operateType',
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
  operate
}