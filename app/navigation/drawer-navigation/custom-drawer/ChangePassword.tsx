import React from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomButton, CustomTextInput} from '../../../components';
import {Strings} from '../../../constants';
import {AppStyle, colors} from '../../../theme';
import {focusNextRef} from '../../../utils';
import styles from './ChangePasswordStyles';
import useChangePassword from './useChangePassword';
import {useCustomTheme} from '../../../hooks';
import {StyleSheet} from 'react-native';

interface ChangePasswordProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePassword = ({
  isVisible,
  setIsVisible,
}: ChangePasswordProps): JSX.Element => {
  const {
    passwordRef,
    confirmPasswordRef,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
    handleChangePassword,
    handleIsVisible,
  } = useChangePassword({isVisible, setIsVisible});
  const {theme} = useCustomTheme();

  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          viewContainer: {backgroundColor: colors.darkBackground},
          line: {borderColor: colors.white},
          textInput: {backgroundColor: colors.placeHolder, color: colors.white},
          customButtonText: {color: colors.black},
        }
      : {},
  );
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleIsVisible}
        style={styles.container}>
        <View style={styles.mainContainer}>
          <KeyboardAwareScrollView
            enableOnAndroid
            showsVerticalScrollIndicator={false}
            style={StyleSheet.flatten([
              styles.viewContainer,
              darkTheme.viewContainer,
            ])}>
            <View
              style={StyleSheet.flatten([styles.closeLine, darkTheme.line])}
            />
            <CustomTextInput
              returnKeyType="next"
              style={StyleSheet.flatten([
                styles.textInput,
                darkTheme.textInput,
              ])}
              placeholder={Strings.enterCurrentPassword}
              onSubmitEditing={() => focusNextRef(passwordRef)}
              onChangeText={handleChange('currentPassword')}
              onBlur={() => setFieldTouched('currentPassword')}
              value={values.currentPassword}
              touched={touched.currentPassword}
              errors={errors.currentPassword ?? ''}
            />
            <CustomTextInput
              secureTextEntry
              returnKeyType="next"
              ref={passwordRef}
              style={StyleSheet.flatten([
                styles.textInput,
                darkTheme.textInput,
              ])}
              placeholder={Strings.enterPassword}
              onSubmitEditing={() => focusNextRef(confirmPasswordRef)}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              value={values.password}
              touched={touched.password}
              errors={errors.password ?? ''}
            />
            <CustomTextInput
              secureTextEntry
              returnKeyType="done"
              ref={confirmPasswordRef}
              style={StyleSheet.flatten([
                styles.textInput,
                darkTheme.textInput,
              ])}
              placeholder={Strings.enterConfirmPassword}
              onSubmitEditing={handleChangePassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={() => setFieldTouched('confirmPassword')}
              value={values.confirmPassword}
              touched={touched.confirmPassword}
              errors={errors.confirmPassword ?? ''}
            />
            <CustomButton
              width="50%"
              textStyle={StyleSheet.flatten([
                AppStyle.customButtonText,
                darkTheme.customButtonText,
              ])}
              colors={
                theme === 'dark'
                  ? [colors.accent200, colors.placeHolder]
                  : [colors.secondary, colors.darkPrimary]
              }
              style={styles.button}
              text={Strings.changePassword}
              onPress={handleChangePassword}
            />
            <View
              style={StyleSheet.flatten([styles.closeLine, darkTheme.line])}
            />
          </KeyboardAwareScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ChangePassword;
