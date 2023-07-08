import {View, Image, Text, StyleSheet} from 'react-native';
import React from 'react';
import styles from './styles';
import {Strings} from '../../../constants';
import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';
import {ApiUserType} from '../../../types';
import {useCustomTheme} from '../../../hooks';
import {colors} from '../../../theme';

const HomeDetail = () => {
  const routes = useRoute<RouteProp<ParamListBase>>();
  const item = routes?.params as ApiUserType;
  const {theme} = useCustomTheme();

  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          container: {backgroundColor: colors.darkBackground},
          avatar: {borderColor: colors.white},
          headerText: {color: colors.white},
          contentText: {color: colors.whiteTransparent80},
        }
      : {},
  );

  return (
    <View style={StyleSheet.flatten([styles.container, darkTheme.container])}>
      <Image
        style={StyleSheet.flatten([styles.avatar, darkTheme.avatar])}
        source={{uri: item?.avatar}}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.headerText, darkTheme.headerText]}>
          {Strings.email}
        </Text>
        <Text style={[styles.contentText, darkTheme.contentText]}>
          {item?.email}
        </Text>
        <Text style={[styles.headerText, darkTheme.headerText]}>
          {Strings.firstName}
        </Text>
        <Text style={[styles.contentText, darkTheme.contentText]}>
          {item?.first_name}
        </Text>
        <Text style={[styles.headerText, darkTheme.headerText]}>
          {Strings.lastName}
        </Text>
        <Text style={[styles.contentText, darkTheme.contentText]}>
          {item?.last_name}
        </Text>
        <Text style={[styles.headerText, darkTheme.headerText]}>
          {Strings.gender}
        </Text>
        <Text style={[styles.contentText, darkTheme.contentText]}>
          {Strings.male}
        </Text>
        <Text style={[styles.headerText, darkTheme.headerText]}>
          {Strings.address}
        </Text>
        <Text style={[styles.contentText, darkTheme.contentText]}>
          {Strings.fakeAddress}
        </Text>
      </View>
    </View>
  );
};

export default HomeDetail;
