import {RouteProp, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import styles from './styles';
import {colors} from '../../../theme';
import {VideoData} from '../../../constants';
import {VideoItemType} from '../../../types';

interface VideoDetailHookReturnType {
  data: Array<VideoItemType>;
  item: VideoItemType;
  isSubscribed: boolean;
  handleIsSubscribed: () => void;
  subscribeButtonStyle: StyleProp<ViewStyle>;
  subscribeButtonTextStyle: StyleProp<TextStyle>;
}

const useVideoDetail = (): VideoDetailHookReturnType => {
  const routes = useRoute<RouteProp<{params: VideoItemType}>>();
  const item = routes?.params;
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const subscribeButtonStyle = StyleSheet.flatten(
    isSubscribed
      ? [styles.subscribeButton, {backgroundColor: colors.red}]
      : styles.subscribeButton,
  );
  const subscribeButtonTextStyle = StyleSheet.flatten(
    isSubscribed
      ? [styles.subscribeButtonText, {color: colors.white}]
      : styles.subscribeButtonText,
  );
  const data = VideoData.videos.filter(
    (e: VideoItemType) => e?.id !== item?.id,
  );

  const handleIsSubscribed = () => setIsSubscribed(!isSubscribed);

  return {
    item,
    isSubscribed,
    handleIsSubscribed,
    subscribeButtonStyle,
    subscribeButtonTextStyle,
    data,
  };
};

export default useVideoDetail;
