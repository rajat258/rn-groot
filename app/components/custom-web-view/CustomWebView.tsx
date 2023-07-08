import React from 'react';
import WebView from 'react-native-webview';
import {AppStyle} from '../../theme';

const CustomWebView = ({link}: {link: string}): JSX.Element => {
  return <WebView style={AppStyle.container} source={{uri: link}} />;
};

export default CustomWebView;
