import Request from '@services/http';
import {
  checkMusicURL,
  songDetailURL,
  songUrlURL,
  songLyricURL
} from '@services/apis';

export interface fetchCheckMusicParam {
  id: number;
}
export interface fetchSongDetailParam {
  ids: string;
}
export interface fetchSongUrlParam {
  id: string;
}
export interface fetchSongLyricParam {
  id:string;
}
/**
 * 音乐是否可用
 * 说明: 调用此接口,传入歌曲 id,
 * 可获取音乐是否可用,返回 { success: true, message: 'ok' }
 * 或者 { success: false, message: '亲爱的,暂无版权' }
 * 必选参数 : id : 歌曲 id
 * 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 * 接口地址 : /check/music
 * 调用例子 : /check/music?id=33894312
 */
export const fetchCheckMusic = (
  params: fetchCheckMusicParam
) => Request.post({ url: checkMusicURL, data: params });

/**
 * 获取歌曲详情
 * 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(注意:歌曲封面现在需要通过专辑内容接口获取)
 * 必选参数 : ids: 音乐 id, 如 ids=347230
 * 接口地址 : /song/detail
 * 调用例子 : /song/detail?ids=347230,/song/detail?ids=347230,347231
 */
export const fetchSongDetail = (
  params: fetchSongDetailParam
) => Request.post({ url: songDetailURL, data: params });

/**
 * 获取音乐 url
 * 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口 , 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url( 不需要登录 )
 * 注 : 部分用户反馈获取的 url 会 403,hwaphon找到的解决方案是当获取到音乐的 id 后，将 https://music.163.com/song/media/outer/url?id=id.mp3 以 src 赋予 Audio 即可播放
 * 必选参数 : id : 音乐 id
 * 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 * 接口地址 : /song/url
 * 调用例子 : /song/url?id=33894312 /song/url?id=405998841,33894312
 */
export const fetchSongUrl = (
  params: fetchSongUrlParam
) => Request.post({ url: songUrlURL, data: params });

/**
 * 获取歌词
 * 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
 * 必选参数 : id: 音乐 id
 * 接口地址 : /lyric
 * 调用例子 : /lyric?id=33894312
 */
export const fetchSongLyric = (
  params: fetchSongLyricParam
) => Request.post({ url: songLyricURL, data: params });