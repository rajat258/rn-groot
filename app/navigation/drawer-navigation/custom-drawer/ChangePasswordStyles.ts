import {StyleSheet} from 'react-native';
import {
  colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';

const ChangePasswordStyles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.modalColor,
  },
  viewContainer: {
    height: 'auto',
    width: '90%',
    marginTop: verticalScale(250),
    borderRadius: moderateScale(10),
    backgroundColor: colors.accent200,
    paddingTop: verticalScale(5),
    borderBottomStartRadius: moderateScale(10),
    borderBottomEndRadius: moderateScale(10),
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(10),
  },
  closeLine: {
    marginVertical: verticalScale(10),
    alignSelf: 'center',
    width: horizontalScale(50),
    borderColor: colors.black,
    borderWidth: moderateScale(1),
  },
});

export default ChangePasswordStyles;
