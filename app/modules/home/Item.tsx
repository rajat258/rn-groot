import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Routes} from '../../constants';
import {useCustomTheme} from '../../hooks';
import {colors} from '../../theme';
import {ItemTypes} from './HomeTypes';
import styles from './ItemStyles';

const Item = ({item}: ItemTypes) => {
  const {theme} = useCustomTheme();
  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          container: {borderColor: colors.accent200},
        }
      : {},
  );
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const handleHomeDetail = () => navigation.navigate(Routes.homeDetail, item);

  return (
    <>
      <TouchableOpacity onPress={handleHomeDetail}>
        <LinearGradient
          style={StyleSheet.flatten([styles.container, darkTheme.container])}
          colors={
            theme === 'dark'
              ? [colors.accent200, colors.placeHolder]
              : [colors.accent150, colors.accent200]
          }>
          <View style={styles.imageContainer}>
            <Image source={{uri: item?.avatar}} style={styles.avatar} />
          </View>
          <View style={styles.informationContainer}>
            <Text
              style={
                styles.nameText
              }>{`${item?.first_name} ${item?.last_name}`}</Text>
            <Text style={styles.emailText}>{item?.email}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default Item;
