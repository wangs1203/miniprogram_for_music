import Taro, { Component, Config } from '@tarojs/taro';
import {
  View
  // Text,
  // Image,
  // Swiper,
  // SwiperItem,
  // Canvas,
  // ScrollView
} from '@tarojs/components';
import { connect } from '@tarojs/redux';
// import {
// AtNoticebar
// AtTabsPane
// AtIcon
// } from 'taro-ui';
// import { IndexEffectType } from './model';
import './index.scss';

interface PageOwnProps {}

interface PageStateProps {
  common:any;
}

interface PageDispatchProps {
}

interface PageState {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;
@connect(
  ({ common }) => ({
    common
  }),
  (dispatch) => {

  }
)
class PersonCenter extends Component<IProps, PageState> {
  public config: Config = {
    navigationBarTitleText: '我的'
  }

  // eslint-disable-next-line no-useless-constructor
  public constructor (...rest) {
    super(...rest);
  }

  public componentWillUnmount () {

  }

  public componentDidShow () {}

  public render (): JSX.Element {
    return (
      <View>
        test
      </View>
    );
  }
}

export default PersonCenter;
