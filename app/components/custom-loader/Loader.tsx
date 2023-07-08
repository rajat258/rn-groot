import React from 'react';
import {Image} from 'react-native';
import images from '../../assets/images';
import {LoaderTypes} from './LoaderTypes';

const Loader: LoaderTypes = ({isLoading, ...rest}) => {
  if (!isLoading) {
    return null;
  }
  return <Image source={images.logo} {...rest} />;
};

export default Loader;
