import {Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStyle} from '../../../theme';
import images from '../../../assets/images';
import {Routes} from '../../../constants';
import {useSelector} from 'react-redux';
import {ActiveUserType} from '../../../types';

const NotificationIcon = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const notificationCounter = useSelector(
    (state: ActiveUserType) => state.activeUser.notifications,
  );

  return (
    <TouchableOpacity
      style={AppStyle.middleCenterContainer}
      onPress={() => navigation.navigate(Routes.notification)}>
      <Image
        source={
          notificationCounter
            ? images.notificationsFocused
            : images.notifications
        }
        style={AppStyle.notificationIcon}
      />
    </TouchableOpacity>
  );
};

export default NotificationIcon;
