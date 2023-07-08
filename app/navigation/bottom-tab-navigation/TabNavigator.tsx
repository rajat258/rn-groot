import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';
import React from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';
import images from '../../assets/images';
import {DrawerIcon} from '../../components';
import {Routes} from '../../constants';
import {Create, Home, NotificationIcon, Profile, Video} from '../../modules';
import {colors} from '../../theme';
import styles from './TabBarStyles';
import {useCustomTheme} from '../../hooks';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

const drawerIcon = () => <DrawerIcon />;

const notificationIcon = () => <NotificationIcon />;

const TabNavigator = (): JSX.Element => {
  const {theme} = useCustomTheme();
  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          container: {backgroundColor: colors.darkBackground},
          icon: {tintColor: colors.white},
          iconText: {color: colors.white},
          tabBarStyle: {backgroundColor: colors.darkBackground},
        }
      : {},
  );

  const tabBarIcon = (
    navigation: BottomTabNavigationProp<ParamListBase>,
    imageFocused: ImageSourcePropType,
    image: ImageSourcePropType,
    routes: string,
  ) => {
    return navigation.isFocused() ? (
      <>
        <Image
          source={imageFocused}
          style={StyleSheet.flatten([styles.iconFocused, darkTheme.icon])}
        />
        <Text style={StyleSheet.flatten([styles.text, darkTheme.iconText])}>
          {routes}
        </Text>
      </>
    ) : (
      <View style={styles.iconContainer}>
        <Image
          source={image}
          style={StyleSheet.flatten([styles.icon, darkTheme.icon])}
        />
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [styles.tabBarStyle, darkTheme.tabBarStyle],
        headerTintColor: colors.accent200,
        headerStyle: [
          {backgroundColor: colors.darkPrimary},
          darkTheme.container,
        ],
        headerLeft: drawerIcon,
        headerRight: notificationIcon,
      }}>
      <Tab.Screen
        options={({navigation}) => ({
          tabBarIcon: () =>
            tabBarIcon(
              navigation,
              images.homeFocused,
              images.home,
              Routes.home,
            ),
        })}
        component={Home}
        name={Routes.home}
      />
      <Tab.Screen
        options={({navigation}) => ({
          unmountOnBlur: true,
          tabBarIcon: () =>
            tabBarIcon(
              navigation,
              images.createFocused,
              images.create,
              Routes.create,
            ),
        })}
        component={Create}
        name={Routes.create}
      />
      <Tab.Screen
        options={({navigation}) => ({
          unmountOnBlur: true,
          tabBarIcon: () =>
            tabBarIcon(
              navigation,
              images.videoFocused,
              images.video,
              Routes.video,
            ),
        })}
        component={Video}
        name={Routes.video}
      />
      <Tab.Screen
        options={({navigation}) => ({
          unmountOnBlur: true,
          tabBarIcon: () =>
            tabBarIcon(
              navigation,
              images.userFocused,
              images.user,
              Routes.profile,
            ),
        })}
        component={Profile}
        name={Routes.profile}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
