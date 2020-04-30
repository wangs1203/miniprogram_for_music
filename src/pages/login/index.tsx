import Taro, { Component, Config } from '@tarojs/taro';
import {
  View
  // Input
} from '@tarojs/components';
import { ReactText } from 'react';
import {
  AtIcon,
  AtInput,
  AtButton,
  AtToast
} from 'taro-ui';
import { connect } from '@tarojs/redux';

import './index.scss';
import { EffectType, loginParams } from './model';

interface PageOwnProps {}

interface PageStateProps {

}

interface PageDispatchProps {
  dispatchFetchLogin: (payload:loginParams) => void;
}

interface PageState {
  phone?: string;
  password?: string;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ login }) => ({
    ...login
  }),
  (dispatch) => ({
    dispatchFetchLogin (payload:loginParams) {
      // console.log(1111);
      console.log(EffectType.getLogin);
      dispatch({
        type: EffectType.getLogin,
        payload
      });
    }
  })
)
export default class LoginView extends Component<IProps, PageState> {
  public config: Config = {
    navigationBarTitleText: '登录'
  }

  public constructor (...rest) {
    super(...rest);
    this.state = {
      phone: '',
      password: ''
    };
  }

  public componentWillUnmount () {

  }

  public componentDidShow () {

  }

  private handleChange = (type: 'phone' | 'password', value:ReactText = '') => {
    const val = type === 'phone' ? ({
      phone: value
    }) : ({
      password: value
    });
    this.setState(val as PageState);
  }

  public render (): JSX.Element {
    const { phone, password } = this.state;
    const { dispatchFetchLogin } = this.props;
    return (
      <View className="login-container">
        <View className="login-content">
          <View className="login-content__item">
            <AtIcon value="iphone" size="24" color="#ccc" />
            <AtInput
              clear
              name="phone"
              type="number"
              placeholder="手机号"
              className="login-content__input"
              maxLength={11}
              value={phone}
              onChange={(val:ReactText) => this.handleChange('phone', val)}
            />
          </View>
          <View className="login-content__item">
            <AtIcon value="lock" size="24" color="#ccc" />
            <AtInput
              clear
              name="password"
              type="password"
              placeholder="密码"
              className="login-content__input"
              value={password}
              onChange={(val) => this.handleChange('password', val)}
            />
          </View>
          <AtButton
            type="primary"
            className="login-content__btn"
            onClick={() => dispatchFetchLogin({
              password: (password as string),
              phone: (phone as string)
            })}
          >
            登录
          </AtButton>
        </View>
        { false && (
          <AtToast
            isOpened
            text="登录中"
            status="loading"
            hasMask
            duration={0}
          />
        )}
      </View>
    );
  }
}
