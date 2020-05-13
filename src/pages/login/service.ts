
import Request from '@services/http';
import {
  LoginURL
} from '@services/apis';

export interface loginParams {
  phone: string | number;
  password: string;
  countrycode?: number | string;
}

/**
 * 登录
 */
export const fetchLogin = (
  params:loginParams
) => Request.post({ url: LoginURL, data: params });
