import Taro, { Component, Config } from '@tarojs/taro';
import {
  View,
  Text,
  Image
} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {
  AtIcon
} from 'taro-ui';
import WLoading from '@components/base/WLoading';
import { formatCount } from '@utils/common';
import {
  EffectType,
  fetchUserDetailParams,
  fetchUserPlayListParams
} from './model';
import './index.scss';

interface PageOwnProps {}

interface PageStateProps {
  common:any;
  userCreateList: Array<StoreSpace.ListItemInfo>;
  userCollectList: Array<StoreSpace.ListItemInfo>;
}

interface PageDispatchProps {
  dispatchFetchUserSubCount: () => void;
  dispatchFetchUserDetail: (payload:fetchUserDetailParams) => void;
  dispatchFetchLogout: () => void;
  dispatchFetchUserPlayList: (payload:fetchUserPlayListParams) => void;
}

interface PageState {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
@connect(
  ({ common, personalCenter }) => ({
    common,
    ...personalCenter
  }),
  (dispatch) => ({
    dispatchFetchUserSubCount () {
      dispatch({
        type: EffectType.getUserSubCount
      });
    },
    dispatchFetchUserDetail (payload:fetchUserDetailParams) {
      dispatch({
        type: EffectType.getUserDetail,
        payload
      });
    },
    dispatchFetchLogout () {
      dispatch({
        type: EffectType.getLogout
      });
    },
    dispatchFetchUserPlayList (payload:fetchUserPlayListParams) {
      dispatch({
        type: EffectType.getUserPlayList,
        payload
      });
    }

  })
)
class PersonCenter extends Component<IProps, PageState> {
  public config: Config = {
    navigationBarTitleText: '我的'
  }

  private static jumpPage (name) {
    Taro.navigateTo({
      url: `/pages/${name}/index`
    });
  }

  // eslint-disable-next-line no-useless-constructor
  public constructor (...rest) {
    super(...rest);
  }

  public componentWillUnmount () {

  }

  public componentDidShow () {
    this.init();
  }

  private init = () => {
    console.log(this.props);
    this.props.dispatchFetchUserSubCount();
    const uid = this.props.common.userInfo.profile.userId;
    this.props.common.userInfo && this.props.dispatchFetchUserDetail({
      uid
    });
    this.props.dispatchFetchUserPlayList({
      uid,
      limit: 300
    });
  }

  /**
   * 退出登陆
   */
  private signOut = () => {
    this.props.dispatchFetchLogout();
  }

  public render (): JSX.Element {
    const { common, userCreateList, userCollectList } = this.props;
    console.log(this.props);
    return (
      <View className="page-container">
        {
          common.userInfo && Object.keys(common.userInfo).length ? (
            <View className="login-control-wrapper clearfix">
              <Image
                src={`${common.userInfo.profile.avatarUrl}?imageView&thumbnail=80x0`}
                className="img"
              />
              <View className="login-control__header-info">
                <View className="login-control__header-info-name">
                  {common.userInfo.profile.nickname}
                </View>
                <View>
                  <Text className="login-control__header-info-level">
                    {`LV.${common.userInfo.level}`}
                  </Text>
                </View>
              </View>
              <AtIcon
                prefixClass="fa"
                value="sign-out"
                size="30"
                color="#d43c33"
                className="exit_icon"
                onClick={this.signOut}
              />
            </View>
          ) : (
            <View className="unlogin-control-wrapper clearfix">
              <Image
                // eslint-disable-next-line global-require
                src={require('@images/red-notLogin-avatar-icon.png')}
                className="img"
              />
              <View
                className="unlogin-control-btn-wrapper"
                onClick={() => { PersonCenter.jumpPage('login'); }}
              >
                <View className="unlogin-control-btn">立即登录</View>
              </View>
            </View>
          )
        }

        {/* TODO: 事件绑定 */}
        <View className="user_count">
          <View className="user_count__sub">
            <View className="user_count__sub--num">
              {common.userInfo.profile.eventCount || 0}
            </View>
            <View>动态</View>
          </View>
          <View className="user_count__sub">
            <View className="user_count__sub--num">
              {common.userInfo.profile.newFollows || 0}
            </View>
            <View>关注</View>
          </View>
          <View className="user_count__sub">
            <View className="user_count__sub--num">
              {common.userInfo.profile.followeds || 0}
            </View>
            <View>粉丝</View>
          </View>
        </View>

        {/* TODO: 事件绑定 跳转 */}
        <View className="user_brief">
          <View className="user_brief__item">
            <Image
              className="user_brief__item__img"
              // eslint-disable-next-line global-require
              src={require('../../assets/images/recent_play.png')}
            />
            <View className="user_brief__item__text">
              <Text>
                最近播放
              </Text>
              <Text className="at-icon at-icon-chevron-right" />
            </View>
          </View>

          <View className="user_brief__item">
            <Image
              className="user_brief__item__img"
              // eslint-disable-next-line global-require
              src={require('../../assets/images/my_radio.png')}
            />
            <View className="user_brief__item__text">
              <Text>
                我的电台
              </Text>
              <Text className="at-icon at-icon-chevron-right" />
            </View>
          </View>

          <View className="user_brief__item">
            <Image
              className="user_brief__item__img"
              // eslint-disable-next-line global-require
              src={require('../../assets/images/my_collection_icon.png')}
            />
            <View className="user_brief__item__text">
              <Text>
                我的收藏
              </Text>
              <Text className="at-icon at-icon-chevron-right" />
            </View>
          </View>

        </View>
        {/* 歌单列表 */}
        <View className="user_playlist">
          <View className="user_playlist__title">
            我创建的歌单
            <Text className="user_playlist__title__desc">
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              ({userCreateList.length})
            </Text>
          </View>
          {userCreateList.length === 0 ? <WLoading /> : ''}
          <View>
            {userCreateList.map((item) => (
              <View
                key={item.id}
                className="user_playlist__item"
              >
                <Image
                  className="user_playlist__item__cover"
                  src={`${item.coverImgUrl}?imageView&thumbnail=250x0`}
                />
                <View className="user_playlist__item__info">
                  <View className="user_playlist__item__info__name">
                    {item.name}
                  </View>
                  <View className="user_playlist__item__info__count">
                    {`${item.trackCount}首, 播放${formatCount(item.playCount)}次`}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="user_playlist">
          <View className="user_playlist__title">
            我收藏的歌单
            <Text className="user_playlist__title__desc">
              {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
              ({userCollectList.length})
            </Text>
          </View>
          {userCollectList.length === 0 ? <WLoading /> : ''}
          <View>
            {userCollectList.map((item) => (
              <View
                key={item.id}
                className="user_playlist__item"
                // onClick={this.goDetail.bind(this, item)}
              >
                <Image
                  className="user_playlist__item__cover"
                  src={`${item.coverImgUrl}?imageView&thumbnail=250x0`}
                />
                <View className="user_playlist__item__info">
                  <View className="user_playlist__item__info__name">
                    {item.name}
                  </View>
                  <View className="user_playlist__item__info__count">
                    {`${item.trackCount}首, 播放${formatCount(item.playCount)}次`}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

export default PersonCenter;
