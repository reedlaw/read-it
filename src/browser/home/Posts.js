// @flow
import type { State, Post, User } from '../../common/types';
import React from 'react';
import { likePost } from '../../common/posts/actions';
import { Link } from '../components';
import {
  Box,
  Heading,
  Image,
  Paragraph,
  Text,
} from '../../common/components';
import { connect } from 'react-redux';

const PostView = ({ post, likePost, viewer }) => {
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
    <Box flexDirection="row" flexWrap="wrap" marginHorizontal={0.5}>
      <a onClick={() => likePost(post, viewer)} style={arrowStyle}></a>
      <Text marginRight={0.25}>{post.score}</Text>
      {!post.url &&
       <div>
         <Text bold marginRight={0.25}>
           {post.title}
         </Text>
         <Text marginRight={0.25}>
           {post.text}
         </Text>
       </div>
      }
      {post.url &&
        <Link to={post.url}>
          {post.title}
        </Link>
       }
    </Box>
  )
};

type PostsProps = {
  posts: ?Array<Post>,
  likePost: typeof likePost,
  viewer: ?User,
};

const Posts = ({ posts, likePost, viewer }: PostsProps) =>
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
                                         {posts.map(post => (
                                            <PostView
                                                key={post.id}
                                                likePost={likePost}
                                                post={post}
                                                viewer={viewer}
                                            />
                                          ))}
                                       </Box>;

export default connect(
  (state: State) => ({
    posts: state.posts.all,
    viewer: state.users.viewer,
  }),
  { likePost },
)(Posts);
