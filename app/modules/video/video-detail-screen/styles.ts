import {StyleSheet} from 'react-native';
import {
  colors,
  horizontalScale,
  moderateScale,
  verticalScale,
  width,
} from '../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: moderateScale(200),
    width: width,
  },
  videoDetailsContainer: {
    width: width,
    height: verticalScale(110),
    backgroundColor: colors.black,
    paddingHorizontal: horizontalScale(5),
  },
  informationText: {
    color: colors.white,
    fontSize: moderateScale(14),
  },
  logoAndCreatorContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(5),
    alignItems: 'center',
  },
  logoImage: {
    height: moderateScale(50),
    width: moderateScale(50),
  },
  subscriberText: {
    color: colors.grey,
    fontWeight: '400',
    fontSize: moderateScale(14),
    marginLeft: horizontalScale(10),
  },
  subscribeButton: {
    backgroundColor: colors.white,
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(10),
    marginLeft: horizontalScale(10),
  },
  subscribeButtonText: {
    color: colors.black,
    fontWeight: '500',
    fontSize: moderateScale(14),
  },
});

export default styles;
