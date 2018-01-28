/**
 * 资源实例活动告警查询
 */
let activealarms = {
  path: '/datashare-svr/api/mo/:moTypeId/activealarms',
  method: 'GET',
  cache: false,
  template: (params, query, body) => { }
}

/**
 * 资源对象类型查询
 */
let motypes = {
  path: '/datashare-svr/api/mo/motypes',
  method: 'GET',
  cache: false,
  template: (params, query, body) => { }
}

/**
 * 对象属性查询
 */
let attributes = {
  path: '/datashare-svr/api/mo/:moTypeId/attributes',
  method: 'GET',
  cache: false,
  template: (params, query, body) => { }
}


/**
 * 对象关系查询
 */
let relations = {
  path: '/datashare-svr/api/mo/:moTypeId/relations',
  method: 'GET',
  cache: false,
  template: (params, query, body) => { }
}

/**
 * 对象实例列表查询
 */
let querydata = {
  path: '/datashare-svr/api/moinst/:moTypeId/querydata',
  method: 'POST',
  cache: false,
  template: (params, query, body) => { }
}

/**
 * 对象实例详情查询
 */
let moinst = {
  path: '/datashare-svr/api/moinst/:moTypeId/:moInstId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => { }
}

/**
 * 关联对象实例查询
 */
let morel = {
  path: '/datashare-svr/api/morel/:moInstId/:relaitonId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => { }
}

/**
 * 资源树图查询
 */
let querytree = {
  path: '/datashare-svr/api/querytree/:parTreeId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => { }
}


module.exports = {
  activealarms,
  motypes,
  attributes,
  relations,
  querydata,
  moinst,
  morel,
  querytree
}