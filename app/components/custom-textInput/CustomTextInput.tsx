import React, {useState} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {colors} from '../../theme';
import {InputTypes} from './InputTypes';
import {styles} from './styles';
import {useCustomTheme} from '../../hooks';

const CustomTextInput: InputTypes = (
  {errors, touched, style, onBlur = () => {}, ...rest},
  ref,
) => {
  const [isFocused, setIsFocused] = useState(false);
  const {theme} = useCustomTheme();

  const textInputStyle = StyleSheet.flatten([
    isFocused ? styles.focusedTextInput : styles.textInput,
    theme === 'dark' && {borderColor: colors.white},
    style,
  ]);

  const _onBlur = () => {
    onBlur();
    setIsFocused(false);
  };

  return (
    <>
      <TextInput
        ref={ref as React.RefObject<TextInput>}
        autoComplete="off"
        style={textInputStyle}
        onBlur={_onBlur}
        onFocus={() => setIsFocused(true)}
        autoCapitalize="none"
        placeholderTextColor={
          theme === 'dark' ? colors.whiteTransparent80 : colors.placeHolder
        }
        {...rest}
      />
      {errors && touched && <Text style={styles.error}>{errors}</Text>}
    </>
  );
};

export default React.forwardRef(CustomTextInput);
