const path = require('path');
const devConf = require('./dev');
const prodConf = require('./prod');

const config = {
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    '@fonts': path.resolve(__dirname, '..', 'src/assets/fonts'),
    '@images': path.resolve(__dirname, '..', 'src/assets/images'),
    '@styles': path.resolve(__dirname, '..', 'src/assets/styles'),
    '@components': path.resolve(__dirname, '..', 'src/components'),
    '@config': path.resolve(__dirname, '..', 'src/config'),
    '@constants': path.resolve(__dirname, '..', 'src/constants'),
    '@models': path.resolve(__dirname, '..', 'src/models'),
    '@pages': path.resolve(__dirname, '..', 'src/pages'),
    '@services': path.resolve(__dirname, '..', 'src/services'),
    '@utils': path.resolve(__dirname, '..', 'src/utils')
  },
  projectName: 'miniprogram_for_music',
  date: '2019-12-22',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread'
    ]
  },
  sass: {
    resource: 'src/assets/styles/mixin.scss',
    // resource: [
    //   path.resolve(__dirname, '..', 'src/assets/styles/mixin.scss'),
    //   path.resolve(__dirname, '..', 'src/styles/mixins.scss')
    // ],
    projectDirectory: path.resolve(__dirname, '..')
  },
  plugins: [
    '@tarojs/plugin-sass'
  ],
  defineConstants: {},
  mini: {
    webpackChain (chain, webpack) {},
    cssLoaderOption: {},
    cssLoaderOption: {},
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024000 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function(merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, devConf)
  }
  return merge({}, config, prodConf)
}
