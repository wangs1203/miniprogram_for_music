import '@tarojs/async-await';
import Taro, { } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';

import dva from 'utils/dva';
import Index from 'pages/index/index';
import models from 'models/index';

import 'fonts/iconfont/icon.scss';
import 'styles/base.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const dvaApp = dva.createApp({
  initialState: {},
  models
});

const store = dvaApp.getStore();

class App extends Taro.Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  public config: Taro.Config = {
    pages: [
      'pages/index/index',
      'pages/personalCenter/index',
      'pages/login/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#ffffff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#7A7E83',
      selectedColor: '#c73420',
      borderStyle: 'black',
      backgroundColor: '#ffffff',
      list: [
        {
          text: '发现',
          pagePath: 'pages/index/index',
          iconPath: 'assets/images/music.png',
          selectedIconPath: 'assets/images/selected-music.png'
        },
        {
          text: '我的',
          pagePath: 'pages/personalCenter/index',
          iconPath: 'assets/images/me.png',
          selectedIconPath: 'assets/images/selected-me.png'
        }
        // {
        //   text: '账号',
        //   pagePath: 'pages/account/index',
        //   iconPath: 'assets/images/me.png',
        //   selectedIconPath: 'assets/images/selected-me.png',
        // }
      ]
    },
    requiredBackgroundModes: ['audio']
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  public render (): JSX.Element {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
