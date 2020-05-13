/**
 * pages模版快速生成脚本,执行命令 npm run tep `文件名`
 */

const fs = require('fs');

const dirName = process.argv[2];
console.log(process.argv);
console.log(process.argv[2]);

function titleCase (str) {
  const array = str.toLowerCase().split(' ');
  for (let i = 0; i < array.length; i++) {
    array[i] = array[i][0].toUpperCase() + array[i].substring(1, array[i].length);
  }
  const string = array.join(' ');
  return string;
}

if (!dirName) {
  console.log('文件夹名称不能为空！');
  console.log('示例：yarn temp demo');
  process.exit(0);
}

// 页面模版
const indexTep = `import Taro, { Component, Config } from '@tarojs/taro';
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
  ({ ${dirName} }) => ({
    ...${dirName},
  }),
  (dispatch) => ({
    // dispatchFetchUserSubCount () {
    //   dispatch({
    //     type: EffectType.getUserSubCount
    //   });
    // }
  })
)
export default class ${titleCase(dirName)}View extends Component<IProps, PageState> {
  public config: Config = {

  }

  public componentWillUnmount () {

  }

  public componentDidShow () {

  }

  public render (): JSX.Element {
    return (
      <View className="${dirName}-page">
        ${dirName}
      </View>
    )
  }
}
`;

// scss文件模版
// const scssTep = `@import "../../styles/mixin";
const scssTep = `.${dirName}-page {
  @include wh(100%, 100%);
}
`;

// model文件模版
const modelTep = `// import Taro from '@tarojs/taro';
import { Model } from 'dva-core';
import modelExtend from 'dva-model-extend';
import { model } from '@utils/model';
import * as ${dirName}Api from './service';

export const enum EffectType {
  effectsDemo = '${dirName}/effectsDemo'
}

export default modelExtend(model, {
  namespace: '${dirName}',
  state: {

  },

  effects: {
    * effectsDemo({ payload }, { call, put }) {
      const res = yield call(${dirName}Api.demo, {});
      console.log(res);

      const {
        isOk,
        result
      } = res;
      // TODO: 接口后续处理...
      // if (isOk) {
      //   yield put({
      //     type: 'updateState',
      //     payload: {
      //     }
      //   });
      // }
    },
  }
}) as Model;
`;

// service页面模版
const serviceTep = `import Request from '@services/http';
import {
  ${dirName}URL
} from '@services/apis';

interface ${dirName}Params {
  ${dirName}Param: string;
}

/**
 *
 * 说明 :
 */
export const fetch${dirName} = (
  params:{}
) => Request.post({ url: ${dirName}URL, data: params });
`;

fs.mkdirSync(`./src/pages/${dirName}`); // mkdir $1
process.chdir(`./src/pages/${dirName}`); // cd $1

fs.writeFileSync('index.tsx', indexTep);
fs.writeFileSync('index.scss', scssTep);
fs.writeFileSync('model.ts', modelTep);
fs.writeFileSync('service.ts', serviceTep);

console.log(`模版${dirName}已创建,请手动增加models`);

process.exit(0);
