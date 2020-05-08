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
