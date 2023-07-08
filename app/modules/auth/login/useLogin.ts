import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FormikErrors, FormikTouched, useFormik} from 'formik';
import {RefObject, useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {alertBox} from '../../../components';
import {Routes, Strings} from '../../../constants';
import {activeUserActions} from '../../../redux';
import {getAsyncUser, getTheme, setActiveUser} from '../../../services';
import {User} from '../../../types';
import {emailRegex, validationSchema} from '../../../utils';

interface UserPackageType {
  userExist: boolean;
  passwordCheck: boolean;
  user: {
    email: string;
    name: string;
    id: string;
    password: string;
    phone: string;
  };
}

interface UserPackageType {
  userExist: boolean;
  passwordCheck: boolean;
  user: {
    email: string;
    name: string;
    id: string;
    password: string;
    phone: string;
  };
}

interface LoginHookReturnType {
  checkCredential: () => void;
  jumpToSignup: () => void;
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
  errors: FormikErrors<LoginDataType>;
  touched: FormikTouched<LoginDataType>;
  values: LoginDataType;
  passwordRef: RefObject<TextInput>;
  themes: string;
}

interface LoginDataType {
  email: string;
  password: string;
}

const useLogin = (): LoginHookReturnType => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const initialValues = {email: '', password: ''};
  const routes = useRoute();
  const [themes, setThemes] = useState(routes?.params);

  const _setTheme = async () => {
    if (routes.params) {
      setThemes(routes.params);
    } else {
      const temp = await getTheme();
      setThemes(temp?.toString());
    }
  };

  useEffect(() => {
    _setTheme();
  }, []);

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
    validationSchema: validationSchema.login,
    initialValues: initialValues,
  });

  /**
   * @param {string} {email}
   * @param {string} {password}
   * @returns {Promise<UserPackageType>} returns a login packet which
   * has userExist and passwordCheck boolean
   **/
  const loginUser = async ({
    email,
    password,
  }: LoginDataType): Promise<UserPackageType> => {
    const user = {
      email: '',
      name: '',
      id: '',
      password: '',
      phone: '',
    };
    const userPackage: UserPackageType = {
      userExist: true,
      passwordCheck: true,
      user,
    };
    const allUsers = await getAsyncUser();
    const filteredUser = allUsers?.filter(item => item?.email === email)[0];
    userPackage.user = filteredUser as User;
    if (!filteredUser?.email) {
      // if Email doesn't exist
      userPackage.userExist = false;
    }
    if (filteredUser?.password !== password) {
      userPackage.passwordCheck = false;
    }
    return userPackage;
  };

  /**
   * Checking validation for every field
   * If all proper, then navigating to Home page
   * Otherwise, alerting the mistake
   * @returns {Promise<void>}
   **/
  const checkCredential = async (): Promise<void> => {
    dispatch(activeUserActions.changeLoader());
    handleSubmit();
    if (emailRegex.test(values.email) && isValid) {
      const userExist = await loginUser({
        email: values.email.trim(),
        password: values.password.trim(),
      });
      if (!userExist.userExist) {
        alertBox(
          Strings.userNotExist,
          Strings.pleaseSignup,
          jumpToSignup,
          Strings.signUp,
        );
      } else if (!userExist.passwordCheck) {
        alertBox(Strings.invalidPass, Strings.checkCredentials);
      } else {
        const activeUser = userExist.user;
        await setActiveUser(activeUser);
        dispatch(activeUserActions.addUser({body: userExist.user}));
        dispatch(activeUserActions.newUserData({data: activeUser?.newUser}));
        navigation.replace(Routes.drawer);
      }
    }
    dispatch(activeUserActions.changeLoader());
  };

  const jumpToSignup = () => navigation.replace(Routes.signUp, themes);

  return {
    themes,
    passwordRef,
    jumpToSignup,
    checkCredential,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
  };
};

export default useLogin;
