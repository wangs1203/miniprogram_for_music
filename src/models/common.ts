import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from 'utils/model';

export const enum CommonEffectType {

}
export default modelExtend(model, {
  namespace: 'common',
  state: {
    userInfo: Taro.getStorageSync('userInfo'),
    userId: ''
  },

  reducers: {
    updateUserInfo (state, { payload }) {
      if (payload) {
        const {
          userInfo,
          userId
        } = payload;

        Taro.setStorageSync('userInfo', {
          ...(state.userInfo ? state.userInfo : {}),
          ...userInfo
        });
        userId && Taro.setStorageSync('userId', userId);
        return {
          ...state,
          userInfo,
          userId
        };
      }
      Taro.clearStorage();
      return {
        userInfo: {},
        userId: ''
      };
    }
  }

}) as Model;
