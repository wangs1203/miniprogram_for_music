import Taro, { FC, memo } from '@tarojs/taro';
import classnames from 'classnames';
import { View } from '@tarojs/components';
import PropTypes, { InferProps } from 'prop-types';

import './index.scss';

interface Props {
  lrc: {
    scroll: boolean,
    nolyric: boolean,
    uncollected: boolean,
    lrclist: Array<{
      // eslint-disable-next-line camelcase
      lrc_text: string,
      // eslint-disable-next-line camelcase
      lrc_sec: number
    }>
  };
  lrcIndex: number;
  showLyric: boolean;
  onTrigger: () => void;
}

const WLyric:FC<Props> = ({
  lrc,
  lrcIndex,
  showLyric,
  onTrigger
}) => {
  const cls = classnames({
    song__lyric_components: true,
    hidden: !showLyric
  });

  return (
    <View
      className={cls}
      style={{
        overflow: lrc.scroll
          && !lrc.nolyric
          && !lrc.uncollected
          ? 'auto;'
          : 'hidden'
      }}
      onClick={onTrigger}
    >
      <View
        className="song__lyric__wrap"
        style={{
          transform: `translateY(-${(lrcIndex * 100) / lrc.lrclist.length}%)`
        }}
      >
        {lrc.nolyric && !lrc.uncollected && (
          <View className="song__lyric__notext">纯音乐，无歌词</View>
        )}
        {lrc.scroll && !lrc.nolyric && !lrc.uncollected && (
          <View className="song__lyric__notext">*歌词不支持滚动*</View>
        )}
        {lrc.uncollected && !lrc.nolyric && (
          <View className="song__lyric__notext">暂无歌词</View>
        )}
        {lrc.lrclist.map((item, index) => (
          <View
            key={item.lrc_sec}
            className={classnames({
              song__lyric__text: true,
              'song__lyric__text--current': index === lrcIndex && !lrc.scroll,
              siblings2:
                index === lrcIndex - 7
                || index === lrcIndex + 7
                || index === lrcIndex - 6
                || index === lrcIndex + 6,
              siblings1: index === lrcIndex - 5 || index === lrcIndex + 5
            })}
            data-time={item.lrc_sec}
          >
            {item.lrc_text}
          </View>
        ))}
      </View>
    </View>
  );
};

const propTypes:InferProps<Props> = {
  lrc: PropTypes.shape({
    scroll: PropTypes.bool,
    nolyric: PropTypes.bool,
    uncollected: PropTypes.bool,
    lrclist: PropTypes.array
  }),
  lrcIndex: PropTypes.number,
  showLyric: PropTypes.bool,
  onTrigger: PropTypes.func
};

const defaultProps: Props = {
  lrc: {
    scroll: false,
    nolyric: false,
    uncollected: false,
    lrclist: []
  },
  lrcIndex: 0,
  showLyric: false,
  onTrigger: () => {}
};

WLyric.defaultProps = defaultProps;
WLyric.propTypes = propTypes;

export default memo(WLyric, (prevProps, nextProps) => (
  prevProps.showLyric === nextProps.showLyric
    && prevProps.lrcIndex === nextProps.lrcIndex
));
