import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ApiUserType, User} from '../../types';

interface InitialStateType {
  themeFlag: 'light' | 'dark' | 'system';
  theme: 'light' | 'dark';
  notifications: number;
  data: Partial<User>;
  loader: boolean;
  uploadedImage: string;
  newUser: {
    url: string;
    loader: boolean;
    data: Partial<Array<ApiUserType>>;
  };
}

const initialState: InitialStateType = {
  data: {},
  themeFlag: 'light',
  theme: 'light',
  notifications: 0,
  loader: false,
  uploadedImage: '',
  newUser: {
    url: '',
    loader: false,
    data: [],
  },
};

const activeUserSlice = createSlice({
  name: 'activeUser',
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<{body: User}>) => {
      state.data = {...action.payload?.body};
    },
    deleteUser: state => {
      state = initialState;
    },
    changeLoader: state => {
      state.loader = !state.loader;
    },
    uploadedImage: (state, action) => {
      state.uploadedImage = action.payload.uploadedImage;
    },
    newUserUrl: (state, action) => {
      state.newUser.url = action.payload.url;
    },
    newUserLoader: state => {
      state.newUser.loader = !state.newUser.loader;
    },
    newUserData: (state, action) => {
      state.newUser.data = action.payload.data;
    },
    deleteUserUrl: state => {
      state.newUser.url = '';
    },
    pushNotifications: state => {
      state.notifications += 1;
    },
    clearNotification: state => {
      state.notifications = 0;
    },
    lightTheme: state => {
      state.theme = 'light';
    },
    darkTheme: state => {
      state.theme = 'dark';
    },
    changeThemeFlag: (state, action) => {
      state.themeFlag = action.payload;
    },
  },
});

export const activeUserReducer = activeUserSlice.reducer;
export const activeUserActions = activeUserSlice.actions;
