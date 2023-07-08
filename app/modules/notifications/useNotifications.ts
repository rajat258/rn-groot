import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActiveUserType, NotificationType} from '../../types';
import {getNotifications, killNotifications} from '../../services';
import {activeUserActions} from '../../redux';

interface NotificationsHookReturnType {
  notification: NotificationType[];
  clearNotifications: () => Promise<void>;
}

const useNotifications = (): NotificationsHookReturnType => {
  const notificationCounter = useSelector(
    (state: ActiveUserType) => state.activeUser.notifications,
  );
  const dispatch = useDispatch();
  const [notification, setNotification] = useState<Array<NotificationType>>([]);

  const initNotification = async () => {
    const notifee =
      ((await getNotifications()) as Array<NotificationType>) ?? [];
    setNotification(notifee);
  };

  const clearNotifications = async () => {
    await killNotifications();
    dispatch(activeUserActions.clearNotification());
  };

  useEffect(() => {
    initNotification();
  }, [notificationCounter]);

  return {
    notification,
    clearNotifications,
  };
};

export default useNotifications;
