import {StyleSheet} from 'react-native';
import {
  colors,
  globalMetrics,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  imageContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(20),
  },
  placeholderImage: {
    width: moderateScale(200),
    height: moderateScale(200),
    borderRadius: moderateScale(100),
    borderWidth: globalMetrics.isIos ? moderateScale(0.5) : moderateScale(1),
  },
  informationContainer: {
    marginHorizontal: '5%',
    marginTop: verticalScale(10),
  },
  headerText: {
    marginTop: verticalScale(10),
    color: colors.darkPrimary,
    fontSize: moderateScale(26),
    fontWeight: '900',
  },
  detailText: {
    color: colors.black,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  editUserButton: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(10),
    marginVertical: verticalScale(50),
  },
  editUserButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontWeight: '500',
  },
  textInput: {
    alignSelf: 'center',
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(10),
    width: '80%',
    borderRadius: moderateScale(5),
    paddingHorizontal: horizontalScale(5),
    fontSize: moderateScale(18),
    color: colors.black,
    backgroundColor: colors.textInput,
  },
});

export default styles;
