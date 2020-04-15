import Taro, { Component, Config } from '@tarojs/taro';
import {
  View,
  Text,
  Image,
  Swiper,
  SwiperItem,
  ScrollView
} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { IndexEffectType } from './model';
import './index.scss';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

interface PageOwnProps {}

interface PageStateProps {
  // song: PlaySong;
  bannerList: StoreSpace.Banner[];
  // recommendSongList: Array<{
  //   name: string,
  //   picUrl: string,
  //   playCount: number
  // }>,
  recommendSongList: Array<{
    name: string,
    picUrl: string,
    playCount: number
  }>;
}

interface PageDispatchProps {
  dispatchFetchBanner: () => void;
  dispatchFetchRecommendSongList: () => void;
}

interface PageState {
  current: number;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ index }) => ({
    ...index
  }),
  (dispatch) => ({
    dispatchFetchBanner () {
      dispatch({
        type: IndexEffectType.getBanner
      });
    },
    dispatchFetchRecommendSongList () {
      dispatch({
        type: IndexEffectType.getRecommendSongList
      });
    }
  })
)
class Index extends Component<IProps, PageState> {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
  */
  public config: Config = {
    navigationBarTitleText: '首页'
  }


  public constructor (...rest) {
    super(...rest);
    this.state = {
      current: 0
      // recommendPlayList: [],
      // recommendDj: [],
      // recommendSongs: [],
      // recommend: [],
      // banners: []
    };
  }


  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props, nextProps);
  // }

  public componentWillUnmount () {

  }

  public readonly tabList = [{ title: '个性推荐' }, { title: '主播电台' }]

  public componentDidShow () {
    this.props.dispatchFetchBanner();
    this.props.dispatchFetchRecommendSongList();
  }

  private handleClick = (value:0|1) => {
    this.setState({
      current: value
    });
  }


  public render (): JSX.Element {
    // const { recommendPlayList, recommendDj, banners } = this.state;
    const {
      bannerList,
      recommendSongList
    } = this.props;
    console.log(this.props);

    return (
      <View>
        <AtTabs
          current={this.state.current}
          tabList={this.tabList}
          onClick={this.handleClick}
        >
          <AtTabsPane
            current={this.state.current}
            index={0}
          >
            <Swiper
              indicatorColor="#999"
              indicatorActiveColor="#333"
              circular
              indicatorDots
              autoplay
            >
              {bannerList.map((item) => (
                <SwiperItem key={item.targetId}>
                  <Image
                    className="img"
                    src={`${item.pic}?imageView&thumbnail=0x300`}
                  />
                </SwiperItem>
              ))}
            </Swiper>
            <View className="recommend_songlist">
              <View className="recommend_songlist__title">
                推荐歌单
              </View>
              <ScrollView
                scrollX
                className="recommend_songlist__content"
              >
                {/* <View className="recommend_songlist__content"> */}
                {recommendSongList.map((item, index) => (
                  <View
                    key={`${index}`}
                    className="recommend_songlist__item"
                  >
                    <Image
                      src={`${item.picUrl}?imageView&thumbnail=0x200`}
                      className="recommend_songlist__item__cover"
                    />
                    <View className="recommend_songlist__item__cover__num">
                      <Text className="at-icon at-icon-sound" />
                      {
                        item.playCount < 10000
                          ? item.playCount
                          : `${Number(item.playCount / 10000).toFixed(0)}万`
                      }
                    </View>
                    <View className="recommend_songlist__item__title">{item.name}</View>
                  </View>
                ))}
                {/* </View> */}
              </ScrollView>
              {/* <View className="recommend_songlist__content">
                {recommendPlayList.map((item, index) => (
                  <View
                    key={index}
                    className="recommend_songlist__item"
                    onClick={this.goDetail.bind(this, item)}
                  >
                    <Image
                      src={`${item.picUrl}?imageView&thumbnail=0x200`}
                      className="recommend_songlist__item__cover"
                    />
                    <View className="recommend_songlist__item__cover__num">
                      <Text className="at-icon at-icon-sound" />
                      {
                      item.playCount < 10000
                        ? item.playCount
                        : `${Number(item.playCount / 10000).toFixed(0)}万`
                    }
                    </View>
                    <View className="recommend_songlist__item__title">{item.name}</View>
                  </View>
                ))}
              </View> */}
            </View>
          </AtTabsPane>

          <AtTabsPane current={this.state.current} index={1}>
            {/* <View className="recommend_songlist">
              <View className="recommend_songlist__title">
                主播电台
              </View>
              <View className="recommend_songlist__content">
                {
                  recommendDj.map((item, index) => (
                    <View key={index}
                    className="recommend_songlist__item"
                    onClick={this.goDetail.bind(this, item)}>
                      <Image
                        src={`${item.picUrl}?imageView&thumbnail=0x200`}
                        className="recommend_songlist__item__cover"
                      />
                      <View className="recommend_songlist__item__title">{item.name}</View>
                    </View>
                  ))
                }
              </View>
            </View> */}
          </AtTabsPane>
        </AtTabs>
        {/* <CMusic
        songInfo={this.props.song}
        onUpdatePlayStatus={this.props.updateState.bind(this)} /> */}

      </View>
    );
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion
export default Index;
