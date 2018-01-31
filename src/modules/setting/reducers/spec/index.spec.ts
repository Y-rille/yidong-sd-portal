// tslint:disable
import { expect, assert } from 'chai';
import * as deepFreeze from 'deep-freeze';
import { SettingState, settingReducer } from '../index';

// http://chaijs.com/api/assert/

describe('settingReducer', () => {
  it(`获取 userList 应该为 Object`, () => {
    let initialState = undefined;
    let action = {
      "type": "SETTING_SAY_HELLO",
      "userList":
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
    let finalState = settingReducer(initialState, action);
    assert.isDefined(finalState)
    assert.isObject(finalState.userList)
  });
})

