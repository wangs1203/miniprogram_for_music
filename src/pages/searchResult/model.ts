// import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from '@utils/model';
import {
  fetchSearch,
  SearchResultParams
} from './service';

export { SearchResultParams };
export const enum EffectType {
  getSearch = 'searchResult/getSearch'
}
// const codeMap = {
//   1: 'song',
//   1014: 'video',
//   1002: 'user',
//   1009: 'djRadio',
//   1000: 'playList',
//   10: 'album',
//   100: 'artist'
// };
export default modelExtend(model, {
  namespace: 'searchResult',
  state: {
    totalInfo: {},
    song: {},
    video: {},
    user: {},
    djRadio: {},
    playList: {},
    album: {},
    artist: {}
  },
  effects: {
    * getSearch ({ payload }:{payload:SearchResultParams}, { call, put, select }) {
      const searchResult = yield select((state) => state.searchResult);
      console.log(searchResult);
      const {
        song,
        album,
        artist,
        playList,
        user,
        djRadio,
        video
      } = searchResult;
      const offsetMap = {
        1: song.songs && song.songs.length ? song.songs.length : 0,
        10: album.albums && album.albums.length ? album.albums.length : 0,
        100: artist.artists && artist.artists.length ? artist.artists.length : 0,
        1000: playList.playLists && playList.playLists.length ? playList.playLists.length : 0,
        1002: user.users && user.users.length ? user.users.length : 0,
        1004: user.users && user.users.length ? user.users.length : 0,
        1009: djRadio.djRadios && djRadio.djRadios.length ? djRadio.djRadios.length : 0,
        1014: video.videos && video.videos.length ? video.videos.length : 0
      };
      const queryData = {
        ...payload,
        limit: 30,
        offset: offsetMap[payload.type]
      };
      const res = yield call(fetchSearch, payload.type === '1018' ? payload : queryData);
      console.log(res);
      const {
        isOk,
        result
      } = res;
      if (isOk && result && Object.keys(result).length) {
        const totalInfo = result;
        const actionObj: {
          type:string,
          payload:any
        } = payload.type === '1018' ? ({
          type: 'updateState',
          payload: {
            totalInfo
          }
        }) : ({
          type: 'updateSearch',
          payload: {
            type: payload.type,
            result
          }
        });
        yield put(actionObj);
      }
    }
  },
  reducers: {
    updateSearch (state, { payload }) {
      console.log('updateSearch->>>>>>>>');
      console.log(payload);
      console.log(state);
      // return {
      //   ...state,
      //   ...payload
      // };
    }
  }
}) as Model;
