import Taro, { Component, Config } from '@tarojs/taro';
import {
  View,
  Text,
  Image,
  Swiper,
  SwiperItem,
  // Canvas,
  ScrollView
} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {
  AtTabs,
  AtTabsPane
  // AtIcon
} from 'taro-ui';
import { IndexEffectType } from './model';
import './index.scss';
// import { TrAlert } from '@/utils/Modal';

// # region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #end region

interface PageOwnProps {}

interface PageStateProps {
  // song: PlaySong;
  bannerList: StoreSpace.Banner[];
  recommendSongList: Array<{
    name: string,
    picUrl: string,
    playCount: number
  }>;
  recommendMVList: Array<{
    name: string,
    picUrl: string,
    playCount: number,
    artists: Array<StoreSpace.Artist>
  }>;
  djProgramList:Array<{
    name: string,
    picUrl: string
  }>;
}

interface PageDispatchProps {
  dispatchFetchBanner: () => void;
  dispatchFetchRecommendSongList: () => void;
  dispatchFetchRecommendMVList: () => void;
  dispatchFetchDjProgram: () => void;
  dispatchFetchLeaderboard: () => void;
  dispatchFetchPlayListClass: () => void;
  dispatchFetchTopPlayList: () => void;
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
    },
    dispatchFetchRecommendMVList () {
      dispatch({
        type: IndexEffectType.getRecommendMVList
      });
    },
    dispatchFetchDjProgram () {
      dispatch({
        type: IndexEffectType.getDjProgram
      });
    },
    dispatchFetchLeaderboard () {
      dispatch({
        type: IndexEffectType.getLeaderboard
      });
    },
    dispatchFetchPlayListClass () {
      dispatch({
        type: IndexEffectType.getPlayListClass
      });
    },
    dispatchFetchTopPlayList () {
      dispatch({
        type: IndexEffectType.getTopPlayList
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
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props, nextProps);
  // }

  public componentWillUnmount () {

  }

  public readonly tabList = [{ title: '个性推荐' }, { title: '歌单' }]

  public componentDidShow () {
    this.props.dispatchFetchBanner();
    this.props.dispatchFetchRecommendSongList();
    this.props.dispatchFetchRecommendMVList();
    this.props.dispatchFetchDjProgram();
    // this.props.dispatchFetchLeaderboard();
    this.props.dispatchFetchPlayListClass();
    this.props.dispatchFetchTopPlayList();
  }

  private handleClick = (value:0|1) => {
    this.setState({
      current: value
    });
  }

  private testToUpper = (e) => {
    console.log(e);
    // TrAlert({ title: JSON.stringify(e, null, 2) });
  }

  public render (): JSX.Element {
    const {
      bannerList,
      recommendSongList,
      recommendMVList,
      djProgramList
    } = this.props;
    console.log(this.props);

    return (
      <View>
        <AtTabs
          current={this.state.current}
          tabList={this.tabList}
          swipeable={false}
          onClick={this.handleClick}
        >
          <AtTabsPane
            current={this.state.current}
            index={0}
          >
            <ScrollView
              scrollX
              enableBackToTop
              scrollAnchoring
              refresherEnabled
              upperThreshold={20}
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
              {/* 推荐歌单 */}
              <View className="recommend_songlist">
                <View className="recommend_songlist__title">
                  推荐歌单
                </View>
                <ScrollView
                  className="recommend_songlist__wrapper"
                  upperThreshold={10}
                  onScrollToLower={this.testToUpper}
                  scrollX
                >
                  <View className="recommend_songlist__content">
                    {recommendSongList.map((item, index) => (
                      <View
                        key={`${index}`}
                        className="recommend_songlist__item"
                      >
                        <Image
                          src={`${item.picUrl}?imageView&thumbnail=0x300`}
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
                  </View>
                </ScrollView>
              </View>
              {/* 推荐歌单end */}
              {/* 推荐MV */}
              <View className="recommend_songlist">
                <View className="recommend_songlist__title">
                  推荐歌单
                </View>
                <ScrollView
                  className="recommend_songlist__wrapper"
                  scrollX
                >
                  <View className="recommend_songlist__content">
                    {recommendMVList.map((item, index) => (
                      <View
                        key={`${index}`}
                        className="recommend_songlist__item recommend_mv_list"
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
                        <View className="recommend_songlist__item__desc clearfix">
                          {item.artists.map((artistsItem, artistsIndex) => (
                            <View
                              key={`recommend_songlist__item__desc${artistsIndex}`}
                              className="recommend_songlist__item__desc_item"
                            >
                              {artistsItem.name}
                            </View>
                          ))}
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
              {/* 推荐MVend */}

              {/* 电台推荐 */}
              <View className="recommend_songlist">
                <View className="recommend_songlist__title">
                  电台推荐
                </View>
                <ScrollView
                  className="recommend_songlist__wrapper"
                  upperThreshold={10}
                  onScrollToLower={this.testToUpper}
                  scrollX
                >
                  <View className="recommend_songlist__content">
                    {djProgramList.map((item, index) => (
                      <View
                        key={`${index}`}
                        className="recommend_songlist__item"
                      >
                        <Image
                          src={`${item.picUrl}?imageView&thumbnail=0x300`}
                          className="recommend_songlist__item__cover"
                        />
                        <View className="recommend_songlist__item__title">{item.name}</View>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
              {/* 电台推荐end */}
              {/* 排行榜 */}
              {/* <View className="recommend_songlist">
                <View className="recommend_songlist__title">
                  排行榜
                </View>
                <Swiper
                  circular
                  nextMargin="20rpx"
                >
                  <SwiperItem>
                    <View className="leaderboard_Item__content">
                      <Canvas
                        canvasId="canvas"
                        className="leaderboard_Item__content_bg"
                        style={{ backgroundImage: 'url(http://p2.music.126.net/x-jReyGkM5OTKUEtTqXGoA==/109951164597332931.jpg?param=640y640)' }}
                      />
                      <View className="leaderboard_Item__content_wrapper">
                        <View className="leaderboard_Item__content_title">
                          标题
                          <AtIcon value="chevron-right" size="30" color="#f0f0f0" />
                        </View>
                        <View className="leaderboard_Item__content_song_list__wrapper">
                          <View className="leaderboard_Item__content_song_list__item clearfix">
                            <Image
                              className="leaderboard_Item__content_song_list__item_pic"
                              src="http://p2.music.126.net/x-jReyGkM5OTKUEtTqXGoA==/109951164597332931.jpg?param=120y120"
                            />
                            <Text>1 这是一个问题</Text>
                          </View>
                        </View>
                      </View>

                    </View>
                  </SwiperItem>
                </Swiper>

              </View> */}
              {/* 排行榜end */}
            </ScrollView>
          </AtTabsPane>

          <AtTabsPane current={this.state.current} index={1}>
            <View>
              test
            </View>
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
// #end region
export default Index;
