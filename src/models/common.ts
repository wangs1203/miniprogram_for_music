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
  fetchPlaylistDetail,
  fetchSongDetailParam,
  fetchSongUrlParam,
  fetchSongLyricParam,
  fetchPlaylistDetailParam
} from '@/services/common';
import {
  parseLrc
} from '@/utils/common';

export {
  fetchCheckMusicParam,
  fetchSongUrlParam,
  fetchSongLyricParam,
  fetchSongDetailParam,
  fetchPlaylistDetailParam
};

export const enum CommonEffectType {
  updateState = 'common/updateState',
  getCheckMusic = 'common/getCheckMusic',
  getSongDetail = 'common/getSongDetail',
  getPlaylistDetail = 'common/getPlaylistDetail',
}

export default modelExtend(model, {
  namespace: 'common',
  state: {
    userInfo: Taro.getStorageSync('userInfo'),
    userId: '',
    currentSongInfo: {
      id: 0,
      name: '',
      ar: [],
      al: {
        picUrl: '',
        name: ''
      },
      url: '',
      lrcInfo: '',
      dt: 0, // 总时长，ms
      st: 0 // 是否喜欢
    },
    canPlayList: [],
    currentSongIndex: 0,
    isPlaying: false,
    playMode: 'loop',
    playListDetailInfo: {
      coverImgUrl: '',
      name: '',
      playCount: 0,
      tags: [],
      creator: {
        avatarUrl: '',
        nickname: ''
      },
      tracks: []
    },
    playListDetailPrivileges: []
  },
  effects: {
    * getCheckMusic ({ payload }:{payload:fetchCheckMusicParam}, { call }) {
      const res = yield call(fetchCheckMusic, payload);
      console.log(res);
      if (res.isOk) {
        Taro.navigateTo({
          url: `/pages/songDetail/index?id=${payload.id}`
        });
      }
    },

    * getSongDetail ({ payload }:{payload:{id:number}}, { call, put }) {
      const detailRes = yield call(fetchSongDetail, { ids: payload.id });
      // console.log(detailRes);
      let urlRes:any;
      if (detailRes.isOk) {
        const songInfo = detailRes.result.songs[0];
        urlRes = yield call(fetchSongUrl, { id: payload.id });
        // console.log(urlRes);
        if (urlRes.isOk) {
          songInfo.url = urlRes.result.data[0].url;
          const LyricRes = yield call(fetchSongLyric, { id: payload.id } as fetchSongLyricParam);
          // console.log(LyricRes);
          if (LyricRes.isOk) {
            const lrc = parseLrc(LyricRes.result.lrc && LyricRes.result.lrc.lyric ? LyricRes.result.lrc.lyric : '');
            console.log(lrc);
            LyricRes.result.lrclist = lrc.nowLrc;
            LyricRes.result.scroll = lrc.scroll;
            songInfo.lrcInfo = LyricRes.result;
            yield put({
              type: 'updateSongInfo',
              payload: { currentSongInfo: songInfo }
            });
          } else {
            console.error('获取歌词失败');
            yield put({
              type: 'updateSongInfo',
              payload: { currentSongInfo: songInfo }
            });
          }
        } else {
          console.error('获取歌曲url失败');
          yield put({
            type: 'updateSongInfo',
            payload: { currentSongInfo: songInfo }
          });
        }
      }
    },

    * getPlaylistDetail ({ payload }:{payload:fetchPlaylistDetailParam}, { call, put }) {
      const listRes = yield call(fetchPlaylistDetail, payload);
      console.log(listRes);
      if (listRes.isOk) {
        const playListDetailInfo = listRes.result.playlist;
        playListDetailInfo.tracks = playListDetailInfo.tracks.map((item) => {
          const temp: any = {};
          temp.name = item.name;
          temp.id = item.id;
          temp.ar = item.ar;
          temp.al = item.al;
          temp.copyright = item.copyright;
          return temp;
        });
        yield put({
          type: 'updateState',
          payload: {
            playListDetailInfo,
            playListDetailPrivileges: listRes.result.privileges
          }
        });
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
        ...state,
        userInfo: {},
        userId: ''
      };
    },

    updateSongInfo (state, { payload }) {
      const { currentSongInfo } = payload;
      const currentSongIndex = state.canPlayList.findIndex((item) => item.id === currentSongInfo.id);
      state.canPlayList.map((item, index) => {
        item.current = false;
        if (currentSongIndex === index) {
          item.current = true;
        }
        return item;
      });
      return {
        ...state,
        currentSongInfo,
        currentSongIndex,
        canPlayList: state.canPlayList
      };
    }
  }

}) as Model;
