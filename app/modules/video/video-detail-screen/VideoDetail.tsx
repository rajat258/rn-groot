import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';
import {Strings} from '../../../constants';
import {AppStyle, colors} from '../../../theme';
import VideoItem from '../VideoItem';
import styles from './styles';
import useVideoDetail from './useVideoDetail';
import {useCustomTheme} from '../../../hooks';

const VideoDetail = () => {
  const {
    item,
    isSubscribed,
    handleIsSubscribed,
    subscribeButtonStyle,
    subscribeButtonTextStyle,
    data,
  } = useVideoDetail();
  const {theme} = useCustomTheme();
  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          container: {backgroundColor: colors.darkBackground},
        }
      : {},
  );

  return (
    <View style={styles.container}>
      <Video
        controls
        playWhenInactive={false}
        playInBackground={false}
        resizeMode="cover"
        source={{uri: item?.url}}
        style={styles.image}
      />
      <View style={styles.videoDetailsContainer}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.informationText}>
          {item?.videoCreator?.videoDetails}
        </Text>
        <View style={styles.logoAndCreatorContainer}>
          <Image
            style={styles.logoImage}
            source={{uri: item?.videoCreator?.logo}}
          />
          <View style={AppStyle.flexColumn}>
            <Text style={styles.subscriberText}>
              {item?.videoCreator?.creatorName}
            </Text>
            <Text style={styles.subscriberText}>
              {item?.videoCreator?.subscribers}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleIsSubscribed}
            style={subscribeButtonStyle}>
            <Text style={subscribeButtonTextStyle}>
              {isSubscribed ? Strings.subscribed : Strings.subscribe}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={StyleSheet.flatten([AppStyle.container, darkTheme.container])}
        keyExtractor={(videoDataItem, index) =>
          index + videoDataItem.id.toString()
        }
        data={data}
        renderItem={videoDataItem => <VideoItem item={videoDataItem.item} />}
      />
    </View>
  );
};

export default VideoDetail;
