import Request from 'services/http';
import {
  UserSubCountURL,
  UserDetailURL
} from 'services/apis';

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 */
export const fetchUserSubCount = () => Request.post({ url: UserSubCountURL });


/**
 * 获取用户详情
 * 说明 : 登陆后调用此接口 , 传入用户 id, 可以获取用户详情
 */
export const fetchUserDetail = (
  params:{
    uid:number|string
  }
) => Request.post({ url: UserDetailURL, data: params });