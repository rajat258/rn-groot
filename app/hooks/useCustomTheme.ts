import {useDispatch, useSelector} from 'react-redux';
import {ActiveUserType} from '../types';
import {activeUserActions} from '../redux';
import {ColorSchemeName, useColorScheme} from 'react-native';
import {useEffect} from 'react';
import {setTheme} from '../services';

interface CustomThemeHookReturnType {
  handleDarkThemeFlag: () => Promise<void>;
  handleLightThemeFlag: () => Promise<void>;
  handleSystemDefaultThemeFlag: () => Promise<void>;
  systemTheme: ColorSchemeName;
  theme: 'light' | 'dark';
  themeFlag: 'light' | 'dark' | 'system';
}

const useCustomTheme = (): CustomThemeHookReturnType => {
  const {theme, themeFlag} = useSelector(
    (state: ActiveUserType) => state.activeUser,
  );
  const systemTheme = useColorScheme();
  const dispatch = useDispatch();

  useEffect(() => {
    if (themeFlag === 'system') {
      systemTheme === 'dark' ? handleDarkTheme() : handleLightTheme();
    }
  }, [systemTheme]);

  const handleLightTheme = () => dispatch(activeUserActions.lightTheme());

  const handleDarkTheme = () => dispatch(activeUserActions.darkTheme());

  const handleLightThemeFlag = async () => {
    await setTheme('light');
    dispatch(activeUserActions.changeThemeFlag('light'));
    dispatch(activeUserActions.lightTheme());
  };

  const handleDarkThemeFlag = async () => {
    await setTheme('dark');
    dispatch(activeUserActions.changeThemeFlag('dark'));
    dispatch(activeUserActions.darkTheme());
  };

  const handleSystemDefaultThemeFlag = async () => {
    await setTheme('system');
    dispatch(activeUserActions.changeThemeFlag('system'));
    systemTheme === 'dark' ? handleDarkTheme() : handleLightTheme();
  };

  return {
    handleDarkThemeFlag,
    handleLightThemeFlag,
    handleSystemDefaultThemeFlag,
    systemTheme,
    theme,
    themeFlag,
  };
};

export default useCustomTheme;
