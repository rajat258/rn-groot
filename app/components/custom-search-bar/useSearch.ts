import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {SearchBarHookReturnType} from './SearchBarTypes';
import {ActiveUserType, ApiDataStateType, ApiUserType} from '../../types';

const useSearch: SearchBarHookReturnType = ({search, setSearchedData}) => {
  const allUsers = useSelector(
    (state: ApiDataStateType) => state.apiData.data.data,
  );
  const newUser = useSelector(
    (state: ActiveUserType) => state.activeUser.newUser?.data,
  );

  useEffect(() => {
    if (search.trim().length) {
      const combinedUsers = [
        ...allUsers,
        ...((newUser as Array<ApiUserType>) ?? []),
      ];
      const getProducts = (combinedUsers as Array<ApiUserType>)?.filter(
        (e: ApiUserType) => {
          const name = e.first_name + e.last_name;
          return name.toLowerCase().includes(search);
        },
      );
      setSearchedData(getProducts);
    }
  }, [search]);
};

export default useSearch;
