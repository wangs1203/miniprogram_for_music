import Request from 'services/http';
import { BannerURL, DjProgramURL } from 'services/apis';

/**
 * 获取banner
 */
export const getBanner = () => Request.post({ url: BannerURL });

/**
 * 获取前序航班动态列表
 */
export const getDjProgram = () => Request.post({ url: DjProgramURL });
