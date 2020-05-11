// import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from 'utils/model';
import * as searchApi from './service';

export const enum EffectType {
  getHotSearch = 'search/getHotSearch'
}

export default modelExtend(model, {
  namespace: 'search',
  state: {
    hotList: []
  },
  effects: {
    * getHotSearch (_, { call, put }) {
      const res = yield call(searchApi.fetchHotSearch);
      console.log(res);
      const {
        isOk,
        result
      } = res;
      if (isOk && result.data && result.data.length) {
        yield put({
          type: 'updateState',
          payload: {
            hotList: result.data
          }
        });
      }
    }
  }
}) as Model;
