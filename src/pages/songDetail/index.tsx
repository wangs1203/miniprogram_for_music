import Taro, { Component, Config } from '@tarojs/taro';
import {
  View,
  Image
} from '@tarojs/components';
// import {
// } from 'taro-ui';
import { connect } from '@tarojs/redux';
import classnames from 'classnames';
import {
  CommonEffectType
} from '@/models/common';
import aagImg from '@/assets/images/aag.png';
import ajhImg from '@/assets/images/ajh.png';
import ajdImg from '@/assets/images/ajd.png';
import ajfImg from '@/assets/images/ajf.png';
import { EffectType, likelistParams } from './model';
import './index.scss';

interface PageOwnProps {}

interface PageStateProps {
  common: {
    userInfo:any,
    userId:string,
    currentSongInfo: StoreSpace.Song
  };
}

interface PageDispatchProps {
  dispatchGetLikeList: (payload:likelistParams) => Promise<undefined>;
  dispatchGetSongDetail: (payload) => Promise<undefined>;
}

interface PageState {
  isPlaying:boolean;
  showLyric: boolean;
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
    dispatchGetSongDetail: (payload) => dispatch({
      type: CommonEffectType.getSongDetail,
      payload
    })
  })
)
export default class SongDetailView extends Component<IProps, PageState> {
  public config: Config = {

  }

  public constructor (props) {
    super(props);
    this.state = {
      isPlaying: props.common.isPlaying,
      showLyric: false
    };
  }

  public componentWillMount () {
    this.getLikeList();
  }

  public componentDidMount () {
    this.init();
  }

  public componentWillReceiveProps (nextProps) {
    if (
      this.props.common.currentSongInfo.name
        !== nextProps.common.currentSongInfo.name
        // nextProps.common.currentSongInfo.name ||
    // this.state.firstEnter
    ) {
      // this.setState({
      //   firstEnter: false
      // });
      this.setSongInfo(nextProps.common.currentSongInfo);
    }
  }

  public componentWillUnmount () {
    // 更新下播放状态
    // this.props.updatePlayStatus({
    //   isPlaying: this.state.isPlaying
    // });
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

  private init = async () => {
    const { id } = this.$router.params;
    console.log(121212121112121221112123231412341);
    id && await this.querySongDetail(id);
    this.initPlayer();
    this.setSongInfo(this.props.common.currentSongInfo);
  }

  private querySongDetail = (id:string) => {
    // const res = await this.props.dispatchGetSongDetail({ id });
    console.log(id);
    return this.props.dispatchGetSongDetail({ id });
  }

  private initPlayer = () => {
    backgroundAudioManager.onTimeUpdate(() => {
      console.log(backgroundAudioManager.currentTime);
      Taro.getBackgroundAudioPlayerState({
        success: (res) => {
          if (res.status !== 2) {
            console.log(res.currentPosition);
            // this.updateLrc(res.currentPosition);
            // this.updateProgress(res.currentPosition);
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
      console.log(songInfo);
      backgroundAudioManager.title = name;
      backgroundAudioManager.coverImgUrl = al.picUrl;
      backgroundAudioManager.src = url;
      // this.setState({
      //   lrc: lrcInfo,
      //   isPlaying: true,
      //   firstEnter: false
      // });
    } catch (err) {
      console.log('err', err);
      // this.getNextSong();
    }
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

  private playMusic = () => {
    backgroundAudioManager.play();
    this.setState({
      isPlaying: true
    });
  }

  public render (): JSX.Element {
    const {
      currentSongInfo
    } = this.props.common;

    const {
      isPlaying,
      showLyric
      // lrc,
      // lrcIndex,
      // star,
      // playPercent
    } = this.state;
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
        <View className="song__bottom">
          <View className="song__operation">
            {/* <Image
              src={playModeImg}
              className="song__operation__mode"
              // onClick={this.changePlayMode.bind(this)}
            /> */}
            <Image
              src={ajhImg}
              className="song__operation__prev"
              // onClick={this.getPrevSong.bind(this)}
            />
            {isPlaying ? (
              <Image
                src={ajdImg}
                className="song__operation__play"
                // onClick={this.pauseMusic.bind(this)}
              />
            ) : (
              <Image
                src={ajfImg}
                className="song__operation__play"
                onClick={this.playMusic}
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}
