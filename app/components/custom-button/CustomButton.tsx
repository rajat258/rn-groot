import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppStyle, globalMetrics} from '../../theme';
import type {CustomButtonTypes} from './CustomButtonTypes';

const CustomButton: CustomButtonTypes = ({
  text,
  style,
  textStyle,
  colors = [],
  image = null,
  imageStyle = null,
  width = 'auto',
  disabled = false,
  ...rest
}) => {
  const os = globalMetrics.isIos ? 0.4 : 0.6;
  const buttonStyle = StyleSheet.flatten([
    style,
    {width: width, opacity: disabled ? os : 1},
  ]);

  return (
    <TouchableOpacity style={AppStyle.rowCenter} disabled={disabled} {...rest}>
      <LinearGradient style={buttonStyle} colors={colors}>
        {image && <Image source={image} style={imageStyle} />}
        <Text style={textStyle}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;
