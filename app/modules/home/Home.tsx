import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SearchBar} from '../../components';
import {Strings} from '../../constants';
import {AppStyle} from '../../theme';
import {ApiUserType} from '../../types';
import styles from './HomeStyles';
import Item from './Item';
import useHome from './useHome';

const ListEmptyComponent = ({
  darkTheme,
}: {
  darkTheme: Record<string, object>;
}) => {
  return (
    <View style={AppStyle.listEmptyComponent}>
      <Text
        style={StyleSheet.flatten([
          AppStyle.listEmptyComponentText,
          darkTheme.listEmptyComponentText,
        ])}>
        {Strings.noUser}
      </Text>
    </View>
  );
};

const NewDataFlatList = ({newData}: {newData: Partial<Array<ApiUserType>>}) => {
  return (
    <>
      {newData?.length && (
        <FlatList
          data={newData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <Item item={item as ApiUserType} />}
        />
      )}
    </>
  );
};

const Home = (): JSX.Element => {
  const {
    darkTheme,
    data,
    loadMoreData,
    newData,
    search,
    searchedData,
    setSearch,
    setSearchedData,
  } = useHome();
  const searchLength = search?.trim().length;

  return (
    <View style={StyleSheet.flatten([styles.container, darkTheme.container])}>
      <SearchBar {...{search, setSearch, setSearchedData}} />
      {searchLength > 0 ? (
        <FlatList
          alwaysBounceVertical={false}
          style={AppStyle.flatList}
          ListEmptyComponent={<ListEmptyComponent {...{darkTheme}} />}
          data={searchedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <Item item={item as ApiUserType} />}
        />
      ) : (
        <FlatList
          alwaysBounceVertical={false}
          style={AppStyle.flatList}
          ListHeaderComponent={
            <NewDataFlatList newData={newData as Array<ApiUserType>} />
          }
          ListEmptyComponent={<ListEmptyComponent {...{darkTheme}} />}
          onEndReachedThreshold={0.3}
          onEndReached={loadMoreData}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <Item item={item as ApiUserType} />}
        />
      )}
    </View>
  );
};

export default Home;
