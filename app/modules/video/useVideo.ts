import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Routes} from '../../constants';
import {VideoItemType} from '../../types';

interface VideoHookReturnType {
  navigateToVideoDetail: () => void;
}

const useVideo = ({item}: {item: VideoItemType}): VideoHookReturnType => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const navigateToVideoDetail = () =>
    navigation.navigate(Routes.videoDetail, item);

  return {
    navigateToVideoDetail,
  };
};

export default useVideo;
