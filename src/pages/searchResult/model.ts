// import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from '@utils/model';
import {
  fetchSearch,
  SearchResultParams
} from './service';

export { SearchResultParams };
export const enum EffectType {
  getSearch = 'searchResult/getSearch'
}

export default modelExtend(model, {
  namespace: 'searchResult',
  state: {
    totalInfo: {}
  },
  effects: {
    * getSearch ({ payload }:{payload:SearchResultParams}, { call, put }) {
      const res = yield call(fetchSearch, payload);
      console.log(res);
      const {
        isOk,
        result
      } = res;
      // TODO: 接口后续处理...
      if (isOk && result && Object.keys(result).length) {
        const totalInfo = result;
        yield put({
          type: 'updateState',
          payload: {
            totalInfo
          }
        });
      }
    }
  }
}) as Model;
