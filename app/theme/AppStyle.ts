import {StyleSheet} from 'react-native';
import colors from './colors';
import {
  globalMetrics,
  horizontalScale,
  moderateScale,
  verticalScale,
} from './Metrics';

export const AppStyle = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  fullHeightWidth: {
    height: '100%',
    width: '100%',
  },
  centerContainer: {
    backgroundColor: colors.background,
    alignItems: 'center',
    flex: 1,
  },
  middleCenterContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  screenCenterContainer: {
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  alignItems: {
    alignItems: 'center',
  },
  justifyContent: {
    justifyContent: 'center',
  },
  customButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(10),
  },
  customButtonText: {
    textAlignVertical: 'center',
    fontSize: moderateScale(16),
    color: colors.white,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  drawerIcon: {
    width: moderateScale(25),
    height: moderateScale(25),
    marginLeft: horizontalScale(5),
    tintColor: colors.background,
  },
  notificationIcon: {
    width: moderateScale(25),
    height: moderateScale(25),
    marginRight: horizontalScale(5),
  },
  iconWhite: {
    tintColor: colors.white,
    width: moderateScale(25),
    height: moderateScale(25),
  },
  iconBlack: {
    tintColor: colors.black,
    width: moderateScale(25),
    height: moderateScale(25),
  },
  icon: {
    width: moderateScale(25),
    height: moderateScale(25),
  },
  line: {
    borderColor: colors.black,
    width: '90%',
    alignSelf: 'center',
    marginVertical: verticalScale(20),
    borderBottomWidth: globalMetrics.isIos
      ? moderateScale(0.5)
      : moderateScale(1),
  },
  flatList: {
    marginBottom: verticalScale(60),
  },
  listEmptyComponent: {
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmptyComponentText: {
    color: colors.black,
    fontSize: moderateScale(24),
    fontWeight: '700',
  },
  rowCenter: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
