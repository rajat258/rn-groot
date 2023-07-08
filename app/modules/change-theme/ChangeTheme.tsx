import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../../assets/images';
import {Strings} from '../../constants';
import {useCustomTheme} from '../../hooks';
import {colors} from '../../theme';
import styles from './styles';
import useChangeTheme from './useChangeTheme';

interface ChangeThemeProps {
  isThemeVisible: boolean;
  handleIsThemeVisible: () => void;
}

interface ItemProps {
  text: string;
  _onPress: () => void;
  theme: 'light' | 'dark' | 'system';
}

const Item = ({text, _onPress, theme}: ItemProps) => {
  const {darkTheme} = useChangeTheme();
  const {themeFlag, systemTheme, theme: darkLightTheme} = useCustomTheme();
  const isSelected = StyleSheet.flatten([
    styles.itemContainer,
    darkTheme.itemContainer,
    themeFlag === theme && {
      backgroundColor:
        darkLightTheme === 'dark' ? colors.accent200 : colors.blackTransparent,
    },
  ]);
  const [image, setImage] = useState(images.lightTheme);

  useEffect(() => {
    if (theme === 'system') {
      if (systemTheme === 'dark') {
        setImage(images.darkTheme);
      } else {
        setImage(images.lightTheme);
      }
    } else {
      if (theme === 'dark') {
        setImage(images.darkTheme);
      } else {
        setImage(images.lightTheme);
      }
    }
  }, []);

  return (
    <TouchableOpacity onPress={_onPress} style={isSelected}>
      <Text style={styles.text}>{text}</Text>
      <Image style={styles.themeImage} source={image} />
    </TouchableOpacity>
  );
};

const ChangeTheme = ({
  isThemeVisible,
  handleIsThemeVisible,
}: ChangeThemeProps) => {
  const {darkTheme} = useChangeTheme();
  const {
    handleDarkThemeFlag,
    handleLightThemeFlag,
    handleSystemDefaultThemeFlag,
  } = useCustomTheme();

  return (
    <Modal animationType="fade" transparent={true} visible={isThemeVisible}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleIsThemeVisible}
        style={StyleSheet.flatten([styles.container, darkTheme.container])}>
        <Pressable
          disabled={false}
          style={StyleSheet.flatten([
            styles.subContainer,
            darkTheme.subContainer,
          ])}>
          <View
            style={StyleSheet.flatten([styles.closeLine, darkTheme.closeLine])}
          />
          <View style={styles.allItemContainer}>
            <Item
              theme="light"
              text={Strings.light}
              _onPress={handleLightThemeFlag}
            />
            <Item
              theme="dark"
              text={Strings.dark}
              _onPress={handleDarkThemeFlag}
            />
            <Item
              theme="system"
              text={Strings.systemDefault}
              _onPress={handleSystemDefaultThemeFlag}
            />
          </View>
        </Pressable>
      </TouchableOpacity>
    </Modal>
  );
};

export default ChangeTheme;
