import {StyleSheet} from 'react-native';
import {
  colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const ItemStyles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginBottom: verticalScale(10),
    padding: moderateScale(10),
    width: '94%',
    height: verticalScale(150),
    borderColor: colors.primary,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
  },
  imageContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: horizontalScale(5),
  },
  avatar: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderWidth: moderateScale(1),
    borderColor: colors.black,
    borderRadius: moderateScale(100),
  },
  informationContainer: {
    marginLeft: horizontalScale(10),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: moderateScale(28),
    color: colors.black,
    fontWeight: '200',
    includeFontPadding: true,
  },
  emailText: {
    fontSize: moderateScale(14),
    color: colors.black,
    fontWeight: '600',
  },
});

export default ItemStyles;
