import {StyleSheet} from 'react-native';
import {
  colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.modalColor,
  },
  subContainer: {
    height: verticalScale(200),
    width: '100%',
    marginTop: verticalScale(250),
    backgroundColor: colors.accent200,
    paddingTop: verticalScale(5),
    borderTopStartRadius: moderateScale(10),
    borderTopEndRadius: moderateScale(10),
  },
  allItemContainer: {
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: horizontalScale(10),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  themeImage: {
    marginTop: verticalScale(10),
    height: moderateScale(50),
    width: moderateScale(50),
  },
  closeLine: {
    marginVertical: verticalScale(10),
    alignSelf: 'center',
    width: horizontalScale(50),
    borderColor: colors.black,
    borderWidth: moderateScale(1),
  },
  text: {
    fontSize: moderateScale(13),
    fontWeight: '800',
    color: colors.black,
  },
  itemContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: colors.accent150,
  },
});

export default styles;
