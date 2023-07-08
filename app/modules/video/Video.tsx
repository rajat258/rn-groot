import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {VideoData} from '../../constants';
import {AppStyle, colors} from '../../theme';
import VideoItem from './VideoItem';
import {useCustomTheme} from '../../hooks';

const Video = (): JSX.Element => {
  const {theme} = useCustomTheme();
  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          container: {backgroundColor: colors.darkBackground},
        }
      : {},
  );

  return (
    <View style={StyleSheet.flatten([AppStyle.container, darkTheme.container])}>
      <FlatList
        style={AppStyle.flatList}
        keyExtractor={(item, index) => index + item.id.toString()}
        data={VideoData.videos}
        renderItem={({item}) => <VideoItem item={item} />}
      />
    </View>
  );
};

export default Video;
