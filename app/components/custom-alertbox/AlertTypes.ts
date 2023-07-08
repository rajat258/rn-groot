export interface AlertObjectType {
  text: string;
  onPress: () => void;
  style: 'default' | 'cancel';
}

export interface AlertTypes {
  (
    title: string,
    message?: string,
    okFunction?: () => void,
    okText?: string,
    cancelText?: string,
    cancelFunction?: () => void,
  ): void;
}
