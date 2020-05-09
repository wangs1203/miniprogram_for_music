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
