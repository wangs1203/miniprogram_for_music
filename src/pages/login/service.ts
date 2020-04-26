
import Request from 'services/http';
import {
  loginURL
} from 'services/apis';

interface loginParams {
  loginParam: string;
}

/**
 *
 * 说明 :
 */
export const fetchlogin = (
  params:{}
) => Request.post({ url: loginURL, data: params });
