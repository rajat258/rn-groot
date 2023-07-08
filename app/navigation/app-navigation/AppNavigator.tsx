import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Routes, Strings} from '../../constants';
import {
  HomeDetail,
  Login,
  Notifications,
  SignUp,
  VideoDetail,
  useSplash,
} from '../../modules';
import {colors} from '../../theme';
import {DrawerNavigator} from '../drawer-navigation';
import {useCustomTheme} from '../../hooks';

const Stack = createStackNavigator();

const AppNavigator = (): JSX.Element => {
  useSplash();
  const {theme} = useCustomTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={Login}
        name={Routes.login}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={SignUp}
        name={Routes.signUp}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={DrawerNavigator}
        name={Routes.drawer}
      />
      <Stack.Screen
        options={{
          headerTintColor: colors.accent200,
          headerStyle: {
            backgroundColor:
              theme === 'dark' ? colors.darkBackground : colors.darkPrimary,
          },
          title: Strings.videoDetail,
        }}
        component={VideoDetail}
        name={Routes.videoDetail}
      />
      <Stack.Screen
        options={{
          headerTintColor: colors.accent200,
          headerStyle: {
            backgroundColor:
              theme === 'dark' ? colors.darkBackground : colors.darkPrimary,
          },
          title: Strings.homeDetail,
          presentation: 'modal',
        }}
        component={HomeDetail}
        name={Routes.homeDetail}
      />
      <Stack.Screen
        options={{
          headerTintColor: colors.accent200,
          headerStyle: {
            backgroundColor:
              theme === 'dark' ? colors.darkBackground : colors.darkPrimary,
          },
          title: Strings.videoDetail,
        }}
        component={Notifications}
        name={Routes.notification}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
