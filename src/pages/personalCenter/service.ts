import Request from 'services/http';
import {
  UserSubCountURL,
  UserDetailURL,
  LogoutURL
} from 'services/apis';

export interface fetchUserDetailParams {
  uid:number|string;
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
