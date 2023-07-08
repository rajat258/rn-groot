import {StyleSheet} from 'react-native';
import {
  colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const searchBarStyle = StyleSheet.create({
  container: {
    marginVertical: verticalScale(10),
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    height: verticalScale(40),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    borderColor: colors.black,
  },
  searchInputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  searchIconContainer: {
    justifyContent: 'center',
    marginRight: horizontalScale(5),
  },
  searchIcon: {
    tintColor: colors.black,
    width: moderateScale(24),
    height: moderateScale(24),
  },
  textInput: {
    fontSize: moderateScale(16),
    color: colors.black,
    padding: verticalScale(7),
    paddingLeft: horizontalScale(5),
  },
});

export default searchBarStyle;
