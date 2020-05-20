import Taro, { FC, memo } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import {
  AtIcon
} from 'taro-ui';
import PropTypes, { InferProps } from 'prop-types';
import {
  formatCount
} from '@utils/common';

import '../styles/playlist.scss';

interface Props {
  playList: {
    playLists: Array<StoreSpace.PlayList>,
    more?: boolean,
    moreText?: string
  };
  switchTab?: (activeTab:number) => void;
  showTitle?: boolean;
  showMoreText?: boolean;
}

const PlayListView: FC<Props> = ({
  playList, switchTab = () => {}, showTitle, showMoreText
}) => (
  <View>
    {showTitle && (<View className="title-class">歌单</View>)}
    {playList.playLists.map((item) => (
      <View
        className="search_content__playList__item"
        key={item.id}
      >
        <View>
          <Image
            src={item.coverImgUrl}
            className="search_content__playList__item__cover"
          />
        </View>
        <View className="search_content__playList__item__info">
          <View className="search_content__playList__item__info__title">
            {item.name}
          </View>
          <View className="search_content__playList__item__info__desc">
            <Text>{`${item.trackCount}首音乐`}</Text>
            <Text className="search_content__playList__item__info__desc__nickname">
              {`by ${item.creator.nickname}`}
            </Text>
            <Text>{`${formatCount(item.playCount)}次`}</Text>
          </View>
        </View>
      </View>
    ))}
    {showMoreText && playList.moreText && (
      <View
        className="content-more-class"
        onClick={() => switchTab(2)}
      >
        {playList.moreText}
        <AtIcon
          value="chevron-right"
          size="16"
          color="#ccc"
        />
      </View>
    )}
  </View>
);

const propTypes:InferProps<Props> = {
  playList: PropTypes.shape({
    playLists: PropTypes.array,
    more: PropTypes.bool,
    moreText: PropTypes.string
  }),
  switchTab: PropTypes.func,
  showTitle: PropTypes.bool,
  showMoreText: PropTypes.bool
};
const defaultProps: Props = {
  playList: {
    playLists: []
  },
  switchTab: () => {},
  showTitle: true,
  showMoreText: true
};

PlayListView.externalClasses = ['title-class', 'content-more-class'];
PlayListView.defaultProps = defaultProps;
PlayListView.propTypes = propTypes;
export default memo(PlayListView, (oldProps, newProps) => (
  oldProps.playList === newProps.playList
));
