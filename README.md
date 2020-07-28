# miniprogram_for_music

## 仿网易云音乐小程序（不定时更新）

> 基于`Taro + taro-ui + redux + dva + typescript`，目前着重前端展示，借此项目强化下上述几个技术栈的使用，此项目会不定时更新，欢迎`watch`和`star`～

<hr/>

[![GitHub stars](https://img.shields.io/github/stars/wangs1203/miniprogram_for_music.svg?style=flat&label=Star)](https://github.com/wangs1203/miniprogram_for_music/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/wangs1203/miniprogram_for_music.svg?style=flat&label=Fork)](https://github.com/wangs1203/miniprogram_for_music/fork)
[![GitHub watchers](https://img.shields.io/github/watchers/wangs1203/miniprogram_for_music.svg?style=flat&label=Watch)](https://github.com/wangs1203/miniprogram_for_music/watchers)


```
启动后端接口服务

git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git

cd NeteaseCloudMusicApi

npm i

npm run start

接下来启动前端项目

git clone https://github.com/wangs1203/miniprogram_for_music.git

cd miniprogram_for_music

npm i

npm run dev:weapp

```

## 功能列表

- [x] 用户登陆
- [x] 退出登陆
- [ ] 我的电台
- [ ] 我的收藏
- [ ] 我的关注列表
- [ ] 我的粉丝列表
- [ ] 我的动态列表
- [ ] 最近播放列表
- [x] 推荐歌单
- [x] 推荐电台
- [ ] 我创建的歌单列表
- [ ] 我收藏的歌单列表
- [x] 歌曲播放页面
- [x] 歌词滚动
- [x] 歌曲切换播放模式（随机播放/单曲循环/顺序播放）
- [x] 切换上一首/下一首
- [x] 喜欢/取消喜欢某首歌曲
- [ ] 评论列表
- [ ] 视频播放
- [x] 热搜
- [x] 搜索（包含单曲/歌单/视频/歌手/专辑/电台/用户）
- [ ] 播放组件

## 目录结构简要介绍

```
- src
  - assets // 静态资源目录，这里引入了所需的图片资源，以及`fontawesome`字体图标资源 还有样式文件
  - components // 封装的项目中可复用的组件氛围 分为base，business。
  - config // 请求地址配置或其他环境配置项
  - constants //常量维护
  - models // dva中的model导出和常用common model
  - pages // 项目中的业务页面
  - services // 可复用的服务可以放在这个目录中，目前只是封装了接口请求的公共服务
  - typings // ts类型声明，和第三方模块补充类型
  - utils // 可以复用的工具方法可以放到这个目录当中，目前封装了格式化、歌词解析的相关方法，和decorators
  - app.tsx // 全局入口文件
  - index.html // html入口
```

> 在此由衷的感谢的开源项目
[NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi/#/),
> [taro-music](https://github.com/lsqy/taro-music),
