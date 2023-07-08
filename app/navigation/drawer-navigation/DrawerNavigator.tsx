import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {
  DrawerContentComponentProps,
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Image, ImageSourcePropType} from 'react-native';
import {useDispatch} from 'react-redux';
import images from '../../assets/images';
import {CustomWebView, DrawerIcon} from '../../components';
import {Routes, Strings, Url} from '../../constants';
import {NotificationIcon, Profile} from '../../modules';
import {activeUserActions} from '../../redux';
import {setNotifications} from '../../services';
import {AppStyle, colors} from '../../theme';
import {NotificationType} from '../../types';
import {TabNavigator} from '../bottom-tab-navigation';
import styles from './DrawerStyles';
import {CustomDrawer} from './custom-drawer';
import {useCustomTheme} from '../../hooks';
import {StyleSheet} from 'react-native';

const Drawer = createDrawerNavigator();

const Terms = () => <CustomWebView link={Url.termsAndConditions} />;

const Privacy = () => <CustomWebView link={Url.privacyPolicy} />;

const DrawerNavigator = (): JSX.Element => {
  const {theme} = useCustomTheme();
  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          container: {backgroundColor: colors.darkBackground},
          icon: {tintColor: colors.white},
          iconFocused: {tintColor: colors.black},
        }
      : {},
  );
  const stackNavigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const drawerContent = (props: DrawerContentComponentProps) => (
    <CustomDrawer {...props} />
  );

  const requestPermission = async () => {
    await notifee.requestPermission();
  };

  const notificationIcon = () => <NotificationIcon />;

  const drawerIcon = () => <DrawerIcon />;

  const drawerItemIcon = (
    navigation: DrawerNavigationProp<ParamListBase>,
    imageFocused: ImageSourcePropType,
    image: ImageSourcePropType,
  ) => {
    return navigation.isFocused() ? (
      <Image
        style={[AppStyle.iconWhite, darkTheme.iconFocused]}
        source={imageFocused}
      />
    ) : (
      <Image style={[AppStyle.iconBlack, darkTheme.icon]} source={image} />
    );
  };

  const initNotifications = async () => {
    requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const notificationObject = {
        messageId: remoteMessage?.messageId,
        notification: remoteMessage?.notification,
      };
      await setNotifications(notificationObject as NotificationType);
      dispatch(activeUserActions.pushNotifications());
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
      // Display a notification
      await notifee.displayNotification({
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        android: {
          smallIcon: 'logo',
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: {
            id: 'default',
          },
        },
      });
    });
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          const notificationObject = {
            messageId: remoteMessage?.messageId,
            notification: remoteMessage?.notification,
          };
          await setNotifications(notificationObject as NotificationType);
          dispatch(activeUserActions.pushNotifications());
          stackNavigation.navigate(Routes.notification);
        }
      });
    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage) {
        const notificationObject = {
          messageId: remoteMessage?.messageId,
          notification: remoteMessage?.notification,
        };
        await setNotifications(notificationObject as NotificationType);
        dispatch(activeUserActions.pushNotifications());
        stackNavigation.navigate(Routes.notification);
      }
      stackNavigation.navigate(Routes.notification);
    });
    return unsubscribe;
  };

  useEffect(() => {
    initNotifications();
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={props => drawerContent(props)}
      screenOptions={{
        drawerLabelStyle: styles.drawerLabelStyle,
        drawerActiveTintColor: theme === 'dark' ? colors.black : colors.white,
        drawerInactiveTintColor: theme === 'dark' ? colors.white : colors.black,
        drawerActiveBackgroundColor:
          theme === 'dark' ? colors.accent200 : colors.darkPrimary,
        drawerType: 'front',
      }}>
      <Drawer.Screen
        options={({navigation}) => ({
          headerShown: false,
          title: Routes.home,
          drawerIcon: () =>
            drawerItemIcon(navigation, images.homeFocused, images.home),
        })}
        component={TabNavigator}
        name={Routes.tabNavigator}
      />
      <Drawer.Screen
        options={({navigation}) => ({
          headerTintColor: colors.accent200,
          headerStyle: {backgroundColor: colors.darkPrimary},
          headerLeft: drawerIcon,
          headerRight: notificationIcon,
          drawerIcon: () =>
            drawerItemIcon(navigation, images.userFocused, images.user),
        })}
        component={Profile}
        name={Routes.profile}
      />
      <Drawer.Screen
        options={({navigation}) => ({
          title: Strings.termsAndConditions,
          headerTintColor: colors.accent200,
          headerStyle: {backgroundColor: colors.darkPrimary},
          drawerItemStyle: {display: 'none'},
          headerLeft: drawerIcon,
          drawerIcon: () =>
            drawerItemIcon(navigation, images.userFocused, images.user),
        })}
        component={Terms}
        name={Routes.terms}
      />
      <Drawer.Screen
        options={({navigation}) => ({
          title: Strings.privacyPolicy,
          headerTintColor: colors.accent200,
          headerStyle: {backgroundColor: colors.darkPrimary},
          drawerItemStyle: {display: 'none'},
          headerLeft: drawerIcon,
          drawerIcon: () =>
            drawerItemIcon(navigation, images.userFocused, images.user),
        })}
        component={Privacy}
        name={Routes.privacyPolicy}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
