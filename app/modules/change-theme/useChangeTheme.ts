import {StyleSheet} from 'react-native';
import {colors} from '../../theme';
import useCustomTheme from '../../hooks/useCustomTheme';
import {useState} from 'react';

interface ChangeThemeHookReturnType {
  darkTheme: Record<string, object> | boolean;
}

const useChangeTheme = (): ChangeThemeHookReturnType => {
  const {theme} = useCustomTheme();

  const darkTheme = StyleSheet.create(
    theme === 'dark' && {
      container: {backgroundColor: colors.modalColor},
      subContainer: {backgroundColor: colors.darkBackground},
      closeLine: {borderColor: colors.white},
      itemContainer: {backgroundColor: colors.placeHolder},
      text: {color: colors.white},
    },
  );

  return {
    darkTheme,
  };
};

export default useChangeTheme;
