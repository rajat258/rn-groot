import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../assets/images';
import {CustomButton, CustomTextInput} from '../../components';
import {Strings} from '../../constants';
import {AppStyle, colors} from '../../theme';
import styles from './styles';
import useCreate from './useCreate';
import {StyleSheet} from 'react-native';
import {useCustomTheme} from '../../hooks';

const Create = () => {
  const {
    focusNextRef,
    lastNameRef,
    emailRef,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
    addUser,
    uploadProfilePicture,
    imageToDisplay,
  } = useCreate();
  const {theme} = useCustomTheme();

  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          container: {backgroundColor: colors.darkBackground},
          line: {borderColor: colors.white},
          textInput: {backgroundColor: colors.placeHolder, color: colors.white},
          addUserText: {color: colors.black},
        }
      : {},
  );

  return (
    <View style={StyleSheet.flatten([AppStyle.container, darkTheme.container])}>
      <TouchableOpacity
        onPress={uploadProfilePicture}
        style={styles.imageContainer}>
        <Image
          source={
            imageToDisplay?.length !== 0
              ? {uri: imageToDisplay}
              : images.placeholderImage
          }
          style={styles.placeholderImage}
        />
      </TouchableOpacity>
      <View style={StyleSheet.flatten([AppStyle.line, darkTheme.line])} />
      <KeyboardAwareScrollView
        enableOnAndroid
        showsVerticalScrollIndicator={false}
        contentContainerStyle={AppStyle.alignItems}
        style={StyleSheet.flatten([AppStyle.container, darkTheme.container])}>
        <CustomTextInput
          style={[styles.textInput, darkTheme.textInput]}
          onSubmitEditing={() => focusNextRef(lastNameRef)}
          onChangeText={handleChange('first_name')}
          onBlur={() => setFieldTouched('first_name')}
          value={values.first_name}
          touched={touched.first_name}
          errors={errors.first_name ?? ''}
          placeholder={Strings.firstName}
        />
        <CustomTextInput
          ref={lastNameRef}
          style={StyleSheet.flatten([styles.textInput, darkTheme.textInput])}
          onSubmitEditing={() => focusNextRef(emailRef)}
          onChangeText={handleChange('last_name')}
          onBlur={() => setFieldTouched('last_name')}
          value={values.last_name}
          touched={touched.last_name}
          errors={errors.last_name ?? ''}
          placeholder={Strings.lastName}
        />
        <CustomTextInput
          ref={emailRef}
          style={[styles.textInput, darkTheme.textInput]}
          onChangeText={handleChange('email')}
          onBlur={() => setFieldTouched('email')}
          onSubmitEditing={addUser}
          value={values.email}
          touched={touched.email}
          errors={errors.email ?? ''}
          placeholder={Strings.email}
        />
        <CustomButton
          colors={
            theme === 'dark'
              ? [colors.accent200, colors.placeHolder]
              : [colors.secondary, colors.darkPrimary]
          }
          onPress={addUser}
          textStyle={StyleSheet.flatten([
            styles.addUserText,
            darkTheme.addUserText,
          ])}
          text={Strings.addUser}
          width="80%"
          style={styles.addUserButton}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Create;
