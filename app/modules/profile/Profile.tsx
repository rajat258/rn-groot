import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import images from '../../assets/images';
import {CustomButton, CustomTextInput} from '../../components';
import {Strings} from '../../constants';
import {useCustomTheme} from '../../hooks';
import {AppStyle, colors} from '../../theme';
import {focusNextRef} from '../../utils';
import styles from './styles';
import useProfile from './useProfile';

const Profile = (): JSX.Element => {
  const {
    activeUser,
    uploadProfilePicture,
    handleIsEditable,
    isEditable,
    handleChange,
    editUser,
    nameRef,
    phoneRef,
    errors,
    setFieldTouched,
    touched,
    values,
  } = useProfile();
  const {theme} = useCustomTheme();
  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          container: {backgroundColor: colors.darkBackground},
          line: {borderColor: colors.white},
          headerText: {color: colors.white},
          detailText: {color: colors.whiteTransparent80},
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
            activeUser?.profile
              ? {uri: activeUser.profile}
              : images.placeholderImage
          }
          style={styles.placeholderImage}
        />
      </TouchableOpacity>
      <View style={StyleSheet.flatten([AppStyle.line, darkTheme.line])} />
      {isEditable ? (
        <>
          <CustomTextInput
            style={StyleSheet.flatten([styles.textInput, darkTheme.textInput])}
            placeholder={Strings.enterEmail}
            onSubmitEditing={() => focusNextRef(nameRef)}
            onChangeText={handleChange('email')}
            onBlur={() => setFieldTouched('email')}
            touched={touched.email}
            value={values.email}
            errors={errors.email ?? ''}
          />
          <CustomTextInput
            style={StyleSheet.flatten([styles.textInput, darkTheme.textInput])}
            placeholder={Strings.enterName}
            onSubmitEditing={() => focusNextRef(phoneRef)}
            onChangeText={handleChange('name')}
            onBlur={() => setFieldTouched('name')}
            touched={touched.name}
            value={values.name}
            errors={errors.name ?? ''}
          />
          <CustomTextInput
            style={StyleSheet.flatten([styles.textInput, darkTheme.textInput])}
            placeholder={Strings.enterPhone}
            onSubmitEditing={editUser}
            onChangeText={handleChange('phone')}
            onBlur={() => setFieldTouched('phone')}
            touched={touched.phone}
            value={values.phone}
            errors={errors.phone ?? ''}
          />
        </>
      ) : (
        <>
          <View style={styles.informationContainer}>
            <Text
              style={StyleSheet.flatten([
                styles.headerText,
                darkTheme.headerText,
              ])}>{`${Strings.email}:`}</Text>
            <Text
              style={StyleSheet.flatten([
                styles.detailText,
                darkTheme.detailText,
              ])}>
              {activeUser?.email}
            </Text>
          </View>
          <View style={styles.informationContainer}>
            <Text
              style={StyleSheet.flatten([
                styles.headerText,
                darkTheme.headerText,
              ])}>{`${Strings.name}:`}</Text>
            <Text
              style={StyleSheet.flatten([
                styles.detailText,
                darkTheme.detailText,
              ])}>
              {activeUser?.name}
            </Text>
          </View>
          <View style={styles.informationContainer}>
            <Text
              style={StyleSheet.flatten([
                styles.headerText,
                darkTheme.headerText,
              ])}>{`${Strings.mobileNo}:`}</Text>
            <Text
              style={StyleSheet.flatten([
                styles.detailText,
                darkTheme.detailText,
              ])}>
              {activeUser?.phone}
            </Text>
          </View>
        </>
      )}
      <CustomButton
        colors={
          theme === 'dark'
            ? [colors.accent200, colors.placeHolder]
            : [colors.secondary, colors.darkPrimary]
        }
        onPress={isEditable ? editUser : handleIsEditable}
        textStyle={StyleSheet.flatten([
          styles.editUserButtonText,
          darkTheme.addUserText,
        ])}
        text={isEditable ? Strings.updateUser : Strings.editUser}
        width="80%"
        style={styles.editUserButton}
      />
    </View>
  );
};

export default Profile;
