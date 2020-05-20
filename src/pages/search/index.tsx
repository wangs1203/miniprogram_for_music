import Taro, { Component, Config } from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import {
  View,
  ScrollView,
  Text,
  Image
} from '@tarojs/components';
import {
  AtSearchBar,
  AtIcon
} from 'taro-ui';
import classnames from 'classnames';
import WLoading from '@components/base/WLoading';
import { setKeywordInHistory, getKeywordInHistory, clearKeywordInHistory } from '@utils/common';
import { EffectType } from './model';
import './index.scss';

interface PageOwnProps {}

interface PageStateProps {
  hotList: Array<{
    searchWord: string,
    score: number,
    iconUrl: string,
    content: string,
    iconType: number
  }>;
}

interface PageDispatchProps {
  dispatchFetchHotSearch: () => void;
}

interface PageState {
  searchValue:string;
  historyList: Array<string>;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ search, loading }) => ({
    ...search,
    loading: loading.effects[EffectType.getHotSearch]
  }),
  (dispatch) => ({
    dispatchFetchHotSearch () {
      dispatch({
        type: EffectType.getHotSearch
      });
    }
  })
)
export default class SearchView extends Component<IProps, PageState> {
  public config: Config = {
    navigationBarTitleText: '搜索'
  }

  private static goResult (keywords:string) {
    setKeywordInHistory(keywords);
    Taro.navigateTo({
      url: `/pages/searchResult/index?keywords=${keywords}`
    });
  }

  public constructor (props) {
    super(props);
    this.state = {
      searchValue: '',
      historyList: []
    };
  }

  // public componentWillUnmount () { }

  public componentDidShow () {
    this.init();
  }

  private init = () => {
    this.setState({
      historyList: getKeywordInHistory()
    });
    this.props.dispatchFetchHotSearch();
  }

  private searchChange =(val) => {
    console.log(val);
    this.setState({
      searchValue: val
    });
  }

  private searchResult = () => {
    SearchView.goResult(this.state.searchValue);
  }

  private clearKeywordInHistory = () => {
    this.setState({
      historyList: []
    });
    clearKeywordInHistory();
  }

  public render (): JSX.Element {
    const {
      searchValue,
      historyList
    } = this.state;
    const {
      hotList
    } = this.props;

    return (
      <View className="search-page">
        <AtSearchBar
          className="search__input"
          actionName="搜一下"
          // focus
          fixed
          value={searchValue}
          onActionClick={this.searchResult}
          onChange={this.searchChange}
          onConfirm={this.searchResult}
        />
        <ScrollView
          className="search_content"
          scrollY
        >
          {
            historyList.length
             && (
             <View className="search__history">
               <View className="search__history__title">
                 <Text className="search__history__title__label">
                   搜索历史
                 </Text>
                 <AtIcon
                   prefixClass="fa"
                   value="trash-o"
                   size="20"
                   color="#cccccc"
                   className="search__history__title__icon"
                   onClick={this.clearKeywordInHistory}
                 />
               </View>
               <ScrollView className="search__history__list" scrollX>
                 {historyList.map((keyword) => (
                   <Text
                     className="search__history__list__item"
                     key={keyword}
                   >
                     {keyword}
                   </Text>
                 ))}
               </ScrollView>
             </View>
             )
          }
          <View className="search__hot">
            <View className="search__history__title">
              <Text className="search__history__title__label">
                热搜榜
              </Text>
            </View>
            {hotList.length === 0 ? <WLoading /> : ''}
            <View className="search__hot__list">
              {hotList.map((item, index) => (
                <View
                  className="search__hot__list__item flex flex-align-center"
                  key={item.searchWord}
                  onClick={() => SearchView.goResult(item.searchWord)}
                >
                  <View
                    className={classnames({
                      search__hot__list__item__index: true,
                      spec: index <= 2
                    })}
                  >
                    {index + 1}
                  </View>
                  <View className="search__hot__list__item__info">
                    <View className="flex flex-align-center">
                      <Text
                        className={classnames({
                          search__hot__list__item__info__title: true,
                          spec: index <= 2
                        })}
                      >
                        {item.searchWord}
                      </Text>
                      <Text className="search__hot__list__item__info__score">
                        {item.score}
                      </Text>
                      {item.iconUrl && (
                      <Image
                        src={item.iconUrl}
                        mode="widthFix"
                        className={classnames({
                          search__hot__list__item__info__icon: true,
                          spec: item.iconType === 5
                        })}
                      />
                      )}
                    </View>
                    <View className="search__hot__list__item__info__desc">
                      {item.content}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

      </View>
    );
  }
}
