import Taro from '@tarojs/taro';

/**
 * 格式化播放次数
 * @param {number|string} times
 */
export const formatCount = (times:number|string) => {
  let formatTime: number|string = 0;
  times = times ? Number(times) : 0;
  switch (true) {
    case times > 100000000:
      formatTime = `${(times / 100000000).toFixed(1)}亿`;
      break;
    case times > 100000:
      formatTime = `${(times / 10000).toFixed(1)}万`;
      break;
    default:
      formatTime = times;
  }
  return formatTime;
};

export const formatNumber = (n: number | string) : string => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

/**
 * 格式化时间戳为日期
 * @param timestamp
 */
export const formatTimeStampToTime = (timestamp:number) => {
  const date = new Date(timestamp);// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const year = date.getFullYear();
  const month = (date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1);
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  // const hour = date.getHours() + ':';
  // const minutes = date.getMinutes() + ':';
  // const second = date.getSeconds();
  return `${year}-${month}-${day}`;
};

/**
 * 数组去重
 * es5 hash去重
 * @param {any[]} arr
 * @returns {any[]}
*/
export const unique = (arr: any[]) => {
  // n为hash表，r为临时数组
  const n = {};
  const r:any[] = [];
  for (let i = 0; i < arr.length; i++) {
    // 如果hash表中没有当前项
    const hash = JSON.stringify(arr[i]);
    if (!n[hash]) {
      // 存入hash表
      n[hash] = true;
      // 把当前数组的当前项push到临时数组里面
      r.push(arr[i]);
    }
  }
  return r;
};
/**
 * 存储搜索关键字
 * @param {string} keyword
 */
export const setKeywordInHistory = (keyword: string) => {
  let keywordsList: Array<string> = Taro.getStorageSync('keywordsList') || [];
  console.log('keywordsList', keywordsList);
  keywordsList.unshift(keyword);
  keywordsList = unique(keywordsList);
  Taro.setStorage({ key: 'keywordsList', data: keywordsList });
};

/**
 * 获取搜索关键字
 */
export const getKeywordInHistory = () : Array<string> => Taro.getStorageSync('keywordsList');

/**
 * 清除搜索关键字
 */
export const clearKeywordInHistory = () => {
  Taro.removeStorageSync('keywordsList');
};

/**
 * 转换歌词字符串为数组
 * @param lrcContent
 */
export const parseLrc = (lrcContent: string) => {
  // 声明一个临时数组
  const nowLrc: Array<{
    // eslint-disable-next-line camelcase
    lrc_text: string,
    // eslint-disable-next-line camelcase
    lrc_sec?: number
  }> = [];
  // 将原始的歌词通过换行符转为数组
  const lrcRow: Array<string> = lrcContent.split('\n');
  // 默认scroll初始值为true
  let scroll = true;
  for (const i in lrcRow) {
    if ((lrcRow[i].indexOf(']') === -1) && lrcRow[i]) {
      nowLrc.push({ lrc_text: lrcRow[i] });
    } else if (lrcRow[i] !== '') {
      const tmp: string[] = lrcRow[i].split(']');
      for (const j in tmp) {
        if ({}.hasOwnProperty.call(tmp, j)) {
          scroll = false;
          const tmp2: string = tmp[j].substr(1, 8);
          const tmp3: any = tmp2.split(':');
          // eslint-disable-next-line camelcase
          const lrc_sec: number = Number(tmp3[0] * 60 + Number(tmp3[1]));
          // eslint-disable-next-line camelcase
          if (lrc_sec && (lrc_sec > 0)) {
            const lrc = (tmp[tmp.length - 1]).replace(/(^\s*)|(\s*$)/g, '');
            lrc && nowLrc.push({ lrc_sec, lrc_text: lrc });
          }
        }
      }
    }
  }
  if (!scroll) {
    nowLrc.sort((
      a: {
        // eslint-disable-next-line camelcase
        lrc_sec: number,
        // eslint-disable-next-line camelcase
        lrc_text: string
      },
      b: {
        // eslint-disable-next-line camelcase
        lrc_sec: number,
        // eslint-disable-next-line camelcase
        lrc_text: string
      }
    ) : number => a.lrc_sec - b.lrc_sec);
  }
  return {
    nowLrc,
    scroll
  };
};
