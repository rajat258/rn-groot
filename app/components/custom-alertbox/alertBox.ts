import {Alert} from 'react-native';
import {Strings} from '../../constants';
import type {AlertObjectType, AlertTypes} from './AlertTypes';

const alertBox: AlertTypes = (
  title,
  message,
  okFunction = () => {},
  okText = Strings.ok,
  cancelText = Strings.cancelString,
  cancelFunction = () => {},
) => {
  const okObject: AlertObjectType = {
    text: okText,
    onPress: okFunction,
    style: 'default',
  };
  const cancelObject: AlertObjectType = {
    text: cancelText,
    onPress: cancelFunction,
    style: 'cancel',
  };

  if (cancelText) {
    Alert.alert(title, message, [okObject, cancelObject]);
  } else {
    Alert.alert(title, message, [okObject]);
  }
};

export default alertBox;
