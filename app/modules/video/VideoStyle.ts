import {StyleSheet} from 'react-native';
import {
  colors,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../theme';

const VideoStyle = StyleSheet.create({
  flatList: {
    marginBottom: verticalScale(60),
  },
  container: {
    width: '95%',
    alignSelf: 'center',
    height: moderateScale(300),
    marginVertical: verticalScale(10),
  },
  image: {
    height: '80%',
    width: '100%',
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
  durationContainer: {
    zIndex: 1,
    right: 0,
    bottom: 0,
    marginRight: horizontalScale(5),
    marginBottom: verticalScale(80),
    paddingHorizontal: horizontalScale(5),
    paddingVertical: verticalScale(2),
    position: 'absolute',
    backgroundColor: colors.whiteTransparent,
    alignItems: 'center',
    borderRadius: moderateScale(5),
  },
  durationText: {
    color: colors.white,
    fontWeight: '400',
    fontSize: moderateScale(14),
  },
  detailsContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '20%',
    alignItems: 'center',
    backgroundColor: colors.black,
    paddingLeft: horizontalScale(5),
    paddingHorizontal: horizontalScale(5),
    borderBottomLeftRadius: moderateScale(10),
    borderBottomRightRadius: moderateScale(10),
  },
  informationContainer: {
    marginLeft: horizontalScale(10),
    justifyContent: 'center',
    width: '85%',
  },
  detailsText: {
    color: colors.white,
    fontWeight: '500',
    fontSize: moderateScale(14),
  },
  creatorText: {
    color: colors.grey,
    fontWeight: '400',
    fontSize: moderateScale(13),
  },
  avatarImage: {
    height: moderateScale(35),
    width: moderateScale(35),
  },
  videoImage: {
    tintColor: colors.white,
    position: 'absolute',
    height: moderateScale(32),
    width: moderateScale(32),
    top: '45%',
    left: '45%',
    right: '45%',
    bottom: '45%',
  },
});

export default VideoStyle;
