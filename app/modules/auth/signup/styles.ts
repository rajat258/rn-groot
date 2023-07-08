import {StyleSheet} from 'react-native';
import {
  colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../theme';

export const styles = StyleSheet.create({
  logo: {
    height: moderateScale(200),
    width: moderateScale(200),
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
  loginButton: {
    alignItems: 'center',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(10),
    marginVertical: verticalScale(5),
  },
  loginButtonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: moderateScale(20),
    fontWeight: '500',
  },
  noAccountText: {
    color: colors.black,
    fontSize: moderateScale(16),
    fontWeight: '300',
  },
  signUpButton: {
    paddingLeft: horizontalScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: colors.darkPrimary,
    fontSize: moderateScale(16),
    fontWeight: '800',
  },
});
