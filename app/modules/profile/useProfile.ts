import {FormikErrors, FormikTouched, useFormik} from 'formik';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {activeUserActions} from '../../redux';
import {getActiveUser, setActiveUser} from '../../services';
import {ActiveUserType, User} from '../../types';
import {uploadPicture, validationSchema} from '../../utils';

type ProfileInitialValueType = Partial<Pick<User, 'email' | 'name' | 'phone'>>;

interface ProfileHookReturnType {
  activeUser: Partial<User>;
  uploadProfilePicture: () => Promise<void>;
  handleIsEditable: () => void;
  isEditable: boolean;
  nameRef: React.MutableRefObject<null>;
  phoneRef: React.MutableRefObject<null>;
  handleChange: {
    (e: React.ChangeEvent<string>): void;
    <T_1 = string | React.ChangeEvent<string>>(
      field: T_1,
    ): T_1 extends React.ChangeEvent<string>
      ? void
      : (e: string | React.ChangeEvent<string>) => void;
  };
  errors: FormikErrors<ProfileInitialValueType>;
  touched: FormikTouched<ProfileInitialValueType>;
  values: ProfileInitialValueType;
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
  editUser: () => Promise<void>;
}

const useProfile = (): ProfileHookReturnType => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const dispatch = useDispatch();
  const activeUser = useSelector(
    (state: ActiveUserType) => state.activeUser.data,
  );
  const profilePicture = useSelector(
    (state: ActiveUserType) => state.activeUser.uploadedImage,
  );
  const loader = useSelector(
    (state: ActiveUserType) => state.activeUser.loader,
  );
  const initialValues = {
    email: activeUser?.email,
    name: activeUser?.name,
    phone: activeUser?.phone,
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
    validationSchema: validationSchema.profile,
    initialValues: initialValues,
  });

  useEffect(() => {
    dispatchProfileImage();
  }, [profilePicture]);

  const dispatchProfileImage = async () => {
    if (loader) {
      const asyncActiveUser = await getActiveUser();
      const body = {...(asyncActiveUser as User), profile: profilePicture};
      dispatch(activeUserActions.addUser({body}));
      await setActiveUser(body);
      dispatch(activeUserActions.changeLoader());
    }
  };

  const handleIsEditable = () => setIsEditable(!isEditable);

  const editUser = async () => {
    handleSubmit();
    if (isValid && values.email) {
      const body: User = {
        ...(activeUser as User),
        email: values.email,
        name: values.name as string,
        phone: values.phone as string,
      };
      await setActiveUser(body);
      dispatch(activeUserActions.addUser({body}));
      setIsEditable(!isEditable);
    }
  };

  const uploadProfilePicture = async () => {
    dispatch(activeUserActions.changeLoader());
    uploadPicture();
  };

  return {
    activeUser,
    uploadProfilePicture,
    handleIsEditable,
    isEditable,
    nameRef,
    phoneRef,
    handleChange,
    errors,
    setFieldTouched,
    touched,
    values,
    editUser,
  };
};

export default useProfile;
