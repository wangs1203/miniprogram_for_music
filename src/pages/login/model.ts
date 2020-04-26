// import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from 'utils/model';
import * as loginApi from './service';

export const enum EffectType {
  effectsDemo = 'login/effectsDemo'
}

export default modelExtend(model, {
  namespace: 'login',
  state: {

  },

  effects: {
    * effectsDemo({ payload }, { call, put }) {
      const res = yield call(loginApi.demo, {});
      console.log(res);

      const {
        isOk,
        result
      } = res;
      // TODO: 接口后续处理...
      // if (isOk) {
      //   yield put({
      //     type: 'updateState',
      //     payload: {
      //     }
      //   });
      // }
    },
  }
}) as Model;
