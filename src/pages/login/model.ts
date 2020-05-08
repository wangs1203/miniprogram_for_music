import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from 'utils/model';
import * as loginApi from './service';

export { loginParams } from './service';
export const enum EffectType {
  getLogin = 'login/getLogin'
}

export default modelExtend(model, {
  namespace: 'login',
  state: {
  },
  effects: {

    * getLogin ({ payload }, { call, put }) {
      console.log(loginApi);
      const res = yield call(loginApi.fetchLogin, payload);
      console.log(res);
      const {
        isOk,
        result
      } = res;
      if (isOk) {
        yield put({
          type: 'common/updateUserInfo',
          payload: { userInfo: result }
        });
        Taro.navigateBack();
      }
    }
  }
}) as Model;
