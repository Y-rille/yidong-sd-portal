// tslint:disable
import { expect, assert } from 'chai';
import * as deepFreeze from 'deep-freeze';
import { SettingState, settingReducer } from '../index';

// http://chaijs.com/api/assert/

describe('performanceReducer', () => {
  it(`获取 TimeFilter 应该为 Array`, () => {
    let initialState = undefined;
    let action = {
      "type": "PERFORMANCE_GET_TIME_FILTER",
      "timeFilter": [
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

    };
    let finalState = performanceReducer(initialState, action);
    assert.isDefined(finalState)
    assert.isArray(finalState.timeFilter)
  });

  it(`获取 nfvdPm 应该为 Object`, () => {
    let initialState = undefined;
    let action = {
      "type": "PERFORMANCE_SAY_HELLO",
      "nfvdPm":
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
    };
    let finalState = performanceReducer(initialState, action);
    assert.isDefined(finalState)
    assert.isObject(finalState.nfvdPm)
  });
})

