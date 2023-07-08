import {Dimensions, Platform} from 'react-native';
import type {
  GlobalMetricsType,
  HorizontalScaleType,
  ModerateScaleType,
  VerticalScaleType,
} from './themeType';

const {height, width} = Dimensions.get('window');

let guidelineBaseWidth: number = 375;
let guidelineBaseHeight: number = 812;

if (width > height) {
  [guidelineBaseWidth, guidelineBaseHeight] = [
    guidelineBaseHeight,
    guidelineBaseWidth,
  ];
}

const horizontalScale: HorizontalScaleType = size =>
  (width / guidelineBaseWidth) * size;

const verticalScale: VerticalScaleType = size =>
  (height / guidelineBaseHeight) * size;

const moderateScale: ModerateScaleType = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const globalMetrics: GlobalMetricsType = {
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios',
};

export {
  globalMetrics,
  height,
  horizontalScale,
  moderateScale,
  verticalScale,
  width,
};
