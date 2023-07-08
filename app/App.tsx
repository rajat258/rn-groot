import React from 'react';
import {StatusBar, View} from 'react-native';
import {Provider} from 'react-redux';
import {AppNavigator} from './navigation';
import {store} from './redux';
import {AppStyle} from './theme';
import {NavigationContainer} from '@react-navigation/native';
import {LogBox} from 'react-native';
import {useApp} from './hooks';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

function App(): JSX.Element {
  useApp();

  return (
    <Provider store={store}>
      <View style={AppStyle.container}>
        <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </View>
    </Provider>
  );
}

export default App;
