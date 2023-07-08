import {DrawerContentComponentProps} from '@react-navigation/drawer';

export interface CustomDrawerTypes {
  (props: DrawerContentComponentProps): JSX.Element;
}
