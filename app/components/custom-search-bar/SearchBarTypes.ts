import {Dispatch, SetStateAction} from 'react';
import {ApiUserType} from '../../types';

export interface SearchBarPropType {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  setSearchedData: Dispatch<SetStateAction<Array<ApiUserType>>>;
}

interface SearchBarHookProps {
  search: string;
  setSearchedData: Dispatch<SetStateAction<Array<ApiUserType>>>;
}

export interface SearchBarType {
  (props: SearchBarPropType): JSX.Element;
}
export interface SearchBarHookReturnType {
  (props: SearchBarHookProps): void;
}
