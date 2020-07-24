// import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from '@utils/model';
// import * as playListDetailApi from './service';

export const enum EffectType {
  effectsDemo = 'playListDetail/effectsDemo'
}

export default modelExtend(model, {
  namespace: 'playListDetail',
  state: {

  },

  effects: {
    // * effectsDemo({ payload }, { call, put }) {
    //   const res = yield call(playListDetailApi.demo, {});
    //   console.log(res);

    //   const {
    //     isOk,
    //     result
    //   } = res;
    //   // TODO: 接口后续处理...
    //   // if (isOk) {
    //   //   yield put({
    //   //     type: 'updateState',
    //   //     payload: {
    //   //     }
    //   //   });
    //   // }
    // }
  }
}) as Model;
