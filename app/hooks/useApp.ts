import {useEffect} from 'react';
import {alertBox} from '../components';
import {Strings} from '../constants';
import {BackHandler} from 'react-native';

const useApp = () => {
  const exitApp = () => {
    BackHandler.exitApp();
  };

  const _backHandler = () => {
    alertBox(Strings.exitApp, Strings.sureExitApp, exitApp);
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      _backHandler,
    );

    return () => backHandler.remove();
  }, []);
};

export default useApp;
