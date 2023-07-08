import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../../assets/images';
import {CustomButton, CustomTextInput, Logo} from '../../../components';
import {Strings} from '../../../constants';
import {AppStyle, colors} from '../../../theme';
import {focusNextRef} from '../../../utils';
import {styles} from './styles';
import useSignUp from './useSignUp';

const SignUp = () => {
  const {
    jumpToSignIn,
    checkCredential,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
    emailRef,
    mobileRef,
    passwordRef,
    confirmPasswordRef,
    themes,
  } = useSignUp();
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
          placeholder={Strings.enterName}
          onSubmitEditing={() => focusNextRef(emailRef)}
          onChangeText={handleChange('name')}
          onBlur={() => setFieldTouched('name')}
          value={values.name}
          touched={touched.name}
          errors={errors.name ?? ''}
        />
        <CustomTextInput
          returnKeyType="next"
          ref={emailRef}
          style={styles.textInput}
          placeholder={Strings.enterEmail}
          onSubmitEditing={() => focusNextRef(mobileRef)}
          onChangeText={handleChange('email')}
          onBlur={() => setFieldTouched('email')}
          value={values.email}
          touched={touched.email}
          errors={errors.email ?? ''}
        />
        <CustomTextInput
          returnKeyType="next"
          keyboardType="number-pad"
          ref={mobileRef}
          style={styles.textInput}
          placeholder={Strings.enterPhone}
          onSubmitEditing={() => focusNextRef(passwordRef)}
          onChangeText={handleChange('phone')}
          onBlur={() => setFieldTouched('phone')}
          value={values.phone}
          touched={touched.phone}
          errors={errors.phone ?? ''}
        />
        <CustomTextInput
          secureTextEntry
          ref={passwordRef}
          returnKeyType="next"
          style={styles.textInput}
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
          style={styles.textInput}
          placeholder={Strings.enterConfirmPassword}
          onSubmitEditing={checkCredential}
          onChangeText={handleChange('confirmPassword')}
          onBlur={() => setFieldTouched('confirmPassword')}
          value={values.confirmPassword}
          touched={touched.confirmPassword}
          errors={errors.confirmPassword ?? ''}
        />
        <CustomButton
          colors={[colors.darkPrimary, colors.primary]}
          onPress={checkCredential}
          textStyle={styles.loginButtonText}
          text={Strings.signUp}
          width="80%"
          style={styles.loginButton}
        />
        <View style={AppStyle.flexRow}>
          <Text
            style={StyleSheet.flatten([styles.noAccountText, darkTheme.text])}>
            {Strings.alreadyAccount}
          </Text>
          <TouchableOpacity onPress={jumpToSignIn} style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>{Strings.login}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

export default SignUp;
