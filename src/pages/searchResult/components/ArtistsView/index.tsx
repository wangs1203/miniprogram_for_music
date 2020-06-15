import Taro, { FC, memo } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import {
  AtIcon
} from 'taro-ui';
import PropTypes, { InferProps } from 'prop-types';

import '../styles/artists.scss';

interface Props {
  artist: {
    artists: Array<StoreSpace.Artist>,
    more?: boolean,
    moreText?: string
  };
  showTitle?: boolean;
  switchTab?: (activeTab:number) => void;
  showMoreText?: boolean;
}

const ArtistsView: FC<Props> = ({
  artist,
  switchTab = () => {},
  showTitle
}) => {
  console.log(artist);
  return (
    <View>
      {showTitle && (<View className="title-class">歌手</View>)}
      <View>
        {artist.artists.map((item) => (
          <View
            className="search_content__artist__item"
            key={item.id}
          >
            <Image
              src={item.picUrl}
              className="search_content__artist__item__cover"
            />
            <Text>
              {item.name}
              {item.alias[0] ? `（${item.alias[0]}）` : ''}
            </Text>
          </View>
        ))}
        {artist.moreText && (
          <View
            className="content-more-class"
            onClick={() => switchTab(4)}
          >
            {artist.moreText}
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
  artist: PropTypes.shape({
    artists: PropTypes.array,
    more: PropTypes.bool,
    moreText: PropTypes.string
  }),
  switchTab: PropTypes.func,
  showTitle: PropTypes.bool
};
const defaultProps: Props = {
  artist: {
    artists: []
  },
  switchTab: () => {},
  showTitle: true
};
ArtistsView.externalClasses = ['title-class', 'content-more-class'];
ArtistsView.defaultProps = defaultProps;
ArtistsView.propTypes = propTypes;
export default memo(ArtistsView, (oldProps, newProps) => (
  oldProps.artist === newProps.artist
));
