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
//   AtTabs,
//   AtTabsPane
//   // AtIcon
// } from 'taro-ui';
// import { IndexEffectType } from './model';
import './index.scss';

interface PageOwnProps {}

interface PageStateProps {
}

interface PageDispatchProps {
}

interface PageState {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

class PersonCenter extends Component<IProps, PageState> {
  public config: Config = {
    navigationBarTitleText: '我的'
  }

  public constructor (...rest) {
    super(...rest);
  }

  public componentWillUnmount () {

  }

  public componentDidShow () {}

  public render (): JSX.Element {
    return (
      <View className="">
        wode
      </View>
    );
  }
}
