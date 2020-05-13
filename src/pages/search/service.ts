import Request from '@services/http';
import {
  HotSearchURL
} from '@services/apis';

/**
 * 热搜列表(详细)
 * 说明 : 调用此接口,可获取热门搜索列表
 */
export const fetchHotSearch = () => Request.post({ url: HotSearchURL });
