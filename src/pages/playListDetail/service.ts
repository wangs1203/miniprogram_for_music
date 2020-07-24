import Request from '@services/http';
import {
  playListDetailURL
} from '@services/apis';

interface playListDetailParams {
  playListDetailParam: string;
}

/**
 *
 * 说明 :
 */
export const fetchplayListDetail = (
  params:{}
) => Request.post({ url: playListDetailURL, data: params });
