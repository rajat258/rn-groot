import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch} from 'react-redux';
import {Routes} from '../../constants';
import {activeUserActions} from '../../redux';
import {getActiveUser, getTheme} from '../../services';
import {User} from '../../types';
import {useCustomTheme} from '../../hooks';

const useSplash = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const {
    handleLightThemeFlag,
    handleDarkThemeFlag,
    handleSystemDefaultThemeFlag,
  } = useCustomTheme();

  const _setTheme = async () => {
    const theme = await getTheme();
    if (theme?.toString() === 'system') {
      await handleSystemDefaultThemeFlag();
    } else if (theme?.toString() === 'dark') {
      await handleDarkThemeFlag();
    } else {
      await handleLightThemeFlag();
    }
  };

  const fetchData = async () => {
    await _setTheme();
    const activeUser: User | boolean = await getActiveUser();
    if (activeUser) {
      dispatch(
        activeUserActions.newUserData({data: (activeUser as User)?.newUser}),
      );
      dispatch(activeUserActions.addUser({body: activeUser as User}));
      navigation.navigate(Routes.drawer);
    } else {
      navigation.navigate(Routes.login);
    }
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  };

  useEffect(() => {
    fetchData();
  }, []);
};

export default useSplash;
