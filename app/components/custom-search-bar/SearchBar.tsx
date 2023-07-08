import React from 'react';
import {Image, TextInput, View} from 'react-native';
import images from '../../assets/images';
import {Strings} from '../../constants';
import {colors} from '../../theme';
import {SearchBarType} from './SearchBarTypes';
import styles from './styles';
import useSearch from './useSearch';
import {useCustomTheme} from '../../hooks';
import {StyleSheet} from 'react-native';

// SearchBar at the top of HomeScreen.
const SearchBar: SearchBarType = ({search, setSearch, setSearchedData}) => {
  useSearch({search, setSearchedData});
  const {theme} = useCustomTheme();
  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          container: {borderColor: colors.white},
          textInput: {color: colors.white},
          icon: {tintColor: colors.white},
        }
      : {},
  );

  return (
    <View style={StyleSheet.flatten([styles.container, darkTheme.container])}>
      <View style={styles.searchInputContainer}>
        <TextInput
          onChangeText={val => setSearch(val)}
          autoCapitalize="none"
          style={StyleSheet.flatten([styles.textInput, darkTheme.textInput])}
          placeholder={Strings.search}
          placeholderTextColor={
            theme === 'dark' ? colors.accent150 : colors.grey
          }
        />
      </View>
      <View style={styles.searchIconContainer}>
        <Image
          source={images.search}
          style={StyleSheet.flatten([styles.searchIcon, darkTheme.icon])}
        />
      </View>
    </View>
  );
};

export default SearchBar;
