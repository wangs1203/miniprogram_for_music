declare module '*.bmp' {
  const src: string;
  export default src;
}
declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';

// @ts-ignore
declare const process: {
  env: {
    TARO_ENV: 'weapp' | 'swan' | 'alipay' | 'h5' | 'rn' | 'tt',
    [key: string]: any
  }
};
declare interface Error {
  name: string;
  message: string;
  stack?: string;
  response: API.Response;
  errorCode: string | number;
}

declare interface Promise<T> {
  abort: () => void;
}

declare interface Event {
  id: number;
  user: {
    avatarUrl: string,
    nickname: string
  };
  eventTime: number;
  forwardCount: number;
  json: string;
  info: {
    commentCount: number,
    likedCount: number,
    shareCount: number
  };
}
declare namespace StoreSpace {
  interface UserInfo {
    account: {
      id: number
    };
    profile: {
      avatarUrl: string,
      backgroundUrl: string,
      nickname: string,
      eventCount: number,
      follows: number,
      followeds: number
    };
  }
  interface ListItemInfo {
    coverImgUrl: string;
    name: string;
    trackCount: number;
    playCount: number;
    id:number;
  }
  interface Artist {
    accountId?: number;
    albumSize?: number;
    alg?: string;
    followed?: boolean;
    img1v1?:number;
    img1v1Url?: string;
    mvSize?: number;
    name: string;
    id: number;
    picId?:number;
    picUrl?: string;
    alias: Array<string> | null;
    transNames?: Array<string> | null;
    trans?: null | string;
    musicSize?: number;
    briefDesc?: string;
  }
  interface Song {
    name: string;
    id: number;
    alia: Array<string>;
    ar: Array<Artist>;
    al: Album;
    dt: number; // 总时长，ms
    st: number; // 是否喜欢 0/1
    copyright: number;
    current?: boolean; // 当前播放
    url?: string; // 当前播放
  }
  interface Song2 {
    name: string;
    id: number;
    alias: Array<string>;
    artists: Array<Artist>;
    album: Album;
  }
  interface RecentPlaySong {
    playCount: number;
    score: number;
    song: Song;
  }
  interface Album {
    name: string;
    id: number;
    picUrl: string;
    blurPicUrl: string;
    songs: Array<Song>;
    artist: Artist;
    artists: Array<Artist>;
    publishTime:number;
    containedSong: string;
  }
  interface PlayList {
    coverImgUrl: string;
    name: string;
    playCount: number;
    tags: string[];
    creator: {
      avatarUrl: string,
      nickname: string
    };
    tracks: Song[];
    description: string;
    subscribedCount: number;
    subscribers: Array<{
      name: string,
      avatarUrl: string
    }>;
    id: number;
    trackCount: number;
  }
  interface PlaySong {
    // 可播放歌曲列表
    canPlayList: Array<Song>;
    // 是否正在播放
    isPlaying: boolean;
    // 当前播放的歌曲id
    currentSongId: string;
    // 当前播放的歌曲详情
    currentSongInfo: Song;
    // 当前播放的歌曲在播放列表中的索引,默认第一首
    currentSongIndex: number;
    // 播放模式
    playMode: 'loop' | 'one' | 'shuffle';
    // 喜欢列表
    recentTab: number;
  }
  interface Lrc {
    scroll: boolean;
    nolyric: boolean;
    uncollected: boolean;
    lrclist: Array<{
      // eslint-disable-next-line camelcase
      lrc_text: string,
      // eslint-disable-next-line camelcase
      lrc_sec: number
    }>;
  }
  interface Banner{
    pic: string;
    targetType: number; // 1歌曲 10专辑 3000h5
    targetId: number; //
    url?: string;
    typeTitle: string;
  }
  interface Video {
    title: string;
    vid: string;
    coverUrl: string;
    creator: Array<{
      userName: string
    }>;
    durationms: number;
    playTime: number;
  }
  interface User {
    nickname: string;
    userId: number;
    avatarUrl: string;
    gender: number;
    signature: string;
  }
  interface DjRadio {
    name: string;
    id: number;
    picUrl: string;
    desc: string;
  }

  interface MV {
    name: string;
    id: string;
    cover: string;
    artists: Array<Artist>;
    duration: number;
    playCount: number;
  }

  interface Privileges {
    cp: number;
    cs: boolean;
    dl: number;
    downloadMaxbr: number;
    fee: number;
    fl: number;
    flag: number;
    id: number;
    maxbr: number;
    payed: number;
    pl: number;
    playMaxbr: number;
    preSell: boolean;
    sp: number;
    st: number;
    subp: number;
    toast: boolean;
  }
}
