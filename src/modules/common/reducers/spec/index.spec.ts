// tslint:disable
import { expect, assert } from 'chai';
import * as deepFreeze from 'deep-freeze';
import { CommonState, commonReducer } from '../index';

// http://chaijs.com/api/assert/

describe('commonReducer', () => {
  it(`获取 tree 应该为Array`, () => {
    let initialState = undefined;
    let action = {
      "type": "COMMON_GET_QUERYTREE",
      "tree": [
        {
          "nodeLabel": "厂家资源树",
          "nodeId": "1",
          "nodeName": "verdorRes",
          "labelPath": "厂家资源树",
          "dataType": 0,
          "children": [
            {
              "nodeLabel": "主机",
              "nodeId": "2",
              "nodeName": "HOST",
              "labelPath": "厂家资源树/主机",
              "dataType": 1,
              "queryUri": "/datashare-svr/api/moinst/1/querydata",
              "queryMethod": "POST",
              "children": [
                {
                  "nodeLabel": "华为",
                  "nodeId": "3",
                  "nodeName": "VENDOR",
                  "labelPath": "厂家资源树/主机/华为",
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
                      "labelPath": "厂家资源树/主机/华为/D04-hpeDL380-COMP09",
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
    };
    let finalState = commonReducer(initialState, action);
    assert.isDefined(finalState)
    assert.isArray(finalState.tree)
  });
})

