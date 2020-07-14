import Request from '@services/http';
import {
  // songDetailURL
  likeListURL,
  likeMusicURL
} from '@services/apis';

export interface likelistParams {
  uid: string;
}
export interface likeMusicParams {
  id: number;
  like?:boolean;
}

/**
 * 喜欢音乐列表
 * 说明 : 调用此接口 , 传入用户 id, 可获取已喜欢音乐id列表(id数组)
 * 必选参数 : uid: 用户 id
 * 接口地址 : /likelist
 * 调用例子 : /likelist?uid=32953014
 */
export const fetchLikeList = (
  params:likelistParams
) => Request.post({ url: likeListURL, data: params });

/**
 * 喜欢音乐
 * 说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐
 * 必选参数 : id: 歌曲 id
 * 可选参数 : like: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢
 * 接口地址 : /like
 * 调用例子 : /like?id=347230
 */
export const fetchLikeMusic = (
  params:likeMusicParams
) => Request.post({ url: likeMusicURL, data: params });
