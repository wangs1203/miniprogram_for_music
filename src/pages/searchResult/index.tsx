import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import {
  View,
  ScrollView,
  Text
} from '@tarojs/components';
import {
  AtSearchBar,
  AtTabs,
  AtTabsPane
  // AtIcon
} from 'taro-ui';
import classnames from 'classnames';

import WLoading from '@components/base/WLoading';
import {
  setKeywordInHistory
  // formatCount,
  // formatNumber
  // formatTimeStampToTime
} from '@utils/common';
import SongInfoView from './components/SongInfoView';
import PlayListView from './components/PlayListView';
import VideoListVIew from './components/VideoListVIew';
import ArtistsView from './components/ArtistsView';
import AlbumsView from './components/AlbumsView';
import DjRadiosView from './components/DjRadiosView';
import UsersView from './components/UsersView';
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
  song: SongInfo;
  video: VideoInfo;
  user: UserListInfo;
  djRadio: DjRadioInfo;
  playList: PlayListInfo;
  album: AlbumInfo;
  artist: ArtistInfo;
}

interface PageDispatchProps {
  dispatchFetchSearch: (payload:SearchResultParams) => void;
  dispatchUpdateState: (payload:any) => void;
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
    },
    dispatchUpdateState (payload:any) {
      dispatch({
        type: EffectType.updateState,
        payload
      });
    }
  })
)
export default class SearchResultView extends Component<IProps, PageState> {
  public config: Config = {
    navigationBarTitleText: '搜索'
  }

  // private static formatDuration = (ms: number) => {
  //   // @ts-ignore
  //   const minutes: string = formatNumber(parseInt(ms / 60000, 10));
  //   // @ts-ignore
  //   const seconds: string = formatNumber(parseInt((ms / 1000) % 60, 10));
  //   return `${minutes}:${seconds}`;
  // }

  public constructor (props) {
    super(props);
    const { keywords } = this.$router.params;
    this.state = {
      keywords,
      activeTab: 0
    };
  }

  public componentDidMount () {
    this.init();
  }

  public componentDidUpdate (_, prevState) {
    if (prevState.activeTab !== this.state.activeTab) {
      console.log(prevState);
      console.log(this.state);
      console.log('componentDidUpdate');
      const curTab = SearchResultView.tabList[this.state.activeTab];
      this.querySearch(curTab.code);
    }
  }

  private static readonly tabList = [
    { title: '综合', code: '1018' }, { title: '单曲', code: '1' },
    { title: '歌单', code: '1000' }, { title: '视频', code: '1014' },
    { title: '歌手', code: '100' }, { title: '专辑', code: '10' },
    { title: '主播电台', code: '1009' }, { title: '用户', code: '1002' },
    { title: 'MV', code: '1004' }
  ]

  private init () {
    this.props.dispatchUpdateState({
      song: {
        songs: [],
        more: false,
        moreText: ''
      },
      video: {},
      user: {},
      djRadio: {},
      playList: {},
      album: {},
      artist: {}
    });
    this.querySearch('1018');
  }

  private querySearch (type:string) {
    const { keywords } = this.state;
    Taro.setNavigationBarTitle({
      title: `${keywords}的搜索结果`
    });
    this.props.dispatchFetchSearch({
      keywords,
      type
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
      totalInfo,
      song
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

                    {/* 单曲 */}
                    {totalInfo.song && totalInfo.song.songs
                      && totalInfo.song.songs.length && (
                      <SongInfoView
                        song={totalInfo.song}
                        switchTab={this.switchTab}
                        title-class="search_content__title"
                        content-more-class="search_content__more"
                      />
                    )}

                    {/* 歌单 */}
                    {totalInfo.playList && totalInfo.playList.playLists
                      && totalInfo.playList.playLists.length && (
                      <PlayListView
                        playList={totalInfo.playList}
                        switchTab={this.switchTab}
                        title-class="search_content__title"
                        content-more-class="search_content__more"
                      />
                    )}

                    {/* 视频 */}
                    {totalInfo.video && totalInfo.video.videos
                      && totalInfo.video.videos.length && (
                      <VideoListVIew
                        video={totalInfo.video}
                        switchTab={this.switchTab}
                        title-class="search_content__title"
                        content-more-class="search_content__more"
                      />
                    )}

                    {/* 相关搜索 */}
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

                    {/* 歌手 */}
                    {totalInfo.artist && totalInfo.artist.artists
                      && totalInfo.artist.artists.length && (
                      <ArtistsView
                        artist={totalInfo.artist}
                        switchTab={this.switchTab}
                        title-class="search_content__title"
                        content-more-class="search_content__more"
                      />
                    )}

                    {/* 专辑 */}
                    {totalInfo.album && totalInfo.album.albums
                      && totalInfo.album.albums.length && (
                        <AlbumsView
                          album={totalInfo.album}
                          switchTab={this.switchTab}
                          title-class="search_content__title"
                          content-more-class="search_content__more"
                        />
                    )}

                    {/* 电台 */}
                    {totalInfo.djRadio && totalInfo.djRadio.djRadios
                      && totalInfo.djRadio.djRadios && (
                        <DjRadiosView
                          djRadio={totalInfo.djRadio}
                          switchTab={this.switchTab}
                          title-class="search_content__title"
                          content-more-class="search_content__more"
                        />
                    )}

                    {/* 用户 */}
                    {totalInfo.user && totalInfo.user.users && totalInfo.user.users.length && (
                      <UsersView
                        user={totalInfo.user}
                        switchTab={this.switchTab}
                        title-class="search_content__title"
                        content-more-class="search_content__more"
                      />
                    )}

                  </ScrollView>
                )}
            </AtTabsPane>
            <AtTabsPane
              current={activeTab}
              index={1}
            >
              <ScrollView
                scrollY
                // onScrollToLower={this.getSongList.bind(this)}
                className="search_content__scroll"
              >
                {/* 单曲 */}
                {song && song.songs && song.songs.length && (
                  <SongInfoView
                    song={song}
                    showTitle={false}
                    showMoreText={false}
                    title-class="search_content__title"
                    content-more-class="search_content__more"
                  />
                )}
                {song.more && <WLoading />}
              </ScrollView>
            </AtTabsPane>
            <AtTabsPane current={activeTab} index={2}>
              <ScrollView
                scrollY
                // onScrollToLower={this.getPlayList.bind(this)}
                className="search_content__scroll"
              >
                {/* 歌单 */}
                {totalInfo.playList && totalInfo.playList.playLists
                  && totalInfo.playList.playLists.length && (
                  <PlayListView
                    playList={totalInfo.playList}
                    switchTab={this.switchTab}
                    showTitle={false}
                    showMoreText={false}
                    title-class="search_content__title"
                    content-more-class="search_content__more"
                  />
                )}
                {totalInfo.playList.more && <WLoading />}
              </ScrollView>
            </AtTabsPane>
            <AtTabsPane current={activeTab} index={3}>
              <ScrollView
                scrollY
                // onScrollToLower={this.getVideoList.bind(this)}
                className="search_content__scroll"
              >
                {/* 视频 */}
                {totalInfo.video && totalInfo.video.videos
                  && totalInfo.video.videos.length && (
                  <VideoListVIew
                    video={totalInfo.video}
                    switchTab={this.switchTab}
                    showTitle={false}
                    showMoreText={false}
                    title-class="search_content__title"
                    content-more-class="search_content__more"
                  />
                )}
                {totalInfo.video.more && <WLoading />}
              </ScrollView>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    );
  }
}
