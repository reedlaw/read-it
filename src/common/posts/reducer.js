// @flow
import type { Action, PostsState } from '../types';
import { assocPath, dissocPath, filter } from 'ramda';
import { ascend, compose, last, map, prop, sortBy, values } from 'ramda';

const initialState = {
  all: null,
};

const reducer = (
  state: PostsState = initialState,
  action: Action,
): PostsState => {
  switch (action.type) {
    case 'ON_LOAD_POSTS': {
      const { posts } = action.payload;
      if (!posts) {
        return { ...state, all: null };
      }
      const byCreatedAt = sortBy(prop('createdAt'));
      const all = compose(
        byCreatedAt,
        map(item => item.post),
        values,
      )(posts);
      return { ...state, all };
    }
      
    case 'SUBMIT_POST': {
      const { post } = action.payload;
      return assocPath(['all', post.id], post, state);
    }

    default:
      return state;
  }
};

export default reducer;
