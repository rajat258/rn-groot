import {StyleSheet} from 'react-native';
import {colors, moderateScale} from '../../theme';

export const styles = StyleSheet.create({
  logo: {
    height: moderateScale(200),
    width: moderateScale(200),
  },
  welcomeText: {
    fontSize: moderateScale(32),
    fontWeight: '600',
    color: colors.darkPrimary,
  },
});
