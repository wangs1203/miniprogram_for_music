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
