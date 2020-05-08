// import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from 'utils/model';
import {
  fetchUserSubCount,
  fetchUserDetail,
  fetchLogout,
  fetchUserPlayList,
  fetchUserDetailParams,
  fetchUserPlayListParams
} from './service';


export { fetchUserDetailParams, fetchUserPlayListParams };

export const enum EffectType {
  getUserSubCount = 'personalCenter/getUserSubCount',
  getUserDetail = 'personalCenter/getUserDetail',
  getLogout = 'personalCenter/getLogout',
  getUserPlayList = 'personalCenter/getUserPlayList'
}
export default modelExtend(model, {
  namespace: 'personalCenter',
  state: {
    userCreateList: [],
    userCollectList: []
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
    },

    * getUserPlayList ({ payload }: {payload:fetchUserPlayListParams}, { call, put }) {
      const res = yield call(fetchUserPlayList, payload);
      console.log(res);
      const {
        isOk,
        result
      } = res;
      if (isOk && result.playlist && result.playlist.length > 0) {
        const userCreateList = result.playlist.filter((item) => item.userId === payload.uid);
        const userCollectList = result.playlist.filter((item) => item.userId !== payload.uid);
        yield put({
          type: 'updateState',
          payload: {
            userCreateList,
            userCollectList
          }
        });
      }
    }
  }
}) as Model;
