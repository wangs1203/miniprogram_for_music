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
        let { userInfo } = payload;
        const userId = userInfo.account && userInfo.account.id
          ? userInfo.account.id
          : userInfo.profile.userId;

        userInfo = {
          ...(state.userInfo ? state.userInfo : {}),
          ...userInfo
        };
        Taro.setStorageSync('userInfo', userInfo);
        Taro.setStorageSync('userId', userId);
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
