// import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from '@utils/model';
import {
  likelistParams,
  fetchLikeList,
} from './service';

export const enum EffectType {
  getLikeList = 'songDetail/getLikeList'
}

export { likelistParams };

export default modelExtend(model, {
  namespace: 'songDetail',
  state: {
    likeMusicList: []
  },
  effects: {
    * getLikeList({ payload }:{payload: likelistParams}, { call, put }) {
      const res = yield call(fetchLikeList,{uid: payload.uid});
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
  }
}) as Model;
