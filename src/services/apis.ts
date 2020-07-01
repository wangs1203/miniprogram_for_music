/**
 * 获取banner
 */
export const BannerURL = '/banner?type=2';
/**
 * 获取推荐歌单
 */
export const RecommendSongListURL = '/personalized';
/**
 * 推荐 mv
 */
export const RecommendMVListURL = '/personalized/mv';
/**
 * 获取推荐电台
 */
export const DjProgramURL = '/personalized/djprogram';
/**
 * 排行榜
 */
export const LeaderboardURL = '/top/list';
/**
 * 歌单分类
 */
export const PlayListClassificationURL = '/playlist/catlist';
/**
 * 歌单 ( 网友精选碟 )
 * 说明 : 调用此接口 , 可获取网友精选碟歌单
 * 可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 */
export const TopPlayListURL = '/top/playlist';

/**
 * ------------------------- person --------------------------
 */
/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 */
export const UserSubCountURL = '/user/subcount';

/**
 * 获取用户详情
 */
export const UserDetailURL = '/user/detail';


/**
 * 登录
 * 说明 : 手机登录
 * 必选参数 : phone: 手机号码 password: 密码
 * 可选参数 : countrycode: 国家码，用于国外手机号登陆，例如美国传入：1
 * 调用例子 : /login/cellphone?phone=xxx&password=yyy
 */
export const LoginURL = '/login/cellphone';

/**
 * 退出登录
 * 说明 : 调用此接口 , 可退出登录
 */
export const LogoutURL = '/logout';

/**
 * 获取用户歌单
 * 说明 : 登陆后调用此接口 , 传入用户 id, 可以获取用户歌单
 * 调用例子 : /user/playlist?uid=32953014
 */
export const UserPlayListURL = '/user/playlist';

/**
 * ------------------------- search --------------------------
 */
/**
 * 热搜列表(详细)
 * 说明 : 调用此接口,可获取热门搜索列表
 */
export const HotSearchURL = '/search/hot/detail';

/**
 * 搜索
 * 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 ,
 * 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ),
 * 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
 * 必选参数 : keywords : 关键词
 * 可选参数 :
 * limit : 返回数量 , 默认为 30 offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
*/
export const searchURL = '/search';

/**
 * ------------------------- playsong --------------------------
 */

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
export const checkMusicURL = '/check/music';

/**
 * 喜欢音乐列表
 * 说明 : 调用此接口 , 传入用户 id, 可获取已喜欢音乐id列表(id数组)
 * 必选参数 : uid: 用户 id
 * 接口地址 : /likelist
 * 调用例子 : /likelist?uid=32953014
 */
export const likeListURL = '/likelist';