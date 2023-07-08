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
    fontSize: moderateScale(24),
    color: colors.grey,
    fontWeight: '300',
  },
  detailText: {
    fontSize: moderateScale(16),
    color: colors.black,
    fontWeight: '600',
  },
  textInput: {
    marginVertical: verticalScale(10),
    paddingVertical: verticalScale(10),
    width: '80%',
    borderRadius: moderateScale(5),
    paddingHorizontal: horizontalScale(5),
    fontSize: moderateScale(18),
    color: colors.black,
    backgroundColor: colors.textInput,
  },
  addUserButton: {
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(10),
    marginVertical: verticalScale(5),
  },
  addUserText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontWeight: '500',
  },
  errorText: {
    alignSelf: 'center',
    marginTop: verticalScale(10),
    color: colors.red,
    fontWeight: '500',
    fontSize: moderateScale(14),
  },
});

export default styles;
