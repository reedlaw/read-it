// @flow
import type { Action, PostsState } from '../types';
import { assocPath, dissocPath, filter } from 'ramda';
import { ascend, descend, compose, last, map, prop, sortWith, values } from 'ramda';

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
      const scoreDateSort = sortWith([
        descend(prop('score')),
        ascend(prop('createdAt')),
      ]);
      const all = compose(
        scoreDateSort,
        map(item => item.post),
        values,
      )(posts);
      return { ...state, all };
    }
      
    default:
      return state;
  }
};

export default reducer;
