/**
 * 资源实例活动告警查询
 */
let activealarms = {
  path: '/datashare-svr/api/mo/:moTypeId/activealarms',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return []
  }
}

/**
 * 资源对象类型查询
 */
let motypes = {
  path: '/datashare-svr/api/mo/motypes',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": [
        {
          "moTypeId": 1,
          "moTypeName": "主机",
          "moCategory": "DEFAULT",
          "isdynamicMo": 0,
          "moTypeEnName": "HOST",
          "moDesc": "",
          "version": "1.0",
          "state": 1
        },
        {
          "moTypeId": 2,
          "moTypeName": "虚机",
          "moCategory": "DEFAULT",
          "isdynamicMo": 0,
          "moTypeEnName": "VM",
          "moDesc": "",
          "version": "1.0",
          "state": 1
        }
      ]
    }
  }
}

/**
 * 对象属性查询
 */
let attributes = {
  path: '/datashare-svr/api/mo/:moTypeId/attributes',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": [
        {
          "moAttributeId": 1,
          "moTypeId": 1,
          "attributeType": 0,
          "attributeName": "ID",
          "isobjectid": 1,
          "physicalTablefield": "ID",
          "state": 1,
          "version": "1.0",
          "ediable": 0,
          "visible": 0,
          "attributeGroup": "基本属性"
        },
        {
          "moAttributeId": 2,
          "moTypeId": 1,
          "attributeType": 1,
          "attributeName": "NAME",
          "isobjectid": 0,
          "physicalTablefield": "NAME",
          "state": 1,
          "version": "1.0",
          "ediable": 0,
          "visible": 1,
          "attributeGroup": "基本属性"
        },
        {
          "moAttributeId": 3,
          "moTypeId": 1,
          "attributeType": 1,
          "attributeName": "TIME",
          "isobjectid": 0,
          "physicalTablefield": "TIME",
          "state": 1,
          "version": "1.0",
          "ediable": 0,
          "visible": 0,
          "attributeGroup": "基本属性"
        },
        {
          "moAttributeId": 4,
          "moTypeId": 1,
          "attributeType": 1,
          "attributeName": "EXPIRY_TIME",
          "isobjectid": 0,
          "physicalTablefield": "EXPIRY_TIME",
          "state": 1,
          "version": "1.0",
          "ediable": 0,
          "visible": 0,
          "attributeGroup": "基本属性"
        },
        {
          "moAttributeId": 56,
          "moTypeId": 1,
          "attributeType": 1,
          "attributeName": "SerialNumber",
          "isobjectid": 0,
          "physicalTablefield": "SerialNumber",
          "state": 1,
          "version": "1.0",
          "ediable": 0,
          "visible": 1,
          "attributeGroup": "基本属性"
        },
        {
          "moAttributeId": 57,
          "moTypeId": 1,
          "attributeType": 1,
          "attributeName": "Hostname",
          "isobjectid": 0,
          "physicalTablefield": "Hostname",
          "state": 1,
          "version": "1.0",
          "ediable": 0,
          "visible": 1,
          "attributeGroup": "基本属性"
        }
      ]
    }
  }
}


/**
 * 对象关系查询
 */
let relations = {
  path: '/datashare-svr/api/mo/:moTypeId/relations',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": [
        {
          "relationId": 1,
          "relationName": "磁阵与存储池",
          "relationType": 2,
          "relationDesc": "",
          "leftMoType": 3,
          "rightMoType": 4,
          "version": "1.0",
          "state": 0
        },
        {
          "relationId": 2,
          "relationName": "磁阵与磁盘",
          "relationType": 2,
          "relationDesc": "",
          "leftMoType": 3,
          "rightMoType": 5,
          "version": "1.0",
          "state": 0
        },
        {
          "relationId": 3,
          "relationName": "磁阵与控制器",
          "relationType": 2,
          "relationDesc": "",
          "leftMoType": 3,
          "rightMoType": 6,
          "version": "1.0",
          "state": 0
        }
      ]
    }
  }
}

/**
 * 对象实例列表查询
 */
let querydata = {
  path: '/datashare-svr/api/moinst/:moTypeId/querydata',
  method: 'POST',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": {
        "headers": [
          "ID",
          "NAME",
          "TIME",
          "EXPIRY_TIME",
          "ext_id",
          "SerialNumber",
          "Hostname"
        ],
        "columns": [
          "ID",
          "NAME",
          "TIME",
          "EXPIRY_TIME",
          "ext_id",
          "SerialNumber",
          "Hostname"
        ],
        "values": [
          [
            401,
            "D04-hpeDL380-COMP09",
            "2017-01-01 00:00:00",
            "2030-01-01 00:00:00",
            "6CU725W3CF",
            "6CU725W3CF",
            "D04-hpeDL380-COMP09"
          ],
          [
            400,
            "D04-hpeDL380-COMP08",
            "2017-01-01 00:00:00",
            "2030-01-01 00:00:00",
            "6CU725W39D",
            "6CU725W39D",
            "D04-hpeDL380-COMP08"
          ],
          [
            399,
            "D03-hpeDL380-COMP06",
            "2017-01-01 00:00:00",
            "2030-01-01 00:00:00",
            "6CU725W39J",
            "6CU725W39J",
            "D03-hpeDL380-COMP06"
          ],
          [
            398,
            "D04-hpeDL380-COMP04",
            "2017-01-01 00:00:00",
            "2030-01-01 00:00:00",
            "6CU725W3JN",
            "6CU725W3JN",
            "D04-hpeDL380-COMP04"
          ],
          [
            397,
            "D03-hpeDL380-COMP03",
            "2017-01-01 00:00:00",
            "2030-01-01 00:00:00",
            "6CU725W3KW",
            "6CU725W3KW",
            "D03-hpeDL380-COMP03"
          ]
        ],
        "nbVals": 5,
        "offset": 0,
        "totalCount": 100
      }
    }
  }
}

/**
 * 对象实例详情查询
 */
let moinst = {
  path: '/datashare-svr/api/moinst/:moTypeId/:moInstId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": {
        "headers": [
          "ID",
          "NAME",
          "TIME",
          "EXPIRY_TIME",
          "ext_id",
          "biz_id",
          "接口版本",
          "资源池系统标识",
          "ChassisType",
          "磁阵资产编号",
          "磁阵制造商",
          "磁阵型号",
          "磁阵序列号",
          "磁阵来源",
          "磁阵投入生产运行时间",
          "磁阵License信息",
          "磁阵软件版本",
          "磁阵运行状态",
          "磁阵资产状态"
        ],
        "columns": [
          "ID",
          "NAME",
          "TIME",
          "EXPIRY_TIME",
          "ext_id",
          "biz_id",
          "Version",
          "VimId",
          "ChassisType",
          "AssetTag",
          "Manufacturer",
          "Model",
          "SerialNumber",
          "PropertySource",
          "PutIntoProductionTime",
          "License",
          "SoftwareVersion",
          "OperationingStatus",
          "PropertyState"
        ],
        "values": [
          [
            7,
            "ZJHZ-NFV3-C-SQ5-3F-C03-hwDA5600-STOR01",
            "",
            "",
            "1081",
            "1081",
            "2.0",
            "1ea72c1b-fc85-4a99-adf8-7488c46d2a07",
            "DiskArray",
            "assetTg",
            "huawei",
            "5600_V3",
            "210235980510H6000012",
            "Property",
            "99days",
            "",
            "3.20.06.102",
            "OK",
            "Used"
          ],
        ]
      }
    }
  }
}

/**
 * 关联对象实例查询
 */
let morel = {
  path: '/datashare-svr/api/morel/:moInstId/:relaitonId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": {
        "headers": [
          "ID",
          "NAME",
          "TIME",
          "EXPIRY_TIME",
          "ext_id",
          "biz_id",
          "接口版本",
          "资源池系统标识",
          "ChassisType",
          "磁阵资产编号",
          "磁阵制造商",
          "磁阵型号",
          "磁阵序列号",
          "磁阵来源",
          "磁阵投入生产运行时间",
          "磁阵License信息",
          "磁阵软件版本",
          "磁阵运行状态",
          "磁阵资产状态"
        ],
        "columns": [
          "ID",
          "NAME",
          "TIME",
          "EXPIRY_TIME",
          "ext_id",
          "biz_id",
          "Version",
          "VimId",
          "ChassisType",
          "AssetTag",
          "Manufacturer",
          "Model",
          "SerialNumber",
          "PropertySource",
          "PutIntoProductionTime",
          "License",
          "SoftwareVersion",
          "OperationingStatus",
          "PropertyState"
        ],
        "values": [
          [
            7,
            "ZJHZ-NFV3-C-SQ5-3F-C03-hwDA5600-STOR01",
            "",
            "",
            "1081",
            "1081",
            "2.0",
            "1ea72c1b-fc85-4a99-adf8-7488c46d2a07",
            "DiskArray",
            "assetTg",
            "huawei",
            "5600_V3",
            "210235980510H6000012",
            "Property",
            "99days",
            "",
            "3.20.06.102",
            "OK",
            "Used"
          ],
          [
            6,
            "ZJHZ-NFV3-B-XSCYY1H2F-D02-hwIPSAN5600-STOR01",
            "",
            "",
            "1043",
            "1043",
            "2.0",
            "1ea72c1b-fc85-4a99-adf8-7488c46d2a07",
            "DiskArray",
            "assetTag",
            "huawei",
            "5600_V3",
            "210235980510H6000014",
            "Property",
            "55days",
            "",
            "3.20.03.201",
            "OK",
            "Used"
          ]
        ],
        "nbVals": 10,
        "offset": 0,
        "totalCount": 2
      }
    }
  }
}

/**
 * 资源树图查询
 */
let querytree = {
  path: '/datashare-svr/api/querytree/:parTreeId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return [
      {
        "nodeLabel": "厂家资源树",
        "nodeId": "1",
        "nodeName": "verdorRes",
        "lablePath": "厂家资源树",
        "dataType": 0,
        "children": [
          {
            "nodeLabel": "主机",
            "nodeId": "2",
            "nodeName": "HOST",
            "lablePath": "厂家资源树/主机",
            "dataType": 1,
            "queryUri": "/datashare-svr/api/moinst/1/querydata",
            "queryMethod": "POST",
            "children": [
              {
                "nodeLabel": "华为",
                "nodeId": "3",
                "nodeName": "VENDOR",
                "lablePath": "厂家资源树/主机/华为",
                "dataType": 1,
                "queryField": "VENDOR",
                "queryValue": "华为",
                "queryUri": "/datashare-svr/api/moinst/1/querydata",
                "queryMethod": "POST",
                "children": [
                  {
                    "nodeLabel": "D04-hpeDL380-COMP09",
                    "nodeId": "4",
                    "nodeName": "D04-hpeDL380-COMP09",
                    "lablePath": "厂家资源树/主机/华为/D04-hpeDL380-COMP09",
                    "dataType": 2,
                    "queryUri": "/datashare-svr/api/moinst/1/4",
                    "queryMethod": "GET"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
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