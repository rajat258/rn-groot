import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import images from '../../assets/images';
import {VideoItemType} from '../../types';
import styles from './VideoStyle';
import useVideo from './useVideo';

const VideoItem = ({item}: {item: VideoItemType}) => {
  const {navigateToVideoDetail} = useVideo({item});

  return (
    <TouchableOpacity
      onPress={navigateToVideoDetail}
      activeOpacity={0.8}
      style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{uri: item?.image}}
      />
      <Image style={styles.videoImage} source={images.videoFocused} />
      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>{item?.duration}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Image
          style={styles.avatarImage}
          source={{uri: item?.videoCreator?.logo}}
        />
        <View style={styles.informationContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.detailsText}>
            {item.name}
          </Text>
          <Text style={styles.creatorText}>
            {`${item?.videoCreator?.creatorName} | ${item.videoCreator.subscribers}`}
          </Text>
          <Text style={styles.creatorText}>{item.videoCreator.uploadDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VideoItem;
