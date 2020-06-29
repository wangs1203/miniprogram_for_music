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
import VideoListView from './components/VideoListView';
import ArtistsView from './components/ArtistsView';
import AlbumsView from './components/AlbumsView';
import DjRadiosView from './components/DjRadiosView';
import UsersView from './components/UsersView';
import MVView from './components/MVView';
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
// mv
interface MvInfo extends BaseInfo {
  mvs: Array<StoreSpace.MV>;
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
  mv: MvInfo;
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
      // console.log('componentDidUpdate');
      // console.log(prevState);
      // console.log(this.state);
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
    this.querySearch(SearchResultView.tabList[0].code, 'init');
  }

  private switchTab = (activeTab) => {
    console.log('activeTab', activeTab);
    this.setState({
      activeTab
    });
  }

  private querySearch (type:string, scenes?:string) {
    const { keywords } = this.state;
    if (scenes === 'init') {
      Taro.setNavigationBarTitle({
        title: `${keywords}的搜索结果`
      });
      this.props.dispatchUpdateState({
        song: {
          songs: [],
          more: true,
          moreText: ''
        },
        video: {
          videos: [],
          more: true
        },
        user: {
          users: [],
          more: true
        },
        djRadio: {
          djRadios: [],
          more: true
        },
        playList: {
          playLists: [],
          more: true,
          moreText: ''
        },
        album: {
          albums: [],
          more: true
        },
        artist: {
          artists: [],
          more: true
        },
        mv: {
          mvs: [],
          more: true
        }
      });
    }
    this.props.dispatchFetchSearch({
      keywords,
      type
    });
  }

  private querySongList = () => {
    this.props.song.more && this.querySearch(SearchResultView.tabList[1].code);
  }

  private queryPlayList = () => {
    this.props.playList.more && this.querySearch(SearchResultView.tabList[2].code);
  }

  private queryVideoList = () => {
    this.props.video.more && this.querySearch(SearchResultView.tabList[3].code);
  }

  private queryArtistList = () => {
    this.props.artist.more && this.querySearch(SearchResultView.tabList[4].code);
  }

  private queryAlbumList = () => {
    this.props.album.more && this.querySearch(SearchResultView.tabList[5].code);
  }

  private queryDjRadioList = () => {
    this.props.djRadio.more && this.querySearch(SearchResultView.tabList[6].code);
  }

  private queryUserList = () => {
    this.props.user.more && this.querySearch(SearchResultView.tabList[7].code);
  }

  private queryMVList = () => {
    this.props.mv.more && this.querySearch(SearchResultView.tabList[8].code);
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
      song,
      playList,
      video,
      artist,
      album,
      djRadio,
      user,
      mv: mvInfo
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
                      <VideoListView
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
            {/* 单曲 */}
            <AtTabsPane
              current={activeTab}
              index={1}
            >
              <ScrollView
                scrollY
                onScrollToLower={this.querySongList}
                className="search_content__scroll"
              >
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
            {/* 歌单 */}
            <AtTabsPane current={activeTab} index={2}>
              <ScrollView
                scrollY
                onScrollToLower={this.queryPlayList}
                className="search_content__scroll"
              >
                {playList && playList.playLists
                  && playList.playLists.length && (
                  <PlayListView
                    playList={playList}
                    showTitle={false}
                    showMoreText={false}
                    title-class="search_content__title"
                    content-more-class="search_content__more"
                  />
                )}
                {playList.more && <WLoading />}
              </ScrollView>
            </AtTabsPane>
            {/* 视频 */}
            <AtTabsPane current={activeTab} index={3}>
              <ScrollView
                scrollY
                onScrollToLower={this.queryVideoList}
                className="search_content__scroll"
              >
                {video && video.videos
                  && video.videos.length && (
                  <VideoListView
                    video={video}
                    showTitle={false}
                    showMoreText={false}
                    title-class="search_content__title"
                    content-more-class="search_content__more"
                  />
                )}
                {video.more && <WLoading />}
              </ScrollView>
            </AtTabsPane>
            {/* 歌手 */}
            <AtTabsPane current={activeTab} index={4}>
              <ScrollView
                scrollY
                onScrollToLower={this.queryArtistList}
                className="search_content__scroll"
              >
                {artist && artist.artists && artist.artists.length && (
                  <ArtistsView
                    artist={artist}
                    showTitle={false}
                    showMoreText={false}
                    title-class="search_content__title"
                    content-more-class="search_content__more"
                  />
                )}
                {artist.more && <WLoading />}
              </ScrollView>
            </AtTabsPane>
            {/* 专辑 */}
            <AtTabsPane current={activeTab} index={5}>
              <ScrollView
                scrollY
                onScrollToLower={this.queryAlbumList}
                className="search_content__scroll"
              >
                {album && album.albums && album.albums.length && (
                  <AlbumsView
                    album={album}
                    switchTab={this.switchTab}
                    showTitle={false}
                    showMoreText={false}
                    title-class="search_content__title"
                    content-more-class="search_content__more"
                  />
                )}
                {album.more && <WLoading />}
              </ScrollView>
            </AtTabsPane>
            {/* 电台 */}
            <AtTabsPane current={activeTab} index={6}>
              <ScrollView
                scrollY
                onScrollToLower={this.queryDjRadioList}
                className="search_content__scroll"
              >
                {djRadio
                && djRadio.djRadios
                && djRadio.djRadios.length && (
                  <DjRadiosView
                    djRadio={djRadio}
                    switchTab={this.switchTab}
                    showTitle={false}
                    showMoreText={false}
                    title-class="search_content__title"
                    content-more-class="search_content__more"
                  />
                )}
                {djRadio.more && (<WLoading />)}
              </ScrollView>
            </AtTabsPane>
            {/* 用户 */}
            <AtTabsPane current={activeTab} index={7}>
              <ScrollView
                scrollY
                onScrollToLower={this.queryUserList}
                className="search_content__scroll"
              >
                {user && user.users && user.users.length && (
                  <UsersView
                    user={user}
                    switchTab={this.switchTab}
                    showTitle={false}
                    showMoreText={false}
                    title-class="search_content__title"
                    content-more-class="search_content__more"
                  />
                )}
                {user.more && (<WLoading />)}
              </ScrollView>
            </AtTabsPane>
            {/* MV */}
            <AtTabsPane current={activeTab} index={8}>
              <ScrollView
                scrollY
                onScrollToLower={this.queryMVList}
                className="search_content__scroll"
              >
                {mvInfo && mvInfo.mvs && mvInfo.mvs.length && (
                  <MVView
                    mv={mvInfo}
                    showTitle={false}
                    title-class="search_content__title"
                    content-more-class="search_content__more"
                  />
                )}
                {mvInfo.more && (<WLoading />)}
              </ScrollView>
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    );
  }
}
