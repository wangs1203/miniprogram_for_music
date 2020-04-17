// import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from 'utils/model';
import {
  fetchBanner,
  fetchRecommendSongList,
  fetchRecommendMVList,
  fetchDjProgram,
  fetchLeaderboard,
  fetchTopPlayList,
  fetchPlayListClass
} from './service';

export const enum IndexEffectType {
  getBanner = 'index/getBanner',
  getRecommendSongList = 'index/getRecommendSongList',
  getRecommendMVList = 'index/getRecommendMVList',
  getDjProgram = 'index/getDjProgram',
  getLeaderboard = 'index/getLeaderboard',
  getTopPlayList = 'index/getTopPlayList',
  getPlayListClass = 'index/getPlayListClass'
}
export default modelExtend(model, {
  namespace: 'index',
  state: {
    bannerList: [],
    djProgramList: [],
    recommendMVList: [],
    recommendSongList: []
  },
  effects: {

    * getBanner ({ payload }, { call, put }) {
      const res = yield call(fetchBanner);
      console.log(res);
      const {
        isOk,
        result
      } = res;
      if (isOk) {
        yield put({
          type: 'updateState',
          payload: {
            bannerList: result.banners
          }
        });
      }
    },

    * getRecommendMVList ({ payload }, { call, put }) {
      const res = yield call(fetchRecommendMVList);
      console.log(res);
      const {
        isOk,
        result
      } = res;
      if (isOk) {
        yield put({
          type: 'updateState',
          payload: {
            recommendMVList: result
          }
        });
      }
    },

    * getRecommendSongList ({ payload }, { call, put }) {
      const res = yield call(fetchRecommendSongList, { limit: 6 });
      console.log(res);
      const {
        isOk,
        result
      } = res;
      if (isOk) {
        yield put({
          type: 'updateState',
          payload: {
            recommendSongList: result
          }
        });
      }
    },

    * getDjProgram ({ payload }, { call, put }) {
      const res = yield call(fetchDjProgram, { limit: 6 });
      console.log(res);
      const {
        isOk,
        result
      } = res;
      if (isOk) {
        yield put({
          type: 'updateState',
          payload: {
            djProgramList: result
          }
        });
      }
    },

    * getLeaderboard ({ payload }, { call }) {
      const res = yield call(fetchLeaderboard, { idx: 1 });
      console.log(res);
    },

    * getTopPlayList ({ payload }, { call }) {
      const res = yield call(fetchTopPlayList, { order: 'hot', cat: '全部' });
      console.log(res);
    },

    * getPlayListClass ({ payload }, { call }) {
      const res = yield call(fetchPlayListClass);
      console.log(res);
    }
  }
}) as Model;
