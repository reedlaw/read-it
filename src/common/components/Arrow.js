// @flow
import type { ColorProps, Theme } from '../themes/types';
import type { TextProps } from './Text';
import Box from './Box';
import React from 'react';
import Text, { computeTextStyle } from './Text';
import isReactNative from '../../common/app/isReactNative';

const Arrow = () => {
  const arrowStyle = {
    borderBottomColor: 'grey',
    borderBottomWidth: '8px',
    borderLeftColor: 'transparent',
    borderLeftWidth: '8px',    
    borderRightColor: 'transparent',
    borderRightWidth: '8px',
    borderStyle: 'solid',
    borderTopWidth: '0px',
    cursor: 'pointer',
    height: 0,
    margin: '8px',
    width: 0,
  }

  return (
    <a style={arrowStyle}>
    </a>
  );
};

Arrow.contextTypes = {
  Arrow: React.PropTypes.func,
  theme: React.PropTypes.object,
};

export default Arrow;
