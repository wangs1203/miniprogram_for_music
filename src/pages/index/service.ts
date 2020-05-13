import Request from '@services/http';
import {
  BannerURL,
  RecommendSongListURL,
  RecommendMVListURL,
  DjProgramURL,
  LeaderboardURL,
  TopPlayListURL,
  PlayListClassificationURL
} from '@services/apis';

/**
 * 获取banner
 */
export const fetchBanner = () => Request.post({ url: BannerURL });

/**
 * 获取推荐歌单
 */
export const fetchRecommendSongList = (
  params:{
    limit:number
  }
) => Request.post({ url: RecommendSongListURL, data: params });

/**
 * 推荐MV
 */
export const fetchRecommendMVList = () => Request.post({ url: RecommendMVListURL });

/**
 * 推荐电台
 */
export const fetchDjProgram = (
  params: {
    limit: number
  }
) => Request.post({ url: DjProgramURL, data: params });

/**
 * 排行榜
 * 说明 : 调用此接口 , 传入数字 idx, 可获取不同排行榜
 * @param params
 * @param {number} params.idx
 */
export const fetchLeaderboard = (
  params: {
    idx: number
  }
) => Request.post({ url: LeaderboardURL, data: params });

/**
 * 歌单分类
 */
export const fetchPlayListClass = () => Request.post({ url: PlayListClassificationURL });

/**
 * 歌单 ( 网友精选碟 )
 * 可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ",
 * 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * @param params
 * @param {number} params.idx
 */
export const fetchTopPlayList = (
  params: {
    order?: number,
    limit?: number,
    cat?: string
  }
) => Request.post({ url: TopPlayListURL, data: params });
