import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import {
  View,
  ScrollView
} from '@tarojs/components';
import {
  AtSearchBar,
  AtTabs,
  AtTabsPane
} from 'taro-ui';
import WLoading from '@/components/base/WLoading';
import classnames from 'classnames';
import {
  setKeywordInHistory
  // formatCount,
  // formatNumber,
  // formatTimeStampToTime
} from 'utils/common';

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
    songInfo: SongInfo,
    videoInfo: VideoInfo,
    userListInfo: UserListInfo,
    djRadioInfo: DjRadioInfo,
    playListInfo: PlayListInfo,
    albumInfo: AlbumInfo,
    artistInfo: ArtistInfo,
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
    {
      title: '综合'
    },
    {
      title: '单曲'
    },
    {
      title: '歌单'
    },
    {
      title: '视频'
    },
    {
      title: '歌手'
    },
    {
      title: '专辑'
    },
    {
      title: '主播电台'
    },
    {
      title: '用户'
    },
    {
      title: 'MV'
    }
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
                    {Object.keys(totalInfo).length && (<View className="search_content__nodata">暂无数据</View>)}
                    <View>
                      <View className="search_content__title">单曲</View>

                    </View>
                  </ScrollView>
                )}
            </AtTabsPane>
          </AtTabs>
        </View>
      </View>
    );
  }
}
