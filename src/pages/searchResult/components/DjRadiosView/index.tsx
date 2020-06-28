import Taro, { FC, memo } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import {
  AtIcon
} from 'taro-ui';
import PropTypes, { InferProps } from 'prop-types';

import '../styles/playlist.scss';

interface Props {
  djRadio: {
    djRadios: Array<StoreSpace.DjRadio>,
    more?: boolean,
    moreText?: string
  };
  switchTab?: (activeTab:number) => void;
  showTitle?: boolean;
  showMoreText?: boolean;
}

const DjRadiosView: FC<Props> = ({
  djRadio,
  switchTab = () => {},
  showTitle,
  showMoreText
}) => {
  console.log(djRadio);
  return (
    <View>
      {showTitle && (<View className="title-class">电台</View>)}
      <View>
        {djRadio.djRadios.map((item) => (
          <View
            className="search_content__playList__item"
            key={item.id}
            // TODO: click event
            // onClick={this.showTip.bind(this)}
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
                <Text>{item.desc}</Text>
              </View>
            </View>
          </View>
        ))}
        {showMoreText && djRadio.moreText && (
          <View
            className="content-more-class"
            onClick={() => switchTab(6)}
          >
            {djRadio.moreText}
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
  djRadio: PropTypes.shape({
    djRadios: PropTypes.array,
    more: PropTypes.bool,
    moreText: PropTypes.string
  }),
  switchTab: PropTypes.func,
  showTitle: PropTypes.bool,
  showMoreText: PropTypes.bool
};
const defaultProps: Props = {
  djRadio: {
    djRadios: []
  },
  switchTab: () => {},
  showTitle: true,
  showMoreText: true
};

DjRadiosView.externalClasses = ['title-class', 'content-more-class'];
DjRadiosView.defaultProps = defaultProps;
DjRadiosView.propTypes = propTypes;
export default memo(DjRadiosView, (oldProps, newProps) => (
  oldProps.djRadio === newProps.djRadio
));
