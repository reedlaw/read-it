// @flow
import * as themes from '../themes';
import React from 'react';
import Posts from './Posts';
import {
  Box,
  Button,
  Heading,
  Image,
  PageHeader,
  Paragraph,
  SwitchTheme,
  Text,
  ToggleBaseline,
} from '../../common/components';
import { Link, Title } from '../components';

const HomePage = () => (
  <Box>
    <Posts />
  </Box>
);
export default HomePage;
