import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncKeys} from '../constants';
import type {NotificationType, User} from '../types';

/**
 * Returns all the users available in Async-Storage
 * @returns {Promise<null | Array<User>>}
 * returns an object of all Users existing in Async-Storage
 */
export const getAsyncUser = async (): Promise<null | Array<User>> => {
  const allUsers = await AsyncStorage.getItem(AsyncKeys.id);
  if (allUsers) {
    return JSON.parse(allUsers);
  } else {
    return [];
  }
};

/**
 * Add a user in all user list in Async-Storage
 * @param {User} activeUser
 * @returns {Promise<void>}
 */
export const addAsyncUser = async (activeUser: User): Promise<void> => {
  const allUsers = await getAsyncUser();
  allUsers?.push(activeUser);
  await AsyncStorage.setItem(AsyncKeys.id, JSON.stringify(allUsers));
};

/**
 * Set or update an activeUser in Async-Storage
 * @param {User} activeUser
 * @returns {Promise<void>}
 */
export const setAsyncUser = async (activeUser: User): Promise<void> => {
  const allUsers = await getAsyncUser();
  const index = allUsers?.findIndex(item => item.id === activeUser.id);
  if (allUsers) {
    allUsers[index as number] = activeUser;
    await AsyncStorage.setItem(AsyncKeys.id, JSON.stringify(allUsers));
  }
};

/**
 * fetch ActiveUser
 * @returns {Promise<string | User>}
 * returns an Active user if Exist or returns empty string
 */
export const getActiveUser = async (): Promise<boolean | User> => {
  const activeUser = await AsyncStorage.getItem(AsyncKeys.activeUser);
  if (activeUser) {
    return JSON.parse(activeUser);
  } else {
    return false;
  }
};

/**
 * Fetch Notification Array
 * @returns {Promise<null | Array<NotificationType>>}
 */
export const getNotifications =
  async (): Promise<null | Array<NotificationType>> => {
    const notification = await AsyncStorage.getItem(AsyncKeys.notifications);
    if (notification) {
      return JSON.parse(notification);
    } else {
      return null;
    }
  };

/**
 * Set Notification Array
 * @returns {Promise<void>}
 */
export const setNotifications = async (
  notification: NotificationType,
): Promise<void> => {
  const allNotifications = (await getNotifications()) ?? [];
  allNotifications?.push(notification);
  await AsyncStorage.setItem(
    AsyncKeys.notifications,
    JSON.stringify(allNotifications),
  );
};

export const setActiveUser = async (activeUser: User): Promise<void> => {
  await AsyncStorage.setItem(AsyncKeys.activeUser, JSON.stringify(activeUser));
};

export const getTheme = async (): Promise<string | null> => {
  const color = await AsyncStorage.getItem(AsyncKeys.theme);
  if (color) {
    return JSON.parse(color);
  } else {
    return null;
  }
};

export const setTheme = async (color: string): Promise<void> => {
  await AsyncStorage.setItem(AsyncKeys.theme, JSON.stringify(color));
};

/**
 * Kill only Async-Storage ActiveUser
 * @returns {Promise<void>}
 */
export const killActiveUser = async (): Promise<void> => {
  await AsyncStorage.removeItem(AsyncKeys.activeUser);
};

/**
 * Kill all Async-Storage Users
 * @returns {Promise<void>}
 */
export const killAsyncUser = async (): Promise<void> => {
  await AsyncStorage.removeItem(AsyncKeys.id);
};

export const killNotifications = async (): Promise<void> => {
  await AsyncStorage.removeItem(AsyncKeys.notifications);
};
