import Taro, { FC, memo } from '@tarojs/taro';
import classnames from 'classnames';
import { View } from '@tarojs/components';
import PropTypes, { InferProps } from 'prop-types';
import './index.scss';

interface Props {
  fullPage?: boolean;
  hide?: boolean;
}

const WLoading: FC<Props> = ({ fullPage, hide }) => {
  const cls = classnames({
    loading_components: true,
    fullScreen: fullPage,
    hide
  });
  return <View className={cls} />;
};

const propTypes:InferProps<Props> = {
  fullPage: PropTypes.bool,
  hide: PropTypes.bool
};
const defaultProps: Props = {
  fullPage: false,
  hide: false
};

WLoading.defaultProps = defaultProps;
WLoading.propTypes = propTypes;

export default memo(WLoading, (oldProps, newProps) => (
  oldProps.fullPage === newProps.fullPage && oldProps.hide === newProps.hide
));
