import Taro, { Component, Config } from '@tarojs/taro';
import {
  View,
  Text,
  Image
  // Swiper,
  // SwiperItem,
  // Canvas,
  // ScrollView
} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {
// AtNoticebar
// AtTabsPane
  AtIcon
} from 'taro-ui';
import { EffectType, fetchUserDetailParams } from './model';
import './index.scss';

interface PageOwnProps {}

interface PageStateProps {
  common:any;
}

interface PageDispatchProps {
  dispatchFetchUserSubCount: () => void;
  dispatchFetchUserDetail: (payload:fetchUserDetailParams) => void;
  dispatchFetchLogout: () => void;
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
    console.log(this.props.common);
    this.props.dispatchFetchUserSubCount();
    this.props.common.userInfo && this.props.dispatchFetchUserDetail({
      uid: this.props.common.userInfo.profile.userId
    });
  }

  /**
   * 退出登陆
   */
  private signOut = () => {
    this.props.dispatchFetchLogout();
  }

  public render (): JSX.Element {
    const { common } = this.props;
    console.log(common.userInfo);
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
                src={require('images/red-notLogin-avatar-icon.png')}
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


        <View className="user_count">
          <View className="user_count__sub">
            <View className="user_count__sub--num">
              0
            </View>
            <View>动态</View>
          </View>
          <View className="user_count__sub">
            <View className="user_count__sub--num">
              0
            </View>
            <View>关注</View>
          </View>
          <View className="user_count__sub">
            <View className="user_count__sub--num">
              0
            </View>
            <View>粉丝</View>
          </View>
        </View>

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

      </View>
    );
  }
}

export default PersonCenter;
