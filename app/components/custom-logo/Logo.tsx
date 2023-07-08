import {Image} from 'react-native';
import React from 'react';
import {LogoType} from './LogoTypes';
import images from '../../assets/images';

const Logo: LogoType = ({...rest}) => {
  return <Image resizeMode="contain" source={images.logo} {...rest} />;
};

export default Logo;
