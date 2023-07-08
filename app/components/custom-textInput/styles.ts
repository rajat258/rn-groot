import {StyleSheet} from 'react-native';
import {colors, globalMetrics, moderateScale} from '../../theme';

const os = globalMetrics.isIos ? moderateScale(0.5) : moderateScale(1);

export const styles = StyleSheet.create({
  textInput: {
    borderWidth: os,
    borderColor: colors.black,
  },
  focusedTextInput: {
    borderWidth: moderateScale(2),
    borderColor: colors.darkPrimary,
  },
  error: {
    alignSelf: 'flex-start',
    // marginLeft given in '%' because TextInput width is given in '%'.
    marginLeft: '10%',
    color: colors.red,
    fontWeight: '500',
    fontSize: moderateScale(14),
  },
});
