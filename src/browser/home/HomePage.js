// @flow
import linksMessages from '../../common/app/linksMessages';
import React from 'react';
import Posts from './Posts';
import { Box } from '../../common/components';
import { Title } from '../components';

const HomePage = () => (
  <Box>
    <Title message={linksMessages.home} />
    <Posts />
  </Box>
);
export default HomePage;
