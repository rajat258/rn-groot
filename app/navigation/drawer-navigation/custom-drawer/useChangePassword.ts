import {useRef} from 'react';
import {CustomFocusMethod, alertBox} from '../../../components';
import {FormikErrors, FormikTouched, useFormik} from 'formik';
import {validationSchema} from '../../../utils';
import {getActiveUser, setActiveUser} from '../../../services';
import {User} from '../../../types';
import {Strings} from '../../../constants';
import {activeUserActions, store} from '../../../redux';

interface PasswordType {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

interface ChangePasswordHookReturnType {
  passwordRef: React.RefObject<CustomFocusMethod>;
  confirmPasswordRef: React.RefObject<CustomFocusMethod>;
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
  errors: FormikErrors<PasswordType>;
  touched: FormikTouched<PasswordType>;
  values: PasswordType;
  handleChangePassword: () => void;
  handleIsVisible: () => void;
}

interface ChangePasswordHookProp {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
}

const useChangePassword = ({
  setIsVisible,
  isVisible,
}: ChangePasswordHookProp): ChangePasswordHookReturnType => {
  const passwordRef = useRef<CustomFocusMethod>(null);
  const confirmPasswordRef = useRef(null);
  const initialValues = {
    currentPassword: '',
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
    resetForm,
  } = useFormik({
    onSubmit: () => {},
    enableReinitialize: true,
    validationSchema: validationSchema.password,
    initialValues: initialValues,
  });

  const handleIsVisible = () => {
    resetForm();
    setIsVisible(!isVisible);
  };

  const handleChangePassword = async () => {
    handleSubmit();
    const user = await getActiveUser();
    if (isValid && values.password) {
      if (values.currentPassword === (user as User).password) {
        const activeUser = {...(user as User), password: values.password};
        await setActiveUser(activeUser);
        store.dispatch(activeUserActions.addUser({body: activeUser}));
        setIsVisible(!isVisible);
      } else {
        alertBox(Strings.error, Strings.wrongPassword);
      }
    }
  };

  return {
    handleIsVisible,
    passwordRef,
    confirmPasswordRef,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
    handleChangePassword,
  };
};

export default useChangePassword;
