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

let getData = {
  path: '/datashare-svr/api/kpi/getData/:packageId',
  method: 'GET',
  cache: false,
  template: (params, query, body) => {
    return {
      "headers": [
        "EVENT_TIMESTAMP",
        "T_HOST",
        "3",
        "5",
        "1",
        "2",
        "4",
        "6"
      ],
      "values": [
        [
          1514910600000,
          "D03-hpeDL380-COMP04",
          257328,
          0,
          0,
          5.0799,
          13072,
          0
        ],
        [
          1514910600000,
          "D03-hpeDL380-COMP03",
          257328,
          0,
          0,
          52.0363,
          133904,
          0
        ],
        [
          1514911500000,
          "D03-hpeDL380-COMP04",
          257328,
          0,
          0,
          5.0799,
          13072,
          0
        ],
        [
          1514911500000,
          "D03-hpeDL380-COMP03",
          257328,
          0,
          0,
          52.0363,
          133904,
          0
        ],
        [
          1514912400000,
          "D03-hpeDL380-COMP03",
          257328,
          0,
          0,
          52.0363,
          133904,
          0
        ],
        [
          1514912400000,
          "D03-hpeDL380-COMP04",
          257328,
          0,
          0,
          5.0799,
          13072,
          0
        ],
        [
          1514913300000,
          "D03-hpeDL380-COMP04",
          257328,
          0,
          0,
          5.0799,
          13072,
          0
        ],
        [
          1514913300000,
          "D03-hpeDL380-COMP03",
          257328,
          0,
          0,
          52.0363,
          133904,
          0
        ],
        [
          1514914200000,
          "D03-hpeDL380-COMP04",
          257328,
          0,
          0,
          5.0799,
          13072,
          0
        ],
        [
          1514914200000,
          "D03-hpeDL380-COMP03",
          257328,
          0,
          0,
          52.0363,
          133904,
          0
        ]
      ],
      "status": "OK",
      "nbVals": 10,
      "timeColumn": "EVENT_TIMESTAMP",
      "statusInfo": "",
      "offset": 0,
      "totalCount": 10
    }
  }
}

module.exports = {
  getPackages,
  getMatchingDimensions,
  getTimeFilter,
  getKpiThresholds,
  getData
}