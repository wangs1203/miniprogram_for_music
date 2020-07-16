// import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from '@utils/model';
import {
  likelistParams,
  fetchLikeList,
  likeMusicParams,
  fetchLikeMusic
} from './service';

export const enum EffectType {
  getLikeList = 'songDetail/getLikeList',
  getLikeMusic = 'songDetail/getLikeMusic',
  updateState = 'songDetail/updateState'
}

export { likelistParams, likeMusicParams };

export default modelExtend(model, {
  namespace: 'songDetail',
  state: {
    likeMusicList: []
  },
  effects: {
    * getLikeList ({ payload }:{payload: likelistParams}, { call, put }) {
      const res = yield call(fetchLikeList, { uid: payload.uid });
      console.log(res);
      const {
        isOk,
        result
      } = res;
      if (isOk) {
        yield put({
          type: 'updateState',
          payload: {
            likeMusicList: result.ids || []
          }
        });
      }
    },

    * getLikeMusic ({ payload }:{payload: likeMusicParams}, { call, put, select }) {
      // { id: payload.id, like: payload.like }
      const res = yield call(fetchLikeMusic, payload);
      console.log(res);
      const {
        isOk
      } = res;
      if (isOk) {
        const { like, id } = payload;
        const songDetail:{
          likeMusicList: number[]
        } = yield select((state) => state.songDetail);
        console.log(songDetail);
        let list: number[] = [];
        if (like) {
          list = songDetail.likeMusicList.concat([id]);
        } else {
          songDetail.likeMusicList.forEach((item) => {
            item !== id && list.push(item);
          });
        }
        yield put({
          type: 'updateState',
          payload: {
            likeMusicList: list
          }
        });
      }
    }

  }
}) as Model;
