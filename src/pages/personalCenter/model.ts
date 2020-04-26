// import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from 'utils/model';
import {
  fetchUserSubCount

} from './service';

export const enum EffectType {
  getUserSubCount = 'personalCenter/getUserSubCount'
}
export default modelExtend(model, {
  namespace: 'personalCenter',
  state: {

  },
  effects: {

    * getUserSubCount ({ payload }, { call }) {
      const res = yield call(fetchUserSubCount);
      console.log(res, payload);
    }

  }
}) as Model;
