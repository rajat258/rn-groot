import {StyleSheet} from 'react-native';
import {
  colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  itemContainer: {
    width: '95%',
    height: moderateScale(100),
    alignSelf: 'center',
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: colors.accent150,
  },
  itemTitleText: {
    color: colors.primary,
    fontSize: moderateScale(32),
    fontWeight: '700',
  },
  itemMessageText: {
    marginLeft: horizontalScale(45),
    color: colors.black,
    fontSize: moderateScale(22),
    fontWeight: '400',
  },
  clearButton: {
    alignSelf: 'center',
    backgroundColor: colors.accent100,
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  clearText: {
    color: colors.black,
    fontSize: moderateScale(16),
    fontWeight: '400',
  },
});
export default styles;
