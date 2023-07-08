import {ImageProps} from 'react-native';

interface LoaderProp extends ImageProps {
  isLoading: null;
}

export interface LoaderTypes {
  (props: LoaderProp): JSX.Element | null;
}
