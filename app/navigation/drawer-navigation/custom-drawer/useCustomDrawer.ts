import {useState} from 'react';
import {useLogout} from '../../../hooks';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerContentComponentProps} from '@react-navigation/drawer';

interface CustomDrawerReturnHookType {
  logoutFunction: () => void;
  isFocused: boolean;
  isVisible: boolean;
  isThemeVisible: boolean;
  handleIsFocused: () => void;
  handleIsVisible: () => void;
  handleIsThemeVisible: () => void;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: StackNavigationProp<ParamListBase>;
}

const useCustomDrawer = ({
  props,
}: {
  props: DrawerContentComponentProps;
}): CustomDrawerReturnHookType => {
  const {logoutFunction} = useLogout();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isThemeVisible, setIsThemeVisible] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  /**
   * Change state of isThemeVisible
   * @returns {void}
   **/
  const handleIsThemeVisible = (): void => setIsThemeVisible(!isThemeVisible);

  /**
   * Change state of isFocused
   * @returns {void}
   **/
  const handleIsFocused = (): void => setIsFocused(!isFocused);

  /**
   * Change state of isVisible and closes the drawer
   * @returns {void}
   **/
  const handleIsVisible = (): void => {
    setIsVisible(!isVisible);
    props.navigation.closeDrawer();
  };

  return {
    logoutFunction,
    isThemeVisible,
    isFocused,
    isVisible,
    handleIsFocused,
    navigation,
    handleIsVisible,
    setIsVisible,
    handleIsThemeVisible,
  };
};

export default useCustomDrawer;
