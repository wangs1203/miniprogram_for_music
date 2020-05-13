import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import {
  View,
  ScrollView,
  Image,
  Text
} from '@tarojs/components';
import {
  AtSearchBar,
  AtTabs,
  AtTabsPane,
  AtIcon
} from 'taro-ui';
import WLoading from '@components/base/WLoading';
import classnames from 'classnames';
import {
  setKeywordInHistory,
  formatCount,
  formatNumber
  // formatTimeStampToTime
} from '@utils/common';

import { EffectType, SearchResultParams } from './model';

import './index.scss';

interface BaseInfo {
  more: boolean;
  moreText: string;
}
interface SongInfo extends BaseInfo {
  songs: Array<StoreSpace.Song>;
}
// 视频
interface VideoInfo extends BaseInfo {
  videos: Array<StoreSpace.Video>;
}
interface UserListInfo extends BaseInfo {
  users: Array<StoreSpace.User>;
}
interface DjRadioInfo extends BaseInfo {
  djRadios: Array<StoreSpace.DjRadio>;
}
interface PlayListInfo extends BaseInfo {
  playLists: Array<StoreSpace.PlayList>;
}
// 专辑
interface AlbumInfo extends BaseInfo {
  albums: Array<StoreSpace.Album>;
}
// 歌手
interface ArtistInfo extends BaseInfo {
  artists: Array<StoreSpace.Artist>;
}

interface PageOwnProps {}

interface PageStateProps {
  loading:boolean;
  totalInfo: {
    song: SongInfo,
    video: VideoInfo,
    user: UserListInfo,
    djRadio: DjRadioInfo,
    playList: PlayListInfo,
    album: AlbumInfo,
    artist: ArtistInfo,
    // eslint-disable-next-line camelcase
    sim_query: {
      // eslint-disable-next-line camelcase
      sim_querys: Array<{
        keyword: string
      }>,
      more: boolean
    }
  };
}

interface PageDispatchProps {
  dispatchFetchSearch: (payload:SearchResultParams) => void;
}

interface PageState {
  keywords: string;
  activeTab: number;

}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ searchResult, loading }) => ({
    ...searchResult,
    loading: loading.effects[EffectType.getSearch]
  }),
  (dispatch) => ({
    dispatchFetchSearch (payload:SearchResultParams) {
      dispatch({
        type: EffectType.getSearch,
        payload
      });
    }
  })
)
export default class SearchResultView extends Component<IProps, PageState> {
  public config: Config = {
    navigationBarTitleText: '搜索'
  }

  private static formatDuration = (ms: number) => {
    // @ts-ignore
    const minutes: string = formatNumber(parseInt(ms / 60000, 10));
    // @ts-ignore
    const seconds: string = formatNumber(parseInt((ms / 1000) % 60, 10));
    return `${minutes}:${seconds}`;
  }

  public constructor (props) {
    super(props);
    const { keywords } = this.$router.params;
    this.state = {
      keywords,
      activeTab: 0
    };
  }

  public componentWillMount () {
    this.init();
  }

  public componentDidShow () {

  }

  private static readonly tabList = [
    { title: '综合' }, { title: '单曲' },
    { title: '歌单' }, { title: '视频' },
    { title: '歌手' }, { title: '专辑' },
    { title: '主播电台' }, { title: '用户' }, { title: 'MV' }
  ]

  private init () {
    const { keywords } = this.state;
    Taro.setNavigationBarTitle({
      title: `${keywords}的搜索结果`
    });
    this.props.dispatchFetchSearch({
      keywords,
      type: 1018
    });
  }

  private switchTab = (activeTab) => {
    console.log('activeTab', activeTab);
    this.setState({
      activeTab
    });
  }

  private searchChange = (val:string) => {
    console.log(val);
    this.setState({
      keywords: val
    });
  }

  private searchResult = () => {
    setKeywordInHistory(this.state.keywords);
  }


  public render (): JSX.Element {
    const {
      keywords,
      activeTab
    } = this.state;
    const {
      loading,
      totalInfo
    } = this.props;
    return (
      <View
        className={classnames({
          'searchResult-page': true,
          'music-box': false
          // 'music-box': !!this.props.song.currentSongInfo.name
        })}
      >
        {/* <CMusic
          songInfo={{
            currentSongInfo,
            isPlaying,
            canPlayList
          }}
          onUpdatePlayStatus={this.props.updatePlayStatus.bind(this)}
        /> */}
        <AtSearchBar
          actionName="搜一下"
          className="search__input"
          fixed
          onActionClick={this.searchResult}
          onChange={this.searchChange}
          onConfirm={this.searchResult}
          value={keywords}
        />
        <View className="search_content">
          <AtTabs
            current={activeTab}
            tabList={SearchResultView.tabList}
            scroll
            onClick={this.switchTab}
          >
            <AtTabsPane
              current={activeTab}
              index={0}
            >
              {loading ? (<WLoading />)
                : (
                  <ScrollView scrollY className="search_content__scroll">
                    {!Object.keys(totalInfo).length && (<View className="search_content__nodata">暂无数据</View>)}
                    {totalInfo.song && totalInfo.song.songs.length && (
                      <View>
                        <View className="search_content__title">单曲</View>
                        {totalInfo.song.songs.map((item) => (
                          <View
                            key={item.id}
                            className="searchResult__music"
                          >
                            <View
                              className="searchResult__music__info"
                              // TODO: 事件绑定
                              // onClick={this.playSong.bind(this, item.id)}
                            >
                              <View className="searchResult__music__info__name">
                                {item.name}
                              </View>
                              <View className="searchResult__music__info__desc">
                                {`${item.ar[0] ? item.ar[0].name : ''} - ${
                                  item.al.name
                                }`}
                              </View>
                            </View>
                            <View
                              className="fa fa-ellipsis-v searchResult__music__icon"
                              // TODO: 事件绑定
                              // onClick={this.showMore.bind(this)}
                            />
                          </View>
                        ))}
                        {totalInfo.song && totalInfo.song.moreText && (
                          <View
                            className="search_content__more"
                            onClick={() => { this.switchTab(1); }}
                          >
                            {totalInfo.song.moreText}
                            <AtIcon
                              value="chevron-right"
                              size="16"
                              color="#ccc"
                            />
                          </View>
                        )}
                      </View>
                    )}
                    {totalInfo.playList && totalInfo.playList.playLists.length && (
                      <View>
                        <View className="search_content__title">歌单</View>
                        {totalInfo.playList.playLists.map((item, index) => (
                          <View
                            className="search_content__playList__item"
                            key={item.id}
                            // TODO: 事件绑定
                            // onClick={this.goPlayListDetail.bind(this, item)}
                          >
                            <View>
                              <Image
                                src={item.coverImgUrl}
                                className="search_content__playList__item__cover"
                              />
                            </View>
                            <View className="search_content__playList__item__info">
                              <View className="search_content__playList__item__info__title">
                                {item.name}
                              </View>
                              <View className="search_content__playList__item__info__desc">
                                <Text>{`${item.trackCount}首音乐`}</Text>
                                <Text className="search_content__playList__item__info__desc__nickname">
                                  {`by ${item.creator.nickname}`}
                                </Text>
                                <Text>{`${formatCount(item.playCount)}次`}</Text>
                              </View>
                            </View>
                          </View>
                        ))}
                        {totalInfo.playList.moreText && (
                          <View
                            className="search_content__more"
                            onClick={() => this.switchTab(2)}
                          >
                            {totalInfo.playList.moreText}
                            <AtIcon
                              value="chevron-right"
                              size="16"
                              color="#ccc"
                            />
                          </View>
                        )}
                      </View>
                    )}
                    {totalInfo.video && totalInfo.video.videos.length && (
                      <View>
                        <View className="search_content__title">视频</View>
                        <View>
                          {totalInfo.video.videos.map((item) => (
                            <View
                              className="search_content__video__item"
                              key={item.vid}
                              // onClick={this.goVideoDetail.bind(
                              //   this,
                              //   item.vid,
                              //   'video'
                              // )}
                            >
                              <View className="search_content__video__item__cover--wrap">
                                <View className="search_content__video__item__cover--playtime">
                                  <Text className="at-icon at-icon-play" />
                                  <Text>{formatCount(item.playTime)}</Text>
                                </View>
                                <Image
                                  src={item.coverUrl}
                                  className="search_content__video__item__cover"
                                />
                              </View>
                              <View className="search_content__video__item__info">
                                <View className="search_content__video__item__info__title">
                                  {item.title}
                                </View>
                                <View className="search_content__video__item__info__desc">
                                  <Text>
                                    {`${SearchResultView.formatDuration(item.durationms)},`}
                                  </Text>
                                  <Text className="search_content__video__item__info__desc__nickname">
                                    {`by ${item.creator[0].userName}`}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ))}
                          {totalInfo.video.moreText && (
                            <View
                              className="search_content__more"
                              onClick={() => this.switchTab(3)}
                            >
                              {totalInfo.video.moreText}
                              <AtIcon
                                value="chevron-right"
                                size="16"
                                color="#ccc"
                              />
                            </View>
                          )}
                        </View>
                      </View>
                    )}
                    {totalInfo.sim_query && totalInfo.sim_query.sim_querys.length && (
                      <View>
                        <View className="search_content__title">相关搜索</View>
                        <View className="search_content__simquery">
                          {totalInfo.sim_query.sim_querys.map((item) => (
                            <Text
                              key={item.keyword}
                              // onClick={this.queryResultBySim.bind(
                              //   this,
                              //   item.keyword
                              // )}
                              className="search_content__simquery__item"
                            >
                              {item.keyword}
                            </Text>
                          ))}
                        </View>
                      </View>
                    )}
                    {totalInfo.artist && totalInfo.artist.artists.length && (
                      <View>
                        <View className="search_content__title">歌手</View>
                        <View>
                          {totalInfo.artist.artists.map((item) => (
                            <View
                              className="search_content__artist__item"
                              key={item.id}
                            >
                              <Image
                                src={item.picUrl}
                                className="search_content__artist__item__cover"
                              />
                              <Text>
                                {item.name}
                                {item.alias[0] ? `（${item.alias[0]}）` : ''}
                              </Text>
                            </View>
                          ))}
                          {totalInfo.artist.moreText && (
                            <View
                              className="search_content__more"
                              onClick={() => this.switchTab(4)}
                            >
                              {totalInfo.artist.moreText}
                              <AtIcon
                                value="chevron-right"
                                size="16"
                                color="#ccc"
                              />
                            </View>
                          )}
                        </View>
                      </View>
                    )}
                  </ScrollView>
                )}
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    );
  }
}
