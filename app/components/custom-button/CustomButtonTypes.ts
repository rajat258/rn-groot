import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  style: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  image?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  colors?: Array<string>;
  width?: string;
  disabled?: boolean;
}

export interface CustomButtonTypes {
  (props: ButtonProps): JSX.Element;
}
