import {StyleSheet} from 'react-native';
import {colors, globalMetrics, moderateScale, verticalScale} from '../../theme';

const TabBarStyles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: colors.white,
    paddingBottom: globalMetrics.isAndroid
      ? verticalScale(10)
      : verticalScale(40),
  },
  text: {
    color: colors.darkPrimary,
    fontSize: moderateScale(14),
    fontWeight: '700',
  },
  iconFocused: {
    tintColor: colors.darkPrimary,
    height: moderateScale(36),
    width: moderateScale(36),
  },
  icon: {
    tintColor: colors.secondary,
    height: moderateScale(26),
    width: moderateScale(26),
  },
  iconContainer: {
    height: '100%',
    marginTop: verticalScale(10),
  },
});

export default TabBarStyles;
