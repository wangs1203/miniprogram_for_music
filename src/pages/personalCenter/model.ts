import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from 'utils/model';
import {
  fetchUserSubCount,
  fetchUserDetail,
  fetchLogout

} from './service';

export { fetchUserDetailParams } from './service';

export const enum EffectType {
  getUserSubCount = 'personalCenter/getUserSubCount',
  getUserDetail = 'personalCenter/getUserDetail',
  getLogout = 'personalCenter/getLogout'
}
export default modelExtend(model, {
  namespace: 'personalCenter',
  state: {

  },

  effects: {

    * getUserSubCount ({ payload }, { call }) {
      const res = yield call(fetchUserSubCount);
      console.log(res, payload);
    },

    * getUserDetail ({ payload }, { call, put }) {
      const res = yield call(fetchUserDetail, payload);
      console.log(res);
      const {
        isOk,
        result
      } = res;
      if (isOk) {
        yield put({
          type: 'common/updateUserInfo',
          payload: {
            userInfo: result
          }
        });
      }
    },

    * getLogout (_, { call, put }) {
      const res = yield call(fetchLogout);
      const {
        isOk
      } = res;
      if (isOk) {
        yield put({
          type: 'common/updateUserInfo'
        });
      }
      console.log(res);
    }
  }
}) as Model;
