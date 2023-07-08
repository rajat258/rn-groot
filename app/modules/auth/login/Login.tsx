import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CustomButton, CustomTextInput, Logo} from '../../../components';
import {Strings} from '../../../constants';
import {AppStyle, colors} from '../../../theme';
import {styles} from './styles';
import useLogin from './useLogin';
import images from '../../../assets/images';
import {focusNextRef} from '../../../utils';

const Login = (): JSX.Element => {
  const {
    passwordRef,
    jumpToSignup,
    checkCredential,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
    themes,
  } = useLogin();
  const darkTheme = StyleSheet.create(
    themes === 'dark'
      ? {
          text: {color: colors.white},
        }
      : {},
  );

  return (
    <ImageBackground
      style={AppStyle.container}
      source={
        themes === 'dark' ? images.darkBackgroundImage : images.backgroundImage
      }>
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={AppStyle.alignItems}
        style={AppStyle.fullHeightWidth}>
        <Logo style={styles.logo} />
        <CustomTextInput
          returnKeyType="next"
          style={styles.textInput}
          placeholder={Strings.enterEmail}
          onSubmitEditing={() => focusNextRef(passwordRef)}
          onChangeText={handleChange('email')}
          onBlur={() => setFieldTouched('email')}
          value={values.email}
          touched={touched.email}
          errors={errors.email ?? ''}
        />
        <CustomTextInput
          secureTextEntry
          returnKeyType="done"
          style={styles.textInput}
          ref={passwordRef}
          placeholder={Strings.enterPassword}
          onSubmitEditing={checkCredential}
          onChangeText={handleChange('password')}
          onBlur={() => setFieldTouched('password')}
          touched={touched.password}
          value={values.password}
          errors={errors.password ?? ''}
        />
        <CustomButton
          colors={[colors.secondary, colors.darkPrimary]}
          onPress={checkCredential}
          textStyle={styles.loginButtonText}
          text={Strings.login}
          width="80%"
          style={styles.loginButton}
        />
        <View style={AppStyle.flexRow}>
          <Text
            style={StyleSheet.flatten([styles.noAccountText, darkTheme.text])}>
            {Strings.noAccount}
          </Text>
          <TouchableOpacity onPress={jumpToSignup} style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>{Strings.signUp}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default Login;
