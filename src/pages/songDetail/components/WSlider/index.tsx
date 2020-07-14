import Taro, { FC, memo } from '@tarojs/taro';
import { View, Slider } from '@tarojs/components';
import PropTypes, { InferProps } from 'prop-types';
import { CommonEvent } from '@tarojs/components/types/common';
import './index.scss';

interface Props {
  percent: number;
  onChange: (e:CommonEvent) => void;
  onChanging: (e:CommonEvent) => void;
}

const WSlider: FC<Props> = ({
  percent,
  onChange,
  onChanging
}) => (
  // console.log("WSlider render");
  <View className="slider_components">
    <Slider
      value={percent}
      blockSize={15}
      activeColor="#d43c33"
      onChange={(e:CommonEvent) => onChange(e)}
      onChanging={(e:CommonEvent) => onChanging(e)}
    />
  </View>
);
const propTypes:InferProps<Props> = {
  percent: PropTypes.number,
  onChange: PropTypes.func,
  onChanging: PropTypes.func
};

const defaultProps: Props = {
  percent: 0,
  onChange: () => {},
  onChanging: () => {}
};

WSlider.defaultProps = defaultProps;
WSlider.propTypes = propTypes;

export default memo(WSlider, (prevProps, nextProps) => prevProps.percent === nextProps.percent);
