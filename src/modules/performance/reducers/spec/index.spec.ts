// tslint:disable
import { expect, assert } from 'chai';
import * as deepFreeze from 'deep-freeze';
import { PerformanceState, performanceReducer } from '../index';

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
})

