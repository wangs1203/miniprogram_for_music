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
  getSearch = 'searchResult/getSearch',
  updateState = 'searchResult/updateState'
}
export default modelExtend(model, {
  namespace: 'searchResult',
  state: {
    totalInfo: {},
    song: {
      songs: [],
      more: true,
      moreText: ''
    },
    video: {
      videos: [],
      more: true
    },
    user: {},
    djRadio: {},
    playList: {
      playLists: [],
      more: true,
      moreText: ''
    },
    album: {
      albums: [],
      more: true
    },
    artist: {
      artists: [],
      more: true
    }
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
      let ret:any = {};
      switch (payload.type) {
        case '1': {
          const tempSongList = payload.result.songs.map((item) => {
            item.al = item.album;
            item.ar = item.artists;
            return item;
          });
          const songs = state.song.songs.concat(tempSongList);
          const more = songs.length < payload.result.songCount;
          ret = {
            ...state,
            song: {
              songs,
              more
            }
          };
          break;
        }
        case '1000': {
          const playLists = state.playList.playLists.concat(payload.result.playlists);
          const more = playLists.length < payload.result.playlistCount;
          ret = {
            ...state,
            playList: {
              playLists,
              more
            }
          };
          break;
        }
        case '1014': {
          const videos = state.video.videos.concat(payload.result.videos);
          const more = videos.length < payload.result.videoCount;
          ret = {
            ...state,
            video: {
              videos,
              more
            }
          };
          break;
        }
        case '100': {
          const artists:[] = state.artist.artists.concat(payload.result.artists);
          const more = artists.length < payload.result.artistCount;
          ret = {
            ...state,
            artist: {
              artists,
              more
            }
          };
          break;
        }
        case '10': {
          const albums:[] = state.album.albums.concat(payload.result.albums);
          const more = albums.length < payload.result.albumCount;
          ret = {
            ...state,
            album: {
              albums,
              more
            }
          };
          break;
        }
        default:
          ret = {
            ...state
          };
          break;
      }
      return ret;
    }
  }
}) as Model;
