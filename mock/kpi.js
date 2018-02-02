let getPackages = {
  path: '/datashare-svr/api/kpi/getPackages',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return [
      {
        "id": "value_pack_nfvd_pm",
        "name": "Value Pack NFVD PM",
        "description": "this is a NFVD PM value pack",
        "version": "1.0",
        "author": "HPE",
        "domain": "nfvd_pm",
        "active": true,
        "dimensionTree": {
          "folders": [{
            "description": "NFVD_PM",
            "dimensions": [
              {
                "id": "T_DISKARRAY",
                "name": "磁阵",
                "type": "STRING",
                "lowCardinality": true
              }
            ],
            "name": "NFVD_PM"
          }]
        },
        "factTree": {
          "folders": [
            {
              "description": "",
              "folders": [{
                "description": "15分钟粒度",
                "facts": [
                  {
                    "id": "19",
                    "name": "磁阵总容量",
                    "description": "磁阵总容量",
                    "type": "NUMBER",
                    "unit": "GB",
                    "worstOrdering": "DESC"
                  }
                ],
                "name": "15Minutes"
              }],
              "name": "磁阵"
            }
          ]
        },
        "relations": [
          {
            "dimensions": ["T_DISKARRAY"],
            "facts": [
              "19"
            ]
          }
        ]
      }
    ]
  }
}

// 对象指标查询
let getMoTypeKpis = {
  path: '/datashare-svr/api/kpi/getMoTypeKpis/:moTypeId/:timeDimensionId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": [
        {
          "kpiId": 6,
          "kpiName": "主机.网络端口接收速率",
          "kpiRealName": "网络端口接收速率",
          "mogrpId": 1,
          "kpiDesc": "计算节点必选，所有业务端口接收速率的总和（1B=8b）",
          "kpiCategory": "PI",
          "kpiType": 2,
          "kpiUnit": "Mbps",
          "kpiAlgorithm": "采集",
          "dimensionId": 7,
          "priority": 1,
          "kpiTablefield": "NicReceiveRate",
          "version": "1.0",
          "maxValue": "0",
          "minValue": "1024",
          "state": 1
        },
        {
          "kpiId": 5,
          "kpiName": "主机.网络端口发送速率",
          "kpiRealName": "网络端口发送速率",
          "mogrpId": 1,
          "kpiDesc": "计算节点必选，所有业务端口发送速率的总和（1B=8b）",
          "kpiCategory": "PI",
          "kpiType": 2,
          "kpiUnit": "Mbps",
          "kpiAlgorithm": "采集",
          "dimensionId": 7,
          "priority": 1,
          "kpiTablefield": "NicTransferRate",
          "version": "1.0",
          "maxValue": "0",
          "minValue": "1024",
          "state": 1
        },
        {
          "kpiId": 3,
          "kpiName": "主机.总内存",
          "kpiRealName": "总内存",
          "mogrpId": 1,
          "kpiCategory": "PI",
          "kpiType": 2,
          "kpiUnit": "MB",
          "kpiAlgorithm": "采集",
          "dimensionId": 7,
          "priority": 1,
          "kpiTablefield": "RamTotal",
          "version": "1.0",
          "maxValue": "0",
          "minValue": "131072",
          "state": 1
        },
        {
          "kpiId": 2,
          "kpiName": "主机.内存使用率",
          "kpiRealName": "内存使用率",
          "mogrpId": 1,
          "kpiCategory": "PI",
          "kpiType": 2,
          "kpiUnit": "%",
          "kpiAlgorithm": "采集",
          "dimensionId": 7,
          "priority": 1,
          "kpiTablefield": "RamUtil",
          "version": "1.0",
          "maxValue": "0",
          "minValue": "100",
          "state": 1
        },
        {
          "kpiId": 1,
          "kpiName": "主机.CPU使用率",
          "kpiRealName": "CPU使用率",
          "mogrpId": 1,
          "kpiDesc": "总CPU使用率/CPU数量",
          "kpiCategory": "PI",
          "kpiType": 2,
          "kpiUnit": "%",
          "kpiAlgorithm": "采集",
          "dimensionId": 7,
          "priority": 1,
          "kpiTablefield": "CpuUtil",
          "version": "1.0",
          "maxValue": "0",
          "minValue": "100",
          "state": 1
        },
        {
          "kpiId": 4,
          "kpiName": "主机.可用内存",
          "kpiRealName": "可用内存",
          "mogrpId": 1,
          "kpiDesc": "",
          "kpiCategory": "PI",
          "kpiType": 2,
          "kpiUnit": "MB",
          "kpiAlgorithm": "采集",
          "dimensionId": 7,
          "priority": 1,
          "kpiTablefield": "RamUsed",
          "mogrpCnname": "主机",
          "mogrpEnname": "HOST",
          "version": "1.0",
          "maxValue": "0",
          "minValue": "131072",
          "state": 1
        }
      ]
    }
  }
}

let getMatchingDimensions = {
  path: '/datashare-svr/api/kpi/getMatchingDimensions/:packageId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "headers": ["NAME"],
      "values": [
        ["D03-hpeDL380-COMP02"],
        ["D03-hpeDL380-COMP02"],
        ["D03-hpeDL380-COMP02"],
        ["D03-hpeDL380-COMP02"],
        ["D03-hpeDL380-COMP02"],
        ["D03-hpeDL380-COMP02"],
        ["D03-hpeDL380-COMP02"],
        ["D03-hpeDL380-COMP02"],
        ["D03-hpeDL380-COMP02"],
        ["D03-hpeDL380-COMP02"]
      ],
      "nbVals": 10,
      "offset": 0,
      "totalCount": 10
    }
  }
}

// 时间条件查询
let getTimeFilter = {
  path: '/datashare-svr/api/kpi/getTimeFilter',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": [
        {
          "timeFilterId": 5,
          "timeFilterName": "过去1周同15分钟",
          "timeFilterDesc": "过去1周同15分钟粒度筛选",
          "version": "1.0"
        },
        {
          "timeFilterId": 6,
          "timeFilterName": "过去2周同15分钟",
          "timeFilterDesc": "过去2周同15分钟粒度筛选",
          "version": "1.0"
        }
      ]
    }
  }
}

// 指标阈值查询
let getKpiThresholds = {
  path: '/datashare-svr/api/kpi/getKpiThresholds/:kpiId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": [
        {
          "thresholdId": 1,
          "kpiId": 1,
          "criticalThresholdOperator": ">",
          "criticalThresholdValue": "40",
          "majorThresholdOperator": ">",
          "majorThresholdValue": "30",
          "minorThresholdOperator": ">",
          "minorThresholdValue": "20",
          "normalThresholdOperator": ">",
          "normalThresholdValue": "-1",
          "state": 1
        }
      ]
    }
  }
}

// 对象实例阈值
let getMoInstKpiThresholds = {
  path: '/datashare-svr/api/kpi/getMoInstKpiThresholds/:moTypeId/:moInstId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "code": 1,
      "data": [
        {
          "thresholdId": 1,
          "kpiId": 5,
          "criticalThresholdOperator": ">",
          "criticalThresholdValue": "40",
          "majorThresholdOperator": ">",
          "majorThresholdValue": "30",
          "minorThresholdOperator": ">",
          "minorThresholdValue": "20",
          "normalThresholdOperator": ">",
          "normalThresholdValue": "-1",
          "state": 1
        }
      ]
    }
  }
}

// 指标数据查询
let getData = {
  path: '/datashare-svr/api/kpi/getData/:packageId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return query.timeFilter ? {
      "headers": [
        "EVENT_TIMESTAMP",
        "T_HOST",
        "4",
        "5",

      ],
      "values": [
        [
          1514977200000,
          "D03-hpeDL380-COMP04",
          13072,
          34523
        ],
        [
          1514978100000,
          "D03-hpeDL380-COMP04",
          12543,
          22111
        ],
        [
          1514979000000,
          "D03-hpeDL380-COMP04",
          32121,
          43212
        ],
        [
          1514979900000,
          "D03-hpeDL380-COMP04",
          13072,
          34523
        ],
        [
          1514980800000,
          "D03-hpeDL380-COMP04",
          13072,
          34523
        ],
        [
          1514981700000,
          "D03-hpeDL380-COMP04",
          13072,
          34523
        ],
        [
          1514982600000,
          "D03-hpeDL380-COMP04",
          13072,
          34523
        ],
        [
          1514982600000,
          "D03-hpeDL380-COMP04",
          12345,
          12345
        ],
        [
          1514983500000,
          "D03-hpeDL380-COMP04",
          13072,
          34523
        ],
        [
          1514984400000,
          "D03-hpeDL380-COMP04",
          13072,
          34523
        ],
        [
          1514985300000,
          "D03-hpeDL380-COMP04",
          11111,
          13222
        ],
        [
          1514986200000,
          "D03-hpeDL380-COMP04",
          13221,
          23111
        ],
        [
          1514987100000,
          "D03-hpeDL380-COMP04",
          13072,
          13211
        ]
      ],
      "status": "OK",
      "nbVals": 13,
      "timeColumn": "EVENT_TIMESTAMP",
      "statusInfo": "",
      "offset": 0,
      "totalCount": 13
    } : {
        "headers": [
          "EVENT_TIMESTAMP",
          "T_HOST",
          "4"
        ],
        "values": [
          [
            1514977200000,
            "D03-hpeDL380-COMP04",
            13072
          ]
        ],
        "status": "OK",
        "nbVals": 1,
        "timeColumn": "EVENT_TIMESTAMP",
        "statusInfo": "",
        "offset": 0,
        "totalCount": 1
      }
  }
}

module.exports = {
  getPackages,
  getMoTypeKpis,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getMoInstKpiThresholds,
  getData
}