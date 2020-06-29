import Taro, { FC, memo } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
// import {
//   AtIcon
// } from 'taro-ui';
import PropTypes, { InferProps } from 'prop-types';
import {
  formatCount,
  formatNumber
} from '@utils/common';

import '../styles/videos.scss';

interface Props {
  mv: {
    mvs: Array<StoreSpace.MV>,
    more?: boolean,
    moreText?: string
  };
  // switchTab?: (activeTab:number) => void;
  showTitle?: boolean;
}

const MVView: FC<Props> = ({
  mv,
  showTitle
}) => {
  // console.log(video);
  const formatDuration = (ms: number) => {
    // @ts-ignore
    const minutes: string = formatNumber(parseInt(ms / 60000, 10));
    // @ts-ignore
    const seconds: string = formatNumber(parseInt((ms / 1000) % 60, 10));
    return `${minutes}:${seconds}`;
  };
  return (
    <View>
      {showTitle && (<View className="title-class">MV</View>)}
      <View>
        {mv.mvs.map((item) => (
          <View
            className="search_content__video__item"
            key={item.id}
          >
            <View className="search_content__video__item__cover--wrap">
              <View className="search_content__video__item__cover--playtime">
                <Text className="at-icon at-icon-play" />
                <Text>{formatCount(item.playCount)}</Text>
              </View>
              <Image
                src={item.cover}
                className="search_content__video__item__cover"
              />
            </View>

            <View className="search_content__video__item__info">
              <View className="search_content__video__item__info__title">
                {item.name}
              </View>
              <View className="search_content__video__item__info__desc">
                <Text>
                  {`${formatDuration(item.duration)},`}
                </Text>
                <Text className="search_content__video__item__info__desc__nickname">
                  {`by ${item.artists[0].name}`}
                </Text>
              </View>
            </View>

          </View>
        ))}
      </View>
    </View>
  );
};
const propTypes: InferProps<Props> = {
  mv: PropTypes.shape({
    mvs: PropTypes.array,
    more: PropTypes.bool,
    moreText: PropTypes.string
  }),
  // switchTab: PropTypes.func,
  showTitle: PropTypes.bool
};
const defaultProps: Props = {
  mv: {
    mvs: []
  },
  // switchTab: () => {},
  showTitle: true
};
MVView.externalClasses = ['title-class', 'content-more-class'];
MVView.defaultProps = defaultProps;
MVView.propTypes = propTypes;
export default memo(MVView, (oldProps, newProps) => (
  oldProps.mv === newProps.mv
));
