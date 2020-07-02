import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from '@utils/model';
import {
  fetchCheckMusic,
  fetchCheckMusicParam,
  fetchSongDetail,
  fetchSongUrl,
  fetchSongLyric,
  fetchSongDetailParam,
  fetchSongUrlParam,
  fetchSongLyricParam
} from '@/services/common';

export {
  fetchCheckMusicParam,
  fetchSongUrlParam,
  fetchSongLyricParam,
  fetchSongDetailParam,
};

export const enum CommonEffectType {
  getCheckMusic = 'common/getCheckMusic',
  getSongDetail = 'common/getSongDetail'
}

export default modelExtend(model, {
  namespace: 'common',
  state: {
    userInfo: Taro.getStorageSync('userInfo'),
    userId: ''
  },
  effects: {
    * getCheckMusic ({ payload }:{payload:fetchCheckMusicParam}, { call, put, select }) {
      const res = yield call(fetchCheckMusic, payload);
      console.log(res);
      if(res.isOk){
        Taro.navigateTo({
          url: `/pages/songDetail/index?id=${payload.id}`
        });
      }
    },

    * getSongDetail ({ payload }:{payload:{id:string}}, { call, put }) {
      const detailRes = yield call(fetchSongDetail, {ids: payload.id})
      console.log(detailRes);
      if(detailRes.isOk){
        const urlRes = yield call(fetchSongUrl, {id:payload.id} as fetchSongUrlParam)
      }
    }
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
