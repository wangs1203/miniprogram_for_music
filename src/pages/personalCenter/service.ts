import Request from '@services/http';
import {
  UserSubCountURL,
  UserDetailURL,
  LogoutURL,
  UserPlayListURL
} from '@services/apis';

export interface fetchUserDetailParams {
  uid:number|string;
}
export interface fetchUserPlayListParams {
  uid: number|string;
  limit: number;
}

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 */
export const fetchUserSubCount = () => Request.post({ url: UserSubCountURL });

/**
 * 获取用户详情
 * 说明 : 登陆后调用此接口 , 传入用户 id, 可以获取用户详情
 */
export const fetchUserDetail = (
  params:fetchUserDetailParams
) => Request.post({ url: UserDetailURL, data: params });

/**
 * 获取用户详情
 * 说明 : 登陆后调用此接口 , 传入用户 id, 可以获取用户详情
 */
export const fetchLogout = () => Request.post({ url: LogoutURL });

/**
 * 获取用户歌单
 */
export const fetchUserPlayList = (
  params:fetchUserPlayListParams
) => Request.post({ url: UserPlayListURL, data: params });
