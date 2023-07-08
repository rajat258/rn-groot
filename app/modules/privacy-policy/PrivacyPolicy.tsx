import React from 'react';
import WebView from 'react-native-webview';
import {AppStyle} from '../../theme';

const PrivacyPolicy = (): JSX.Element => {
  return (
    <WebView
      style={AppStyle.container}
      source={{uri: 'https://lms.simformsolutions.com'}}
    />
  );
};

export default PrivacyPolicy;
