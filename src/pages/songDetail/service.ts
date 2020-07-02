import Request from '@services/http';
import {
  // songDetailURL
  likeListURL
} from '@services/apis';

export interface likelistParams {
  uid: string;
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
