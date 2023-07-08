import {ForwardedRef} from 'react';
import {TextInputProps} from 'react-native';

interface CustomInputProp extends TextInputProps {
  touched?: boolean;
  errors?: string;
  onBlur: () => void;
}

export interface CustomFocusMethod {
  focus: () => void;
}

export interface InputTypes {
  (props: CustomInputProp, ref: ForwardedRef<CustomFocusMethod>): JSX.Element;
}
