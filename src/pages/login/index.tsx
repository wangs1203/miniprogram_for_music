import Taro, { Component, Config } from '@tarojs/taro';
import {
  View
} from '@tarojs/components';
// import {

// } from 'taro-ui';
import { connect } from '@tarojs/redux';

import './index.scss';
import { EffectType } from './model';

interface PageOwnProps {}

interface PageStateProps {

}

interface PageDispatchProps {

}

interface PageState {

}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ login }) => ({
    ...login,
  }),
  (dispatch) => ({
    // dispatchFetchUserSubCount () {
    //   dispatch({
    //     type: EffectType.getUserSubCount
    //   });
    // }
  })
)
export default class LoginView extends Component<IProps, PageState> {
  public config: Config = {

  }

  public componentWillUnmount () {

  }

  public componentDidShow () {

  }

  public render (): JSX.Element {
    return (
      <View className="login-page">
        login
      </View>
    )
  }
}
