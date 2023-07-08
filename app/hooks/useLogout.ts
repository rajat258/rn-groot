import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {alertBox} from '../components';
import {Routes, Strings} from '../constants';
import {activeUserActions, apiDataActions} from '../redux';
import {killActiveUser, setAsyncUser, setTheme} from '../services';
import {ActiveUserType, User} from '../types';
import useCustomTheme from './useCustomTheme';

const useLogout = () => {
  const {theme} = useCustomTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const newUser = useSelector(
    (state: ActiveUserType) => state.activeUser?.newUser,
  );
  const activeUser = useSelector(
    (state: ActiveUserType) => state.activeUser?.data,
  );

  const logout = async () => {
    const asyncActiveUser = {...activeUser, newUser: newUser?.data};
    await setAsyncUser(asyncActiveUser as User);
    await setTheme(theme);
    await killActiveUser();
    dispatch(activeUserActions.deleteUser());
    dispatch(apiDataActions.deleteData());
    navigation.reset({index: 0, routes: [{name: Routes.login, params: theme}]});
  };

  const logoutFunction = () =>
    alertBox(Strings.logout, Strings.sureLogout, logout);

  return {logoutFunction};
};

export default useLogout;
