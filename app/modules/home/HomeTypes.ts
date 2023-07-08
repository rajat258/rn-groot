import {ApiUserType} from '../../types';

interface ApiItem {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ApiDataTypes {
  per_page: number;
  total: number;
  total_pages: number;
  data: Array<ApiItem>;
}

export interface ItemTypes {
  item: ApiUserType;
}
