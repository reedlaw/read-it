// @flow
import linksMessages from '../../common/app/linksMessages';
import React from 'react';
import type { State, Post, User } from '../../common/types';
import { Box } from '../../common/components';
import { Title } from '../components';
import { connect } from 'react-redux';

const PostPage = () => (
  <Box>
    <Title message={linksMessages.home} />
  </Box>
);

export default connect(
  (state: State) => ({
    posts: state.posts.all,
    viewer: state.users.viewer,
  })
)(PostPage);
