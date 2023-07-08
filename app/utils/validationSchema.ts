import {object} from 'yup';
import * as Yup from 'yup';
import {Strings} from '../constants';

export const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
export const mobileRegex = /^[0-9]+$/;

export const validationSchema = {
  userDetails: object().shape({
    first_name: Yup.string().required(Strings.requiredField),
    last_name: Yup.string().required(Strings.requiredField),
    email: Yup.string().required(Strings.requiredField),
  }),

  login: object().shape({
    email: Yup.string()
      .required(Strings.requiredField)
      .matches(emailRegex, Strings.notEmail),
    password: Yup.string()
      .required(Strings.requiredField)
      .min(8, Strings.passwordMinimumLength),
  }),

  signup: object().shape({
    name: Yup.string()
      .not([Yup.number], Strings.notName)
      .required(Strings.requiredField),
    phone: Yup.string()
      .min(10, Strings.invalidMobile)
      .max(10, Strings.invalidMobile)
      .matches(mobileRegex, Strings.invalidMobile)
      .required(Strings.requiredField),
    email: Yup.string()
      .required(Strings.requiredField)
      .matches(emailRegex, Strings.notEmail),
    password: Yup.string()
      .required(Strings.requiredField)
      .min(8, Strings.passwordMinimumLength),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], Strings.passwordNotMatching)
      .required(Strings.requiredField)
      .min(8, Strings.passwordMinimumLength),
  }),

  password: object().shape({
    currentPassword: Yup.string()
      .required(Strings.requiredField)
      .min(8, Strings.passwordMinimumLength),
    password: Yup.string()
      .required(Strings.requiredField)
      .min(8, Strings.passwordMinimumLength),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], Strings.passwordNotMatching)
      .required(Strings.requiredField)
      .min(8, Strings.passwordMinimumLength),
  }),

  profile: object().shape({
    email: Yup.string().required(Strings.requiredField),
    name: Yup.string().required(Strings.requiredField),
    phone: Yup.string()
      .min(10, Strings.invalidMobile)
      .max(10, Strings.invalidMobile)
      .matches(mobileRegex, Strings.invalidMobile)
      .required(Strings.requiredField),
  }),
};
