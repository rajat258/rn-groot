import {useEffect, useState} from 'react';
import {ApiStrings, Strings} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {apiDataActions} from '../../redux';
import {ActiveUserType, ApiDataStateType, ApiUserType} from '../../types';
import {alertBox} from '../../components';
import {getData} from '../../services';
import {StyleSheet} from 'react-native';
import {colors} from '../../theme';
import {useCustomTheme} from '../../hooks';

interface HomeHookReturnType {
  data: Partial<Array<ApiUserType>>;
  darkTheme: Record<string, object> | object;
  isLoading: boolean;
  loadMoreData: () => Promise<void>;
  newData?: Partial<Array<ApiUserType>>;
  search: string;
  searchedData: ApiUserType[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSearchedData: React.Dispatch<React.SetStateAction<ApiUserType[]>>;
}

const useHome = (): HomeHookReturnType => {
  const {theme} = useCustomTheme();
  const [search, setSearch] = useState<string>('');
  const [searchedData, setSearchedData] = useState<Array<ApiUserType>>([]);
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: ApiDataStateType) => state.apiData?.load,
  );
  const apiData = useSelector((state: ApiDataStateType) => state.apiData?.data);
  const data = useSelector(
    (state: ApiDataStateType) => state.apiData?.data?.data,
  );
  const newData = useSelector(
    (state: ActiveUserType) => state.activeUser.newUser?.data,
  );

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      dispatch(apiDataActions.changeLoad());
      const allUsersApiData = await getData(ApiStrings.allUsers);
      dispatch(apiDataActions.addData(allUsersApiData));
      const recentData = await getData(ApiStrings.pageWiseData + apiData.page);
      dispatch(apiDataActions.updateData({data: recentData?.data}));
      dispatch(apiDataActions.changeLoad());
      dispatch(apiDataActions.updatePage());
    } catch (error) {
      dispatch(apiDataActions.changeLoad());
      alertBox(Strings.error, Strings.errorOccurred);
    }
  };

  const loadMoreData = async () => {
    if (apiData?.page <= apiData?.total_pages && apiData.data.length !== 0) {
      const recentData = await getData(ApiStrings.pageWiseData + apiData?.page);
      const allData = [...apiData.data, ...recentData?.data];
      dispatch(apiDataActions.updateData({data: allData}));
      dispatch(apiDataActions.updatePage());
    }
  };

  const darkTheme = StyleSheet.create(
    theme === 'dark'
      ? {
          container: {backgroundColor: colors.darkBackground},
          listEmptyComponentText: {color: colors.white},
        }
      : {},
  );

  return {
    darkTheme,
    data,
    isLoading,
    loadMoreData,
    search,
    setSearch,
    searchedData,
    setSearchedData,
    newData,
  };
};

export default useHome;
