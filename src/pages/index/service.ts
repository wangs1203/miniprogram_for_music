import Request from 'services/http';
import {
  BannerURL,
  RecommendSongListURL,
  LeaderboardURL,
  DjProgramURL
} from 'services/apis';

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
 * 推荐电台
 */
export const fetchDjProgram = (
  params: {
    limit: number
  }
) => Request.post({ url: DjProgramURL, data: params });
