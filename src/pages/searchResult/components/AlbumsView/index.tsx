import Taro, { FC, memo } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import {
  AtIcon
} from 'taro-ui';
import PropTypes, { InferProps } from 'prop-types';
import {
  // setKeywordInHistory,
  // formatCount
  // formatNumber
  formatTimeStampToTime
} from '@utils/common';

import '../styles/playlist.scss';

interface Props {
  album: {
    albums: Array<StoreSpace.Album>,
    more?: boolean,
    moreText?: string
  };
  switchTab?: (activeTab:number) => void;
  showTitle?: boolean;
  showMoreText?: boolean;
}

const AlbumsView: FC<Props> = ({
  album,
  switchTab = () => {},
  showTitle,
  showMoreText
}) => {
  console.log(album);
  return (
    <View>
      {showTitle && (<View className="title-class">专辑</View>)}
      <View>
        {album.albums.map((item) => (
          <View
            className="search_content__playList__item"
            key={item.id}
          >
            <View>
              <Image
                src={item.picUrl}
                className="search_content__playList__item__cover"
              />
            </View>
            <View className="search_content__playList__item__info">
              <View className="search_content__playList__item__info__title">
                {item.name}
              </View>
              <View className="search_content__playList__item__info__desc">
                <Text>{item.artist.name}</Text>
                <Text className="search_content__playList__item__info__desc__nickname">
                  {item.containedSong
                    ? `包含单曲：${item.containedSong}`
                    : formatTimeStampToTime(item.publishTime)}
                </Text>
              </View>
            </View>
          </View>
        ))}
        {showMoreText && album.moreText && (
          <View
            className="content-more-class"
            onClick={() => switchTab(5)}
          >
            {album.moreText}
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
const propTypes:InferProps<Props> = {
  album: PropTypes.shape({
    albums: PropTypes.array,
    more: PropTypes.bool,
    moreText: PropTypes.string
  }),
  switchTab: PropTypes.func,
  showTitle: PropTypes.bool,
  showMoreText: PropTypes.bool
};
const defaultProps: Props = {
  album: {
    albums: []
  },
  switchTab: () => {},
  showTitle: true,
  showMoreText: true
};

AlbumsView.externalClasses = ['title-class', 'content-more-class'];
AlbumsView.defaultProps = defaultProps;
AlbumsView.propTypes = propTypes;
export default memo(AlbumsView, (oldProps, newProps) => (
  oldProps.album === newProps.album
));
