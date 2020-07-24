import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import classnames from 'classnames';

import {
  View,
  Image,
  Text
} from '@tarojs/components';

import WLoading from '@components/base/WLoading';

import { injectPlaySong } from '@/utils/decorators';
import { formatCount } from '@/utils/common';

import { CommonEffectType, fetchPlaylistDetailParam } from '@/models/common';

// import { EffectType } from './model';

import './index.scss';

interface PageOwnProps {}

interface PageStateProps {
  common: {
    userInfo:any,
    userId:string,
    currentSongInfo: StoreSpace.Song,
    isPlaying: boolean,
    canPlayList: StoreSpace.Song[],
    currentSongIndex: number,
    playMode: 'loop' | 'one' | 'shuffle',
    playListDetailInfo: StoreSpace.PlayList,
    playListDetailPrivileges: StoreSpace.Privileges[]
  };
}

interface PageDispatchProps {
  dispatchFetchPlaylistDetail: (payload:fetchPlaylistDetailParam) => void;
}

interface PageState {

}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
@injectPlaySong()
@connect(
  ({ playListDetail, common }) => ({
    ...playListDetail,
    common
  }),
  (dispatch) => ({
    dispatchFetchPlaylistDetail (payload:fetchPlaylistDetailParam) {
      dispatch({
        type: CommonEffectType.getPlaylistDetail,
        payload
      });
    }
  })
)
export default class PlayListDetailView extends Component<IProps, PageState> {
  public config: Config = {
    navigationBarTitleText: '歌单详情'
  }

  public componentWillMount () {
    const { id, name } = this.$router.params;
    Taro.setNavigationBarTitle({
      title: name
    });
    this.props.dispatchFetchPlaylistDetail({
      id: Number(id)
    });
  }

  public componentWillUnmount () {
  }

  private playSong = (songId, playStatus) => {
    if (playStatus === 0) {
      Taro.navigateTo({
        url: `/pages/songDetail/index?id=${songId}`
      });
    } else {
      Taro.showToast({
        title: '暂无版权',
        icon: 'none'
      });
    }
  }

  public render (): JSX.Element {
    const {
      common: {
        // isPlaying,
        // canPlayList
        currentSongInfo,
        playListDetailInfo,
        playListDetailPrivileges
      }
    } = this.props;

    return (
      <View
        className={classnames({
          'playListDetail-page': true,
          hasMusicBox: !!currentSongInfo.name
        })}
      >
        {/* TODO: music */}
        {/* <CMusic
          songInfo={{
            currentSongInfo,
            isPlaying,
            canPlayList
          }}
          onUpdatePlayStatus={this.props.updatePlayStatus.bind(this)}
        /> */}
        <View className="playList__header">
          <Image
            className="playList__header__bg"
            src={playListDetailInfo.coverImgUrl}
          />
          <View className="playList__header__cover">
            <Image
              className="playList__header__cover__img"
              src={playListDetailInfo.coverImgUrl}
            />
            <Text className="playList__header__cover__desc">歌单</Text>
            <View className="playList__header__cover__num">
              <Text className="at-icon at-icon-sound" />
              {formatCount(playListDetailInfo.playCount)}
            </View>
          </View>
          <View className="playList__header__info">
            <View className="playList__header__info__title">
              {playListDetailInfo.name}
            </View>
            <View className="playList__header__info__user">
              <Image
                className="playList__header__info__user_avatar"
                src={playListDetailInfo.creator.avatarUrl}
              />
              {playListDetailInfo.creator.nickname}
            </View>
          </View>
        </View>
        <View className="playList__header--more">
          <View className="playList__header--more__tag">
            标签：
            {playListDetailInfo.tags.map((tag) => (
              <Text key={tag} className="playList__header--more__tag__item">
                {tag}
              </Text>
            ))}
            {playListDetailInfo.tags.length === 0 ? '暂无' : ''}
          </View>
          <View className="playList__header--more__desc">
            {`简介：${playListDetailInfo.description || '暂无'}` }
          </View>
        </View>
        <View className="playList__content">
          <View className="playList__content__title">歌曲列表</View>
          {playListDetailInfo.tracks.length > 0 ? (
            <View className="playList__content__list">
              {playListDetailInfo.tracks.map((track, index) => (
                <View
                  className={classnames({
                    playList__content__list__item: true,
                    disabled: playListDetailPrivileges[index].st === -200
                  })}
                  key={track.id}
                  onClick={
                    () => this.playSong(track.id, playListDetailPrivileges[index].st)
                  }
                >
                  <Text className="playList__content__list__item__index">
                    {index + 1}
                  </Text>
                  <View className="playList__content__list__item__info">
                    <View>
                      <View className="playList__content__list__item__info__name">
                        {track.name}
                      </View>
                      <View className="playList__content__list__item__info__desc">
                        {`${track.ar[0] && (track.ar[0].name || '')} - ${track.al.name}`}
                      </View>
                    </View>
                    <Text className="at-icon at-icon-chevron-right" />
                  </View>
                </View>
              ))}
            </View>
          ) : (<WLoading />)}
        </View>
      </View>
    );
  }
}
