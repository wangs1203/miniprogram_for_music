import Taro, { FC, memo } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import {
  AtIcon
} from 'taro-ui';
import PropTypes, { InferProps } from 'prop-types';
import {
  formatCount,
  formatNumber
} from '@utils/common';

import './index.scss';

interface Props {
  video: {
    videos: Array<StoreSpace.Video>,
    more?: boolean,
    moreText?: string
  };
  switchTab?: (activeTab:number) => void;
  showTitle?: boolean;
  showMoreText?: boolean;
}

const VideoListVIew: FC<Props> = ({
  video, switchTab = () => {}, showTitle, showMoreText
}) => {
  console.log(video);
  const formatDuration = (ms: number) => {
    // @ts-ignore
    const minutes: string = formatNumber(parseInt(ms / 60000, 10));
    // @ts-ignore
    const seconds: string = formatNumber(parseInt((ms / 1000) % 60, 10));
    return `${minutes}:${seconds}`;
  };
  return (
    <View>
      {showTitle && (<View className="title-class">视频</View>)}
      <View>
        {video.videos.map((item) => (
          <View
            className="search_content__video__item"
            key={item.vid}
          >
            <View className="search_content__video__item__cover--wrap">
              <View className="search_content__video__item__cover--playtime">
                <Text className="at-icon at-icon-play" />
                <Text>{formatCount(item.playTime)}</Text>
              </View>
              <Image
                src={item.coverUrl}
                className="search_content__video__item__cover"
              />
            </View>
            <View className="search_content__video__item__info">
              <View className="search_content__video__item__info__title">
                {item.title}
              </View>
              <View className="search_content__video__item__info__desc">
                <Text>
                  {`${formatDuration(item.durationms)},`}
                </Text>
                <Text className="search_content__video__item__info__desc__nickname">
                  {`by ${item.creator[0].userName}`}
                </Text>
              </View>
            </View>
          </View>
        ))}
        {showMoreText && video.moreText && (
        <View
          className="content-more-class"
          onClick={() => switchTab(3)}
        >
          {video.moreText}
          <AtIcon
            value="chevron-right"
            size="16"
            color="#ccc"
          />
        </View>
        )}
      </View>
    </View>
  );
};

const propTypes: InferProps<Props> = {
  video: PropTypes.shape({
    videos: PropTypes.array,
    more: PropTypes.bool,
    moreText: PropTypes.string
  }),
  switchTab: PropTypes.func,
  showTitle: PropTypes.bool,
  showMoreText: PropTypes.bool
};
const defaultProps: Props = {
  video: {
    videos: []
  },
  switchTab: () => {},
  showTitle: true,
  showMoreText: true
};
VideoListVIew.externalClasses = ['title-class', 'content-more-class'];
VideoListVIew.defaultProps = defaultProps;
VideoListVIew.propTypes = propTypes;
export default memo(VideoListVIew, (oldProps, newProps) => (
  oldProps.video === newProps.video
));
