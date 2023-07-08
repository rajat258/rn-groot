import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FormikErrors, FormikTouched, useFormik} from 'formik';
import {RefObject, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Routes, Url} from '../../constants';
import {activeUserActions} from '../../redux';
import {setActiveUser} from '../../services';
import {
  ActiveUserType,
  ApiUserType,
  CustomFocusMethod,
  User,
} from '../../types';
import {generateId, uploadPicture, validationSchema} from '../../utils';

type CreateType = Omit<ApiUserType, 'avatar' | 'id'>;

interface CreateHookReturnType {
  activeUser: Partial<User>;
  focusNextRef: (ref: RefObject<CustomFocusMethod>) => void;
  lastNameRef: React.MutableRefObject<null>;
  emailRef: React.MutableRefObject<null>;
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
  errors: FormikErrors<CreateType>;
  touched: FormikTouched<CreateType>;
  values: CreateType;
  addUser: () => void;
  uploadProfilePicture: () => Promise<void>;
  imageToDisplay?: string;
  profile: string;
}

const useCreate = (): CreateHookReturnType => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const initialValues = {email: '', first_name: '', last_name: ''};
  const [profile, setProfile] = useState<string>('');

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
    validationSchema: validationSchema.userDetails,
    initialValues: initialValues,
  });

  const profilePicture = useSelector(
    (state: ActiveUserType) => state.activeUser?.uploadedImage,
  );
  const newUser = useSelector(
    (state: ActiveUserType) => state.activeUser?.newUser,
  );
  const activeUser = useSelector(
    (state: ActiveUserType) => state.activeUser?.data,
  );

  useEffect(() => {
    dispatchProfileImage();
  }, [profilePicture]);

  const addUser = async () => {
    handleSubmit();
    if (isValid && values.email) {
      const newData: ApiUserType = {
        ...values,
        avatar: profile.length ? profile : Url.avatar,
        id: generateId(values?.email),
      };
      const data = [{...newData}, ...(newUser?.data ?? [])];
      dispatch(activeUserActions.newUserData({data}));
      const asyncActiveUser = {...activeUser, newUser: data};
      await setActiveUser(asyncActiveUser as User);
      dispatch(activeUserActions.deleteUserUrl());
      resetForm();
      navigation.navigate(Routes.home);
    }
  };

  const focusNextRef = (ref: RefObject<CustomFocusMethod>) => {
    ref.current?.focus();
  };

  const dispatchProfileImage = async () => {
    if (newUser?.loader) {
      setProfile(profilePicture);
      dispatch(activeUserActions.newUserUrl({url: profilePicture}));
      dispatch(activeUserActions.newUserLoader());
    }
  };

  const uploadProfilePicture = async () => {
    dispatch(activeUserActions.newUserLoader());
    uploadPicture();
  };

  return {
    activeUser,
    focusNextRef,
    lastNameRef,
    emailRef,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
    addUser,
    uploadProfilePicture,
    imageToDisplay: newUser?.url,
    profile,
  };
};

export default useCreate;
