import {DrawerNavigationProp} from '@react-navigation/drawer';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Keyboard, TouchableOpacity} from 'react-native';
import images from '../../assets/images';
import {AppStyle} from '../../theme';

// Menu Icon used to open/close Drawer.
const DrawerIcon = (): JSX.Element => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity
      style={AppStyle.middleCenterContainer}
      onPress={() => {
        navigation.toggleDrawer();
        Keyboard.dismiss();
      }}>
      <Image source={images.menu} style={AppStyle.drawerIcon} />
    </TouchableOpacity>
  );
};

export default DrawerIcon;
