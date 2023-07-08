import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {FormikErrors, FormikTouched, useFormik} from 'formik';
import {RefObject, useEffect, useRef, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {emailRegex, generateId, validationSchema} from '../../../utils';
import {alertBox} from '../../../components';
import {Routes, Strings} from '../../../constants';
import {addAsyncUser, getAsyncUser, getTheme} from '../../../services';
import {TextInput} from 'react-native';

interface SignUpHookReturnType {
  jumpToSignIn: () => void;
  checkCredential: () => void;
  handleChange: {
    (e: React.ChangeEvent<string>): void;
    <T_1 = string | React.ChangeEvent<string>>(
      field: T_1,
    ): T_1 extends React.ChangeEvent<string>
      ? void
      : (e: string | React.ChangeEvent<string>) => void;
  };
  setFieldTouched: (
    field: string,
    touched?: boolean,
    shouldValidate?: boolean,
  ) =>
    | Promise<void>
    | Promise<
        FormikErrors<{
          email: string;
          password: string;
        }>
      >;
  errors: FormikErrors<SignUpDataType>;
  touched: FormikTouched<SignUpDataType>;
  values: SignUpDataType;
  load: boolean;
  emailRef: RefObject<TextInput>;
  mobileRef: RefObject<TextInput>;
  passwordRef: RefObject<TextInput>;
  confirmPasswordRef: RefObject<TextInput>;
  themes: string;
}

interface SignUpDataType {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const useSignUp = (): SignUpHookReturnType => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const emailRef = useRef(null);
  const mobileRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [load, setLoad] = useState<boolean>(false);
  const routes = useRoute<RouteProp<ParamListBase>>();
  const [themes, setThemes] = useState(routes?.params);
  const initialValues = {
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const {
    handleChange,
    handleSubmit,
    errors,
    isValid,
    setFieldTouched,
    touched,
    values,
  } = useFormik({
    onSubmit: () => {},
    enableReinitialize: true,
    validationSchema: validationSchema.signup,
    initialValues: {...initialValues},
  });

  useEffect(() => {
    setThemes(routes.params ?? 'light');
  }, []);

  /**
   * Checking validation for every field
   * if all proper, then navigating to Login page
   * Otherwise, alerting the mistake
   * @param {string} {name}
   * @param {string} {phone}
   * @param {string} {email}
   * @param {string} {password}
   * @returns {Promise<boolean>} true if the user has signed up
   **/
  const signUpUser = async ({
    name,
    phone,
    email,
    password,
  }: Omit<SignUpDataType, 'confirmPassword'>): Promise<boolean> => {
    const allUsers = await getAsyncUser();
    const filteredUser = allUsers?.filter(item => item?.email === email)[0];
    if (filteredUser?.email) {
      // email is already available.
      return false;
    } else {
      const id = generateId(email);
      const activeUser = {name, phone, email, password, id};
      await addAsyncUser(activeUser);
      return true;
    }
  };

  /**
   * Checking validation for every field
   * If all proper, then navigating to Login page
   * Otherwise, alerting the mistake
   * @returns {Promise<void>}
   **/
  const checkCredential = async (): Promise<void> => {
    setLoad(true);
    handleSubmit();
    if (emailRegex.test(values.email) && isValid) {
      const checkSignup = await signUpUser({
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
      });
      if (checkSignup) {
        jumpToSignIn();
      } else {
        alertBox(Strings.accExist, Strings.pleaseLogin, jumpToSignIn);
      }
    }
    setLoad(false);
  };

  const jumpToSignIn = () => navigation.replace(Routes.login);

  return {
    themes,
    jumpToSignIn,
    checkCredential,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
    load,
    emailRef,
    mobileRef,
    passwordRef,
    confirmPasswordRef,
  };
};

export default useSignUp;
