import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import images from '../../../assets/images';
import useCustomDrawer from './useCustomDrawer';
import ChangePassword from './ChangePassword';
import styles from './styles';
import {colors} from '../../../theme';
import {Routes, Strings} from '../../../constants';
import {ActiveUserType} from '../../../types';
import {CustomDrawerTypes} from './CustomDrawerTypes';
import {ChangeTheme} from '../../../modules';
import {useCustomTheme} from '../../../hooks';
import {StyleSheet} from 'react-native';

interface SettingsItemPropType extends TouchableOpacityProps {
  text: string;
}

interface SettingsScreenIconProps {
  isFocused: boolean;
  handleIsFocused: () => void;
}

const SettingsScreenIcon = ({
  isFocused,
  handleIsFocused,
}: SettingsScreenIconProps) => {
  const {theme} = useCustomTheme();
  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          focusedSettingsImage: {tintColor: colors.white},
          text: {color: colors.white},
          focusedArrowImage: {tintColor: colors.white},
          image: {tintColor: colors.white},
        }
      : {},
  );

  return (
    <TouchableOpacity
      onPress={handleIsFocused}
      style={styles.focusedSettingsButton}>
      <Image
        style={StyleSheet.flatten([
          styles.focusedSettingsImage,
          darkTheme.focusedSettingsImage,
        ])}
        source={isFocused ? images.settingsFocused : images.settings}
      />
      <Text
        style={
          isFocused
            ? StyleSheet.flatten([
                styles.focusedSettingsButtonText,
                darkTheme.text,
              ])
            : StyleSheet.flatten([styles.settingsButtonText, darkTheme.text])
        }>
        {Routes.settings}
      </Text>
      <Image
        style={
          isFocused
            ? StyleSheet.flatten([
                styles.focusedArrowImage,
                darkTheme.focusedArrowImage,
              ])
            : StyleSheet.flatten([styles.arrowImage, darkTheme.image])
        }
        source={isFocused ? images.downArrow : images.rightArrow}
      />
    </TouchableOpacity>
  );
};

const SettingsItem = ({text, ...rest}: SettingsItemPropType): JSX.Element => {
  const {theme} = useCustomTheme();

  return (
    <TouchableOpacity style={styles.settingsItemButton} {...rest}>
      <LinearGradient
        style={styles.settingsItemLinearGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={
          theme === 'dark'
            ? [colors.accent200, colors.whiteTransparent]
            : [colors.secondary, colors.accent200]
        }>
        <Text style={styles.settingsItemText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const SettingsComponent = ({props}: {props: DrawerContentComponentProps}) => {
  const {
    handleIsFocused,
    isFocused,
    logoutFunction,
    navigation,
    handleIsVisible,
    isVisible,
    setIsVisible,
    isThemeVisible,
    handleIsThemeVisible,
  } = useCustomDrawer({props});

  return (
    <View style={styles.settingsContainer}>
      <SettingsScreenIcon {...{isFocused, handleIsFocused}} />
      {isFocused && (
        <>
          <ChangePassword {...{isVisible, setIsVisible}} />
          <ChangeTheme {...{handleIsThemeVisible, isThemeVisible}} />
          <View style={styles.viewSettingsContainer}>
            <SettingsItem
              onPress={handleIsVisible}
              text={Strings.changePassword}
            />
            <SettingsItem
              onPress={handleIsThemeVisible}
              text={Strings.changeTheme}
            />
            <SettingsItem
              onPress={() => navigation.navigate(Routes.terms)}
              text={Strings.termsAndConditions}
            />
            <SettingsItem
              onPress={() => navigation.navigate(Routes.privacyPolicy)}
              text={Strings.privacyPolicy}
            />
            <SettingsItem onPress={logoutFunction} text={Strings.logout} />
          </View>
        </>
      )}
    </View>
  );
};

const CustomDrawer: CustomDrawerTypes = props => {
  const activeUser = useSelector(
    (state: ActiveUserType) => state.activeUser?.data,
  );
  const {theme} = useCustomTheme();
  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          container: {backgroundColor: colors.darkPrimary},
          icon: {tintColor: colors.white},
          iconFocused: {tintColor: colors.black},
          version: {color: colors.white},
          customItem: {backgroundColor: colors.black},
        }
      : {},
  );

  // render when drawer opens.
  return (
    <ImageBackground
      source={
        theme === 'dark' ? images.darkBackgroundImage : images.backgroundImage
      }
      style={styles.container}>
      <SafeAreaView
        style={StyleSheet.flatten([styles.customItem, darkTheme.customItem])}>
        <View style={styles.flexRow}>
          <Image style={styles.image} source={images.user} />
          <View style={styles.informationContainer}>
            <Text style={styles.text}>{Strings.welcome}</Text>
            <Text style={styles.textEmail}>{activeUser?.email}</Text>
          </View>
        </View>
      </SafeAreaView>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <SettingsComponent {...{props}} />
      </DrawerContentScrollView>
      <Text
        style={StyleSheet.flatten([
          styles.version,
          darkTheme.version,
        ])}>{`${Strings.version}\n ${Strings.copyRight}`}</Text>
    </ImageBackground>
  );
};

export default CustomDrawer;
