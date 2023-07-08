import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {NotificationType} from '../../types';
import styles from './styles';
import useNotifications from './useNotifications';
import {Strings} from '../../constants';
import {AppStyle, colors} from '../../theme';
import {useCustomTheme} from '../../hooks';
import {StyleSheet} from 'react-native';

interface ItemPropType {
  item: NotificationType;
  index: number;
}

const ListEmptyComponent = ({
  darkTheme,
}: {
  darkTheme: Record<string, object>;
}) => {
  return (
    <View style={AppStyle.listEmptyComponent}>
      <Text
        style={StyleSheet.flatten([
          AppStyle.listEmptyComponentText,
          darkTheme.listEmptyComponentText,
        ])}>
        {Strings.noNotifications}
      </Text>
    </View>
  );
};

const Item = ({item, index}: ItemPropType) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitleText}>{`${++index}). ${
        item.notification.title
      }`}</Text>
      <Text style={styles.itemMessageText}>{item.notification.body}</Text>
    </View>
  );
};

const ListFooterComponent = ({
  clearNotifications,
}: {
  clearNotifications: () => Promise<void>;
}) => {
  return (
    <TouchableOpacity onPress={clearNotifications} style={styles.clearButton}>
      <Text style={styles.clearText}>{Strings.clearNotifications}</Text>
    </TouchableOpacity>
  );
};

const Notifications = (): JSX.Element => {
  const {notification, clearNotifications} = useNotifications();
  const {theme} = useCustomTheme();
  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          container: {backgroundColor: colors.darkBackground},
          listEmptyComponentText: {color: colors.white},
        }
      : {},
  );

  return (
    <FlatList
      style={StyleSheet.flatten([AppStyle.container, darkTheme.container])}
      ListEmptyComponent={<ListEmptyComponent {...{darkTheme}} />}
      ListFooterComponent={
        notification?.length ? (
          <ListFooterComponent {...{clearNotifications}} />
        ) : null
      }
      data={notification}
      keyExtractor={(item, index) => index + item.messageId.toString()}
      renderItem={({item, index}) => <Item {...{index, item}} />}
    />
  );
};

export default Notifications;
