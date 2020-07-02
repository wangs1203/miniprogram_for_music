import Taro, { Component, Config } from '@tarojs/taro';
import {
  View,
  Image
} from '@tarojs/components';
// import {
// } from 'taro-ui';
import { connect } from '@tarojs/redux';
import './index.scss';
import {
  CommonEffectType,
} from '@/models/common';
import { EffectType,likelistParams } from './model';


interface PageOwnProps {}

interface PageStateProps {
  common: {
    userInfo:any;
    userId:string;
  }
}

interface PageDispatchProps {
  dispatchGetLikeList: (payload:likelistParams) => Promise<undefined>;
  dispatchGetSongDetail: (payload) => Promise<undefined>;
}

interface PageState {

}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ songDetail,common }) => ({
    ...songDetail,
    common
  }),
  (dispatch) => ({
    dispatchGetLikeList: (payload:likelistParams) => dispatch({
      type: EffectType.getLikeList,
      payload
    }),
    dispatchGetSongDetail: (payload) => dispatch({
      type: CommonEffectType.getSongDetail,
      payload
    }),
  })
)
export default class SongDetailView extends Component<IProps, PageState> {
  public config: Config = {

  }

  public componentWillUnmount () {

  }

  public componentWillMount() {
    this.getLikeList();
  }

  public componentDidMount () {
    this.init();
  }

  // public componentDidShow () {
  // }

  private getLikeList = () => {
    console.log(this.props.common.userInfo);
    if (this.props.common.userInfo && this.props.common.userInfo.account &&this.props.common.userInfo.account.id) {
      const {
        account
      } = this.props.common.userInfo;

      this.props.dispatchGetLikeList({uid:account.id})
    }
  }

  private init = () => {
    const { id } = this.$router.params;
    id && this.querySongDetail(id);
  }

  private querySongDetail = async (id:string) => {
    const res = await this.props.dispatchGetSongDetail({id});
    // console.log(res);
  }

  public render (): JSX.Element {
    return (
      <View className="songDetail-page">
        {/* <Image className="song-bg"/> */}
      </View>
    )
  }
}
