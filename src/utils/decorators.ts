import Taro from '@tarojs/taro';

/**
 * 装饰器可以自己本身是个函数，
 * 或者可以是执行后是一个函数，
 * 这样可以传入需要的参数，
 * 如果本身是一个函数则使用的时候直接@injectPlaySong，
 * 如果想带参数则@injectPlaySong(params)
 * 该装饰器主要是为了解决在离开当前播放页到其他页面后可以继续播放的问题
 */
export function injectPlaySong () {
  return function songDecorator (constructor) {
    return class PlaySong extends constructor {
      public componentWillReceiveProps (nextProps) {
        if (this.props.common.currentSongInfo.name !== nextProps.common.currentSongInfo.name) {
          this.setSongInfo(nextProps.common.currentSongInfo);
        }
        return super.componentWillReceiveProps && super.componentWillReceiveProps();
      }

      public componentWillMount () {
        Taro.eventCenter.off('nextSong');
        return super.componentWillMount && super.componentWillMount();
      }

      public componentDidMount () {
        console.log('test @injectPlaySong');
        Taro.eventCenter.on('nextSong', () => {
          const { playMode } = this.props.songDetail;
          this.playByMode(playMode);
        });
        return super.componentDidMount && super.componentDidMount();
      }

      public componentWillUnmount () {
        return super.componentWillUnmount && super.componentWillUnmount();
      }

      public setSongInfo (songInfo) {
        try {
          const backgroundAudioManager = Taro.getBackgroundAudioManager();
          const { name, al, url } = songInfo;
          console.log('url', url);
          backgroundAudioManager.title = name;
          backgroundAudioManager.coverImgUrl = al.picUrl;
          backgroundAudioManager.src = url;
        } catch (err) {
          console.log('err', err);
          this.getNextSong();
        }
      }

      /**
       * 获取下一首
       */
      public getNextSong () {
        const { currentSongIndex, canPlayList, playMode } = this.props.common;
        if (playMode === 'shuffle') {
          this.getShuffleSong();
          return;
        }
        if (playMode === 'one') {
          this.getCurrentSong();
          return;
        }
        const nextSongIndex = currentSongIndex === canPlayList.length - 1
          ? 0 : currentSongIndex + 1;
        const { id } = canPlayList[nextSongIndex];
        id && this.props.dispatchGetSongDetail({
          id
        });
      }

      /**
       * 随机播放歌曲
       */
      public getShuffleSong () {
        const { canPlayList } = this.props.common;
        const nextSongIndex = Math.floor(Math.random() * (canPlayList.length - 1));
        canPlayList[nextSongIndex].id && this.props.dispatchGetSongDetail({
          id: canPlayList[nextSongIndex].id
        });
      }

      /**
       * 循环播放当前歌曲
       */
      public getCurrentSong () {
        const { currentSongInfo } = this.props.common;
        this.setSongInfo(currentSongInfo);
      }

      /**
       * 根据播放模式进行播放
       * @param {string} playMode
       */
      public playByMode (playMode: string) {
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
    };
  } as any;
}
