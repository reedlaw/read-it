// @flow
import type { State, Post } from '../../common/types';
import React from 'react';
import { Link } from '../components';
import {
  Box,
  Button,
  Heading,
  Image,
  Paragraph,
  Text,
} from '../../common/components';
import { connect } from 'react-redux';

type PostViewProps = {
  post: Post,
};

const PostView = ({ post }: PostViewProps) => (
  <Box>
    {!post.url &&
     <Heading size={1}>
       Title: {post.title}
     </Heading>
    }
    {post.text &&
      <Paragraph>
        Text: {post.text}
      </Paragraph>
    }
    {post.url &&
     <Heading size={1}>
       <Link to={post.url}>
         {post.title}
       </Link>
     </Heading>
    }
  </Box>
);

type PostsProps = {
  posts: ?Array<Post>,
};

const Posts = ({ posts }: PostsProps) =>
  posts == null ?
                                       <Box>
                                         <Paragraph>
                                           Nothing to see here.
                                           <Link to="/submit">
                                             Submit something.
                                           </Link>
                                         </Paragraph>
                                       </Box>
                                    :
                                       <Box marginHorizontal={-0.25}>
                                         {posts.map(post => <PostView key={post.id} post={post} />)}
                                       </Box>;

export default connect((state: State) => ({
  posts: state.posts.all,
}))(Posts);
