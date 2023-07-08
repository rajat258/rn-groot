import {StyleSheet} from 'react-native';
import {
  colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: verticalScale(220),
    borderRadius: moderateScale(10),
    backgroundColor: colors.accent200,
    padding: verticalScale(10),
    borderBottomStartRadius: moderateScale(10),
    borderBottomEndRadius: moderateScale(10),
  },
  container: {
    flex: 1,
    paddingTop: verticalScale(20),
    backgroundColor: colors.accent200,
  },
  textContainer: {
    marginTop: verticalScale(50),
    marginLeft: horizontalScale(20),
  },
  avatar: {
    alignSelf: 'center',
    width: moderateScale(160),
    height: moderateScale(160),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(3),
    borderColor: colors.black,
  },
  headerText: {
    marginTop: verticalScale(10),
    color: colors.darkPrimary,
    fontSize: moderateScale(26),
    fontWeight: '900',
  },
  contentText: {
    color: colors.black,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});

export default styles;
