import Taro, { FC, memo } from '@tarojs/taro';
import { View } from '@tarojs/components';
import {
  AtIcon
} from 'taro-ui';
import PropTypes, { InferProps } from 'prop-types';
import './index.scss';

interface Props {
  song?: {
    songs?: Array<StoreSpace.Song>,
    more?: boolean,
    moreText?: string
  };
  switchTab: (activeTab:number) => void;
}

const SongInfoView: FC<Props> = ({ song, switchTab }) => (
  <View>
    {/* <View className="search_content__title">单曲</View> */}
    <View className="title-class">单曲</View>
    {song && song.songs && song.songs.map((item) => (
      <View
        key={item.id}
        className="searchResult__music"
      >
        <View
          className="searchResult__music__info"
        >
          <View className="searchResult__music__info__name">
            {item.name}
          </View>
          <View className="searchResult__music__info__desc">
            {`${item.ar[0] ? item.ar[0].name : ''} - ${
              item.al.name
            }`}
          </View>
        </View>
        <View
          className="fa fa-ellipsis-v searchResult__music__icon"
        />
      </View>
    ))}
    {song && song.moreText && (
      <View
        className="content-more-class"
        // className="search_content__more"
        onClick={() => { switchTab(1); }}
      >
        {song.moreText}
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
  song: PropTypes.shape({
    songs: PropTypes.array,
    more: PropTypes.bool,
    moreText: PropTypes.string
  }),
  switchTab: PropTypes.func
};
const defaultProps: Props = {
  song: {},
  switchTab: () => {}
};
SongInfoView.externalClasses = ['title-class', 'content-more-class'];
SongInfoView.defaultProps = defaultProps;
SongInfoView.propTypes = propTypes;

export default memo(SongInfoView, (oldProps, newProps) => (
  oldProps.song === newProps.song
));
