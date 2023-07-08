export interface User {
  email: string;
  name: string;
  id: string;
  password: string;
  phone: string;
  profile?: string;
  newUser?: Partial<Array<ApiUserType>>;
}

export interface VideoItemType {
  id: number;
  width: number;
  height: number;
  duration: string;
  name: string;
  url: string;
  image: string;
  videoCreator: {
    logo: string;
    creatorName: string;
    subscribers: string;
    uploadDate: string;
    videoDetails: string;
  };
}

export interface ActiveUserType {
  activeUser: {
    themeFlag: 'light' | 'dark' | 'system';
    theme: 'light' | 'dark';
    notifications: number;
    data: Partial<User>;
    loader: boolean;
    uploadedImage: string;
    newUser?: {
      url: string;
      loader?: boolean;
      data: Partial<Array<ApiUserType>>;
    };
  };
}

export interface ApiUserType {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ApiUserListType {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Partial<Array<ApiUserType>>;
}

export interface ApiDataStateType {
  apiData: {
    load: boolean;
    data: ApiUserListType;
  };
}

export interface CustomFocusMethod {
  focus: () => void;
}

export interface NotificationType {
  messageId: string;
  notification: {
    body: string;
    title: string;
  };
}
