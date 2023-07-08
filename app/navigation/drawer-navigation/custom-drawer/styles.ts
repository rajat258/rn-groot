import {StyleSheet} from 'react-native';
import {
  colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customItem: {
    width: '100%',
    backgroundColor: colors.darkPrimary,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: horizontalScale(10),
  },
  informationContainer: {
    marginLeft: horizontalScale(5),
    paddingVertical: verticalScale(8),
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontSize: moderateScale(24),
    color: colors.white,
  },
  textEmail: {
    fontWeight: '500',
    fontSize: moderateScale(16),
    color: colors.white,
    marginBottom: verticalScale(5),
  },
  logoutContainer: {
    alignSelf: 'center',
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: verticalScale(20),
  },
  logoutText: {
    fontSize: moderateScale(16),
    color: colors.white,
    fontWeight: '500',
  },
  image: {
    tintColor: colors.white,
    height: moderateScale(28),
    width: moderateScale(28),
  },
  logoutImage: {
    tintColor: colors.white,
    height: moderateScale(24),
    width: moderateScale(24),
  },
  settingsContainer: {
    flex: 1,
    marginHorizontal: moderateScale(20),
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  focusedSettingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20),
    borderRadius: moderateScale(5),
  },
  focusedSettingsImage: {
    tintColor: colors.darkPrimary,
  },
  settingsButtonText: {
    marginLeft: horizontalScale(30),
    fontSize: moderateScale(16),
    color: colors.black,
  },
  focusedSettingsButtonText: {
    marginLeft: horizontalScale(30),
    fontSize: moderateScale(16),
    color: colors.darkPrimary,
    fontWeight: '700',
  },
  arrowImage: {
    height: moderateScale(16),
    width: moderateScale(16),
    marginLeft: '40%',
    tintColor: colors.black,
  },
  focusedArrowImage: {
    height: moderateScale(16),
    width: moderateScale(16),
    marginLeft: '40%',
    tintColor: colors.darkPrimary,
  },
  viewSettingsContainer: {
    marginTop: verticalScale(20),
  },
  settingsItemButton: {
    marginTop: verticalScale(30),
  },
  settingsItemText: {
    color: colors.black,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  settingsItemLinearGradient: {
    paddingVertical: verticalScale(5),
    paddingLeft: horizontalScale(10),
    borderRadius: moderateScale(5),
  },
  version: {
    position: 'relative',
    bottom: verticalScale(10),
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: moderateScale(16),
    color: colors.black,
    fontWeight: '700',
  },
});

export default styles;
