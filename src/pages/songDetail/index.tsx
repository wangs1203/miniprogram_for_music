import Taro, { Component, Config } from '@tarojs/taro';
import {
  View,
  Image
} from '@tarojs/components';
// import {
// } from 'taro-ui';
import { connect } from '@tarojs/redux';
import { AnyAction } from 'redux';
import classnames from 'classnames';
import { showMsg } from '@utils/Toast';

import {
  CommonEffectType
} from '@/models/common';

import aagImg from '@/assets/images/aag.png';
import ajhImg from '@/assets/images/ajh.png';
import ajdImg from '@/assets/images/ajd.png';
import ajfImg from '@/assets/images/ajf.png';
import ajbImg from '@/assets/images/ajb.png';
import playLovedIcon from '@/assets/images/play_icn_loved.png';
import playLoveIcon from '@/assets/images/play_icn_love.png';
import oneModeIcon from '@/assets/images/icn_one_mode.png';
import loopModeIcon from '@/assets/images/icn_loop_mode.png';
import shuffleModeIcon from '@/assets/images/icn_shuffle_mode.png';

import WSlider from './components/WSlider';

import { EffectType, likelistParams, likeMusicParams } from './model';


import './index.scss';

interface PageOwnProps {}

interface PageStateProps {
  common: {
    userInfo:any,
    userId:string,
    currentSongInfo: StoreSpace.Song,
    isPlaying: boolean,
    canPlayList: StoreSpace.Song[],
    currentSongIndex: number
  };
  likeMusicList: number[];
  playMode: 'loop' | 'one' | 'shuffle';
}

interface PageDispatchProps {
  dispatchGetLikeList: (payload:likelistParams) => Promise<undefined>;
  dispatchGetLikeMusic: (payload:likeMusicParams) => Promise<undefined>;
  dispatchGetSongDetail: (payload) => Promise<undefined>;
  dispatchUpdateCommon: (payload) => AnyAction;
  dispatchUpdateSongDetail: (payload) => AnyAction;
}

interface PageState {
  isPlaying:boolean;
  showLyric: boolean;
  star: boolean;
  firstEnter:boolean;
  playPercent: number;
  // lrc: {
  //   scroll: boolean,
  //   nolyric: boolean,
  //   uncollected: boolean,
  //   lrclist: Array<{
  //     // eslint-disable-next-line camelcase
  //     lrc_text: string,
  //     // eslint-disable-next-line camelcase
  //     lrc_sec: number
  //   }>
  // };
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

const backgroundAudioManager = Taro.getBackgroundAudioManager();

@connect(
  ({ songDetail, common }) => ({
    ...songDetail,
    common
  }),
  (dispatch) => ({
    dispatchGetLikeList: (payload:likelistParams) => dispatch({
      type: EffectType.getLikeList,
      payload
    }),
    dispatchGetLikeMusic: (payload:likeMusicParams) => dispatch({
      type: EffectType.getLikeMusic,
      payload
    }),
    dispatchUpdateSongDetail: (payload) => dispatch({
      type: EffectType.updateState,
      payload
    }),
    dispatchGetSongDetail: (payload) => dispatch({
      type: CommonEffectType.getSongDetail,
      payload
    }),
    dispatchUpdateCommon: (payload) => dispatch({
      type: CommonEffectType.updateState,
      payload
    })
  })
)
export default class SongDetailView extends Component<IProps, PageState> {
  public config: Config = {
    navigationBarTitleText: '加载中...',
    disableScroll: true
  }

  public constructor (props:IProps) {
    super(props);
    this.state = {
      isPlaying: props.common.isPlaying,
      showLyric: false,
      star: false,
      firstEnter: true,
      playPercent: 0
      // lrc: {
      //   scroll: false,
      //   nolyric: false,
      //   uncollected: false,
      //   lrclist: []
      // }
    };
  }

  public componentWillMount () {
    this.getLikeList();
  }

  public componentDidMount () {
    console.log('componentDidMount:1');
    this.init();
  }

  public componentWillReceiveProps (nextProps:IProps) {
    const {
      likeMusicList: nlikeMusicList,
      common: ncommon
    } = nextProps;
    if (nlikeMusicList.length > 0) {
      this.setState({
        star: nlikeMusicList.indexOf(ncommon.currentSongInfo.id) !== -1
      });
    }
    console.log('componentWillReceiveProps:1');
    if (
      this.props.common.currentSongInfo.name
        !== ncommon.currentSongInfo.name
        || this.state.firstEnter
    ) {
      console.log('componentWillReceiveProps:2');
      this.setState({
        firstEnter: false
      });
      console.log('setSongInfo------------>');
      console.log(ncommon.currentSongInfo.url);
      this.setSongInfo(ncommon.currentSongInfo);
    }
  }

  public componentWillUnmount () {
    // 更新下播放状态
    this.props.dispatchUpdateCommon({
      isPlaying: this.state.isPlaying
    });
  }

  private init = async () => {
    const { id } = this.$router.params;
    id && await this.querySongDetail(id);
    this.initPlayer();
    // this.setSongInfo(this.props.common.currentSongInfo);
  }

  private getLikeList = () => {
    console.log(this.props.common.userInfo);
    if (this.props.common.userInfo
        && this.props.common.userInfo.account
        && this.props.common.userInfo.account.id) {
      const {
        account
      } = this.props.common.userInfo;

      this.props.dispatchGetLikeList({ uid: account.id });
    }
  }

  private querySongDetail = (id:string) => {
    console.log(id);
    return this.props.dispatchGetSongDetail({ id });
  }

  private initPlayer = () => {
    backgroundAudioManager.onTimeUpdate(() => {
      // if (backgroundAudioManager.src) {
      //   const { currentTime } = backgroundAudioManager;
      //   // this.updateLrc(currentTime);
      //   this.updateProgress(currentTime);
      // }
      Taro.getBackgroundAudioPlayerState({
        success: (res) => {
          if (res.status !== 2) {
            // this.updateLrc(res.currentPosition);
            this.updateProgress(res.currentPosition);
          }
        }
      });
    });

    backgroundAudioManager.onPause(() => {
      this.setState({
        isPlaying: false
      });
    });
    backgroundAudioManager.onPlay(() => {
      this.setState({
        isPlaying: true
      });
    });

    backgroundAudioManager.onEnded(() => {
      const { playMode } = this.props;
      const routes = Taro.getCurrentPages();
      const currentRoute = routes[routes.length - 1].route;
      // 如果在当前页面则直接调用下一首的逻辑，反之则触发nextSong事件
      if (currentRoute === 'pages/songDetail/index') {
        this.playByMode(playMode);
      } else {
        Taro.eventCenter.trigger('nextSong');
      }
    });
  }

  private setSongInfo = (songInfo) => {
    try {
      const {
        name,
        al,
        // lrcInfo,
        url
      } = songInfo;
      Taro.setNavigationBarTitle({
        title: name
      });
      backgroundAudioManager.title = name;
      backgroundAudioManager.coverImgUrl = al.picUrl;

      url && (backgroundAudioManager.src = url);
      this.setState({
        // lrc: lrcInfo,
        isPlaying: true,
        firstEnter: false
      });
    } catch (err) {
      console.log('err', err);
      this.getNextSong();
    }
  }

  private updateProgress (currentPosition) {
    const { dt } = this.props.common.currentSongInfo;
    this.setState({
      playPercent: Math.floor((currentPosition * 1000 * 100) / dt)
    });
  }

  private playMusic = () => {
    backgroundAudioManager.play();
    this.setState({
      isPlaying: true
    });
  }

  private pauseMusic = () => {
    backgroundAudioManager.pause();
    this.setState({
      isPlaying: false
    });
  }

  private likeMusic = () => {
    const {
      star
    } = this.state;
    const { id } = this.props.common.currentSongInfo;
    this.props.dispatchGetLikeMusic({ like: !star, id });
  }

  private changePlayMode = () => {
    let { playMode } = this.props;
    if (playMode === 'loop') {
      playMode = 'one';
      showMsg({ title: '单曲循环' });
    } else if (playMode === 'one') {
      playMode = 'shuffle';
      showMsg({ title: '随机播放' });
    } else {
      playMode = 'loop';
      showMsg({ title: '列表循环' });
    }
    this.props.dispatchUpdateSongDetail({ playMode });
  }

  private playByMode = (playMode: string) => {
    switch (playMode) {
      case 'one':
        this.getCurrentSong();
        break;
      case 'shuffle':
        this.getShuffleSong();
        break;
      // 默认按列表顺序播放
      default:
        this.getNextSong();
    }
  }

  /**
   * 循环播放当前歌曲
   */
  private getCurrentSong () {
    const { currentSongInfo } = this.props.common;
    this.setSongInfo(currentSongInfo);
  }

  /**
   * 随机播放歌曲
   */
  private getShuffleSong () {
    const { canPlayList } = this.props.common;
    const nextSongIndex = Math.floor(Math.random() * (canPlayList.length - 1));
    this.props.dispatchGetSongDetail({
      id: canPlayList[nextSongIndex].id
    });
  }

  /**
   * 获取下一首
   */
  private getNextSong = () => {
    const {
      common: {
        currentSongIndex,
        canPlayList
      },
      playMode
    } = this.props;
    if (playMode === 'shuffle') {
      this.getShuffleSong();
      return;
    }
    console.log('歌曲详情index', currentSongIndex);
    const nextSongIndex = currentSongIndex === canPlayList.length - 1
      ? 0 : currentSongIndex + 1;
    canPlayList[nextSongIndex] && canPlayList[nextSongIndex].id && this.props.dispatchGetSongDetail({
      id: canPlayList[nextSongIndex].id
    });
  }

  // 获取上一首
  private getPrevSong = () => {
    const {
      common: {
        currentSongIndex,
        canPlayList
      },
      playMode
    } = this.props;
    if (playMode === 'shuffle') {
      this.getShuffleSong();
      return;
    }
    const prevSongIndex = currentSongIndex === 0
      ? canPlayList.length - 1
      : currentSongIndex - 1;

    canPlayList[prevSongIndex] && canPlayList[prevSongIndex].id && this.props.dispatchGetSongDetail({
      id: canPlayList[prevSongIndex].id
    });
  }

  private percentChange = (e) => {
    // console.log(e)
    const { value } = e.detail;
    const { dt } = this.props.common.currentSongInfo;
    const currentPosition = Math.floor(((dt / 1000) * value) / 100);
    backgroundAudioManager.seek(currentPosition);
    backgroundAudioManager.play();
  }

  private percentChanging = () => {
    backgroundAudioManager.pause();
  }

  private showLyricUI = () => {
    this.setState({
      showLyric: true
    });
  }

  private hiddLyric = () => {
    this.setState({
      showLyric: false
    });
  }

  public render (): JSX.Element {
    const {
      common: {
        currentSongInfo
      },
      playMode
    } = this.props;

    const {
      isPlaying,
      showLyric,
      // lrc,
      // lrcIndex,
      playPercent,
      star
    } = this.state;

    let playModeImg = loopModeIcon;
    if (playMode === 'one') {
      playModeImg = oneModeIcon;
    } else if (playMode === 'shuffle') {
      playModeImg = shuffleModeIcon;
    }
    return (
      <View className="songDetail-page">
        <Image
          className="song-bg"
          src={currentSongInfo.al.picUrl}
        />
        <View
          className={classnames({
            'song-music': true,
            'song-music__hidden': showLyric
          })}
        >
          <View
            className={classnames({
              'song-music__main': true,
              playing: isPlaying
            })}
          >
            <Image
              className="song-music__main--before"
              src={aagImg}
            />
            <View className="song__music__main__cover">
              <View
                className={classnames({
                  song__music__main__img: true,
                  'z-pause': !isPlaying,
                  circling: true
                })}
              >
                <Image
                  className="song__music__main__img__cover"
                  src={currentSongInfo.al.picUrl}
                />
              </View>
            </View>
          </View>

          <View
            className="song__music__lgour"
            onClick={this.showLyricUI}
          >
            <View
              className={classnames({
                song__music__lgour__cover: true,
                'z-pause': !isPlaying,
                circling: true
              })}
            />
          </View>

        </View>
        <WSlider
          percent={playPercent}
          onChange={this.percentChange}
          onChanging={this.percentChanging}
        />
        <View className="song__bottom">
          <View className="song__operation">
            <Image
              src={playModeImg}
              className="song__operation__mode"
              onClick={this.changePlayMode}
            />
            <Image
              src={ajhImg}
              className="song__operation__prev"
              onClick={this.getPrevSong}
            />
            {isPlaying ? (
              <Image
                src={ajdImg}
                className="song__operation__play"
                onClick={this.pauseMusic}
              />
            ) : (
              <Image
                src={ajfImg}
                className="song__operation__play"
                onClick={this.playMusic}
              />
            )}
            <Image
              src={ajbImg}
              className="song__operation__next"
              onClick={this.getNextSong}
            />
            <Image
              src={
                star
                  ? playLovedIcon
                  : playLoveIcon
              }
              className="song__operation__like"
              onClick={this.likeMusic}
            />
          </View>
        </View>
      </View>
    );
  }
}
