import Taro, { FC, memo } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import {
  AtIcon
} from 'taro-ui';
import PropTypes, { InferProps } from 'prop-types';

import '../styles/artists.scss';

interface Props {
  user: {
    users: Array<StoreSpace.User>,
    more?: boolean,
    moreText?: string
  };
  switchTab?: (activeTab:number) => void;
  showTitle?: boolean;
  showMoreText?: boolean;
}

const UsersView: FC<Props> = ({
  user,
  switchTab = () => {},
  showTitle,
  showMoreText
}) => {
  console.log(user);
  return (
    <View>
      {showTitle && (<View className="title-class">用户</View>)}
      <View>
        {user.users.map((item) => (
          <View
            className="search_content__artist__item"
            key={item.userId}
            // onClick={this.showTip.bind(this)}
          >
            <Image
              src={item.avatarUrl}
              className="search_content__artist__item__cover"
            />
            <View className="search_content__artist__item__info">
              <View>
                {item.nickname}
                {item.gender === 1 && (
                  <AtIcon
                    prefixClass="fa"
                    value="mars"
                    size="12"
                    color="#5cb8e7"
                  />
                )}
                {item.gender === 2 && (
                  <AtIcon
                    prefixClass="fa"
                    value="venus"
                    size="12"
                    color="#f88fb8"
                  />
                )}
              </View>
              {item.signature && (
                <View className="search_content__artist__item__desc">
                  {item.signature}
                </View>
              )}
            </View>
          </View>
        ))}
        {showMoreText && user.moreText && (
          <View
            className="content-more-class"
            onClick={() => switchTab(7)}
          >
            {user.moreText}
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
  user: PropTypes.shape({
    users: PropTypes.array,
    more: PropTypes.bool,
    moreText: PropTypes.string
  }),
  switchTab: PropTypes.func,
  showTitle: PropTypes.bool,
  showMoreText: PropTypes.bool
};
const defaultProps: Props = {
  user: {
    users: []
  },
  switchTab: () => {},
  showTitle: true,
  showMoreText: true
};
UsersView.externalClasses = ['title-class', 'content-more-class'];
UsersView.defaultProps = defaultProps;
UsersView.propTypes = propTypes;
export default memo(UsersView, (oldProps, newProps) => (
  oldProps.user === newProps.user
));
