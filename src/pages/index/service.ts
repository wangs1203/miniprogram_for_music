import Request from 'services/http';
import {
  BannerURL,
  RecommendSongListURL,
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
 * 获取前序航班动态列表
 */
export const getDjProgram = () => Request.post({ url: DjProgramURL });
